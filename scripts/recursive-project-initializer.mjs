#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import {
  access,
  mkdir,
  readFile,
  readdir,
  stat,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const REQUIRED_VSCODE_SETTINGS = {
  'github.copilot.chat.codeGeneration.useInstructionFiles': true,
  'chat.modeFilesLocations': { 'memory-bank/chatmodes': true },
  'chat.instructionsFilesLocations': { 'memory-bank/instructions': true },
  'chat.promptFilesLocations': { 'memory-bank/prompts': true },
  'github.copilot.chat.agent.thinkingTool': true,
  'chat.todoListTool.enabled': true,
  'chat.extensionTools.enabled': true,
};

const PROJECT_MARKERS = new Set([
  'package.json',
  'pyproject.toml',
  'Cargo.toml',
  'go.mod',
  'rush-project.json',
  'pom.xml',
  'build.gradle',
  'build.gradle.kts',
]);

const SKIP_DIRS = new Set([
  '.cache',
  '.git',
  '.next',
  '.pnpm-store',
  '.rush',
  '.turbo',
  '.venv',
  'build',
  'coverage',
  'dist',
  'node_modules',
  'out',
  'temp',
  'tmp',
  'vendor',
  'venv',
]);

const argv = new Set(process.argv.slice(2));
const writeMode = argv.has('--write');
const checkMode = argv.has('--check') || !writeMode;
const includeSubmodules = !argv.has('--no-submodules');
const maxPasses = Number(
  process.argv.find((arg) => arg.startsWith('--max-passes='))?.split('=')[1] ?? 8,
);
const explicitRoot = process.argv
  .find((arg) => arg.startsWith('--root='))
  ?.slice('--root='.length);
const repoRoot = path.resolve(explicitRoot ?? findRepoRoot());

if (!Number.isInteger(maxPasses) || maxPasses < 1 || maxPasses > 100) {
  throw new Error('--max-passes must be an integer from 1 to 100');
}

function findRepoRoot() {
  try {
    return execFileSync('git', ['rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return process.cwd();
  }
}

function relativeProjectPath(projectRoot) {
  const relative = path.relative(repoRoot, projectRoot);
  return relative === '' ? '.' : relative.split(path.sep).join('/');
}

function stripJsonComments(input) {
  let output = '';
  let inString = false;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (lineComment) {
      if (char === '\n') {
        lineComment = false;
        output += char;
      }
      continue;
    }

    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      } else if (char === '\n') {
        output += '\n';
      }
      continue;
    }

    if (inString) {
      output += char;
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      output += char;
    } else if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
    } else if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
    } else {
      output += char;
    }
  }

  return output.replace(/,\s*([}\]])/g, '$1');
}

async function readJsonc(filePath) {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(stripJsonComments(raw));
}

async function isDirectory(candidate) {
  try {
    return (await stat(candidate)).isDirectory();
  } catch {
    return false;
  }
}

async function isFile(candidate) {
  try {
    return (await stat(candidate)).isFile();
  } catch {
    return false;
  }
}

async function hasProjectMarker(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries.some((entry) => entry.isFile() && PROJECT_MARKERS.has(entry.name));
}

async function discoverRushProjects(projects) {
  const rushPath = path.join(repoRoot, 'rush.json');
  if (!(await isFile(rushPath))) return;

  const rush = await readJsonc(rushPath);
  for (const project of rush.projects ?? []) {
    if (typeof project?.projectFolder !== 'string') continue;
    const projectRoot = path.resolve(repoRoot, project.projectFolder);
    if (await isDirectory(projectRoot)) {
      projects.set(projectRoot, {
        source: 'rush.json',
        packageName: project.packageName ?? null,
      });
    }
  }
}

function parseGitmodules(raw, baseDirectory) {
  const paths = [];
  for (const line of raw.split(/\r?\n/u)) {
    const match = line.match(/^\s*path\s*=\s*(.+?)\s*$/u);
    if (match) paths.push(path.resolve(baseDirectory, match[1]));
  }
  return paths;
}

async function discoverSubmodules(projects) {
  if (!includeSubmodules) return;

  const queue = [repoRoot];
  const visited = new Set();

  while (queue.length > 0) {
    const directory = queue.shift();
    if (visited.has(directory)) continue;
    visited.add(directory);

    const gitmodulesPath = path.join(directory, '.gitmodules');
    if (!(await isFile(gitmodulesPath))) continue;

    const raw = await readFile(gitmodulesPath, 'utf8');
    for (const submoduleRoot of parseGitmodules(raw, directory)) {
      projects.set(submoduleRoot, {
        source: '.gitmodules',
        packageName: null,
      });
      if (await isDirectory(submoduleRoot)) queue.push(submoduleRoot);
    }
  }
}

async function discoverNestedProjects(projects) {
  const visited = new Set();

  async function walk(directory, insideProjectsDirectory = false) {
    const realKey = path.resolve(directory);
    if (visited.has(realKey)) return;
    visited.add(realKey);

    let entries;
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch {
      return;
    }

    const basename = path.basename(directory);
    const nowInsideProjects = insideProjectsDirectory || basename === 'projects';

    if (directory !== repoRoot && (await hasProjectMarker(directory))) {
      projects.set(directory, {
        source: nowInsideProjects ? 'projects-directory' : 'project-marker',
        packageName: projects.get(directory)?.packageName ?? null,
      });
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || SKIP_DIRS.has(entry.name)) continue;
      await walk(path.join(directory, entry.name), nowInsideProjects);
    }
  }

  await walk(repoRoot);
}

function projectTitle(projectRoot, metadata) {
  if (metadata.packageName) return metadata.packageName;
  if (projectRoot === repoRoot) return path.basename(repoRoot);
  return path.basename(projectRoot);
}

function scaffoldFiles(projectRoot, metadata) {
  const title = projectTitle(projectRoot, metadata);
  const relative = relativeProjectPath(projectRoot);
  const generatedNotice = '<!-- Generated by scripts/recursive-project-initializer.mjs. Existing files are preserved. -->';

  return new Map([
    [
      'AGENTS.md',
      `${generatedNotice}\n# Agent Guidelines — ${title}\n\n- Scope: \`${relative}\`.\n- Read the nearest parent \`AGENTS.md\` before editing.\n- Preserve public APIs and project conventions unless the task explicitly requires change.\n- Run the narrowest relevant checks before broader repository checks.\n- Never commit generated output, secrets, caches, or dependency directories.\n`,
    ],
    [
      '.github/copilot-instructions.md',
      `${generatedNotice}\n# Copilot Instructions — ${title}\n\nWork within \`${relative}\` and obey the nearest \`AGENTS.md\`. Inspect local manifests, tests, and README files before changing code. Prefer small, reviewable patches and report validation commands and unresolved risks.\n`,
    ],
    [
      '.clinerules/README.md',
      `${generatedNotice}\n# Cline Rules — ${title}\n\nUse the nearest \`AGENTS.md\` and \`.github/copilot-instructions.md\` as the authoritative project instructions. Preserve existing files and require explicit justification for destructive operations.\n`,
    ],
    [
      'README.md',
      `${generatedNotice}\n# ${title}\n\nProject root: \`${relative}\`.\n\n## Development\n\nInspect the local manifest and repository-level Rush configuration before installing, building, testing, or publishing this project.\n`,
    ],
    [
      'memory-bank/chatmodes/README.md',
      `${generatedNotice}\n# Chat Modes\n\nProject-specific VS Code chat modes for ${title}.\n`,
    ],
    [
      'memory-bank/instructions/README.md',
      `${generatedNotice}\n# Instructions\n\nReusable project instructions for ${title}.\n`,
    ],
    [
      'memory-bank/prompts/README.md',
      `${generatedNotice}\n# Prompts\n\nReusable project prompts for ${title}.\n`,
    ],
    [
      'memory-bank/activeContext.md',
      `${generatedNotice}\n# Active Context\n\nRecord the current objective, recent decisions, and immediate next actions for ${title}.\n`,
    ],
    [
      'memory-bank/projectbrief.md',
      `${generatedNotice}\n# Project Brief\n\nDescribe the purpose, scope, stakeholders, and constraints of ${title}.\n`,
    ],
    [
      'memory-bank/productContext.md',
      `${generatedNotice}\n# Product Context\n\nDescribe users, use cases, expected outcomes, and non-goals for ${title}.\n`,
    ],
    [
      'memory-bank/systemPatterns.md',
      `${generatedNotice}\n# System Patterns\n\nDocument architecture, boundaries, data flow, and recurring implementation patterns for ${title}.\n`,
    ],
    [
      'memory-bank/techContext.md',
      `${generatedNotice}\n# Technical Context\n\nDocument runtimes, frameworks, dependencies, commands, and environment assumptions for ${title}.\n`,
    ],
    [
      'memory-bank/progress.md',
      `${generatedNotice}\n# Progress\n\nTrack completed work, open work, blockers, and validation status for ${title}.\n`,
    ],
  ]);
}

async function ensureTextFile(filePath, content) {
  if (existsSync(filePath)) return false;
  if (!writeMode) return false;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, { encoding: 'utf8', flag: 'wx' });
  return true;
}

async function ensureVscodeSettings(projectRoot) {
  const settingsPath = path.join(projectRoot, '.vscode/settings.json');
  let settings = {};
  let exists = false;

  try {
    settings = await readJsonc(settingsPath);
    exists = true;
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      return {
        changed: false,
        problem: `cannot parse ${relativeProjectPath(settingsPath)}: ${error.message}`,
      };
    }
  }

  const merged = { ...settings };
  let changed = !exists;
  for (const [key, value] of Object.entries(REQUIRED_VSCODE_SETTINGS)) {
    if (!(key in merged)) {
      merged[key] = value;
      changed = true;
    }
  }

  if (changed && writeMode) {
    await mkdir(path.dirname(settingsPath), { recursive: true });
    await writeFile(settingsPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
  }

  return { changed, problem: null };
}

async function inspectProject(projectRoot, metadata) {
  const missing = [];
  const problems = [];
  let changed = 0;

  if (!(await isDirectory(projectRoot))) {
    return {
      missing: [],
      problems: [`unavailable project root: ${relativeProjectPath(projectRoot)}`],
      changed: 0,
    };
  }

  await access(projectRoot);
  const scaffold = scaffoldFiles(projectRoot, metadata);

  for (const [relativeFile, content] of scaffold) {
    const filePath = path.join(projectRoot, relativeFile);

    // A legacy .clinerules file and a .clinerules directory cannot coexist.
    if (
      relativeFile === '.clinerules/README.md' &&
      (await isFile(path.join(projectRoot, '.clinerules')))
    ) {
      continue;
    }

    if (!existsSync(filePath)) {
      missing.push(relativeFile);
      if (await ensureTextFile(filePath, content)) changed += 1;
    }
  }

  const settings = await ensureVscodeSettings(projectRoot);
  if (settings.problem) problems.push(settings.problem);
  if (settings.changed) {
    missing.push('.vscode/settings.json (missing required keys)');
    if (writeMode) changed += 1;
  }

  return { missing, problems, changed };
}

async function discoverProjects() {
  const projects = new Map([
    [repoRoot, { source: 'repository-root', packageName: null }],
  ]);
  await discoverRushProjects(projects);
  await discoverSubmodules(projects);
  await discoverNestedProjects(projects);
  return new Map([...projects.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

async function writeCatalog(projects, reports) {
  const catalogPath = path.join(repoRoot, 'PROJECTS.generated.md');
  const lines = [
    '<!-- Generated by scripts/recursive-project-initializer.mjs. -->',
    '# Project Catalog',
    '',
    `Generated from Rush configuration, project markers, nested \`projects/\` directories, and${includeSubmodules ? '' : ' excluding'} Git submodules.`,
    '',
    '| Project | Source | Package | Status |',
    '|---|---|---|---|',
  ];

  for (const [projectRoot, metadata] of projects) {
    const report = reports.get(projectRoot);
    const status = report?.problems.length
      ? `blocked: ${report.problems.join('; ')}`
      : report?.missing.length
        ? `missing ${report.missing.length}`
        : 'complete';
    lines.push(
      `| \`${relativeProjectPath(projectRoot)}\` | ${metadata.source} | ${metadata.packageName ?? '—'} | ${status} |`,
    );
  }

  const content = `${lines.join('\n')}\n`;
  let previous = null;
  try {
    previous = await readFile(catalogPath, 'utf8');
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }

  if (previous !== content && writeMode) {
    await writeFile(catalogPath, content, 'utf8');
    return true;
  }
  return false;
}

async function main() {
  let pass = 0;
  let totalChanges = 0;
  let projects = new Map();
  let reports = new Map();

  while (pass < maxPasses) {
    pass += 1;
    projects = await discoverProjects();
    reports = new Map();
    let passChanges = 0;

    for (const [projectRoot, metadata] of projects) {
      const report = await inspectProject(projectRoot, metadata);
      reports.set(projectRoot, report);
      passChanges += report.changed;
    }

    if (await writeCatalog(projects, reports)) passChanges += 1;
    totalChanges += passChanges;

    if (!writeMode || passChanges === 0) break;
  }

  // Final look-back verification pass.
  projects = await discoverProjects();
  reports = new Map();
  let incomplete = 0;

  for (const [projectRoot, metadata] of projects) {
    const report = await inspectProject(projectRoot, metadata);
    reports.set(projectRoot, report);
    if (report.missing.length > 0 || report.problems.length > 0) incomplete += 1;
  }

  await writeCatalog(projects, reports);

  console.log(`mode: ${writeMode ? 'write' : 'check'}`);
  console.log(`root: ${repoRoot}`);
  console.log(`projects: ${projects.size}`);
  console.log(`passes: ${pass}`);
  console.log(`files changed: ${totalChanges}`);
  console.log(`incomplete projects: ${incomplete}`);

  for (const [projectRoot, report] of reports) {
    if (report.missing.length === 0 && report.problems.length === 0) continue;
    console.log(`\n[${relativeProjectPath(projectRoot)}]`);
    for (const item of report.missing) console.log(`  missing: ${item}`);
    for (const item of report.problems) console.log(`  blocked: ${item}`);
  }

  if (checkMode && incomplete > 0) process.exitCode = 1;
  if (writeMode && incomplete > 0) process.exitCode = 2;
}

await main();
