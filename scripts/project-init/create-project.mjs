#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, realpathSync } from 'node:fs';
import { resolve, join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { parseJsonc, appendRootArray } from './jsonc.mjs';

const json = value => JSON.stringify(value, null, 2) + '\n';
const read = path => parseJsonc(readFileSync(path, 'utf8'));
function fail(message) { throw new Error(message); }
function inside(root, path) {
  const rel = relative(root, path);
  if (rel === '..' || rel.startsWith('..' + sep)) fail(`Path escapes repository: ${path}`);
  return path;
}
function walk(root, prefix = '') {
  return readdirSync(join(root, prefix), { withFileTypes: true }).flatMap(entry => {
    if (entry.isSymbolicLink()) fail('Template symlinks are not supported');
    const path = join(prefix, entry.name);
    return entry.isDirectory() ? walk(root, path) : [path];
  });
}
function rangeFor(name, manifests, policies, source) {
  const observed = [...new Set(manifests.flatMap(p => [p.dependencies?.[name], p.devDependencies?.[name], p.optionalDependencies?.[name]])
    .filter(value => value && !value.startsWith('workspace:')))];
  const alternatives = policies.allowedAlternativeVersions?.[name] ?? [];
  const normal = observed.filter(value => !alternatives.includes(value));
  if (normal.length > 1) fail(`Conflicting ranges for ${name}: ${normal.join(', ')}. Resolve existing inconsistency first.`);
  if (normal.length === 1) return normal[0];
  const preferred = policies.preferredVersions?.[name];
  if (preferred && (!observed.length || observed.includes(preferred))) return preferred;
  const fallback = source.devDependencies?.[name];
  if (fallback && (!observed.length || alternatives.includes(fallback) || observed.includes(fallback))) return fallback;
  fail(`No unambiguous existing version for ${name}`);
}

export function planProject(options) {
  const root = realpathSync(options.root);
  const rushPath = join(root, 'rush.json');
  const rushText = readFileSync(rushPath, 'utf8'), rush = parseJsonc(rushText);
  const templateRoot = join(root, 'common/templates', options.template ?? 'node-typescript');
  if (!/^[a-z0-9-]+$/.test(options.template ?? 'node-typescript')) fail('Invalid template identifier');
  const template = read(join(templateRoot, 'template.json'));
  const parent = options.parent, parentRules = template.parents[parent];
  if (!parentRules) fail(`Unsupported parent ${parent}; choose ${Object.keys(template.parents).join(', ')}`);
  if (!/^[a-z0-9][a-z0-9-]*$/.test(options.name ?? '')) fail('Project folder name must be lowercase letters, digits and hyphens');
  const folder = `${parent}/${options.name}`;
  const depth = folder.split('/').length;
  if (depth < (rush.projectFolderMinDepth ?? 1) || depth > (rush.projectFolderMaxDepth ?? 2)) fail('Project depth violates rush.json');
  const target = inside(root, join(root, folder));
  let ancestor = dirname(target);
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  inside(root, realpathSync(ancestor));
  if (existsSync(target)) fail(`Refusing to overwrite existing project: ${folder}`);
  const name = options.packageName ?? `@luxcium/${options.name}`;
  if (!/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/.test(name)) fail('Invalid package name');
  if (rush.projects.some(p => p.packageName === name || p.projectFolder === folder)) fail('Project name or folder already registered');
  const manifests = [], missing = [];
  for (const project of rush.projects) {
    const path = inside(root, join(root, project.projectFolder, 'package.json'));
    if (!existsSync(path)) { missing.push(project.projectFolder); continue; }
    const manifest = read(path);
    if (manifest.name !== project.packageName) fail(`Manifest name disagrees with Rush in ${project.projectFolder}`);
    manifests.push(manifest);
  }
  if (missing.length) fail(`Missing project manifests (initialize submodules if needed): ${missing.join(', ')}`);
  const subspacePath = join(root, 'common/config/rush/subspaces.json');
  const subspaces = existsSync(subspacePath) ? read(subspacePath) : {};
  const enabled = subspaces.subspacesEnabled === true;
  const peers = rush.projects.filter(p => p.projectFolder.startsWith(parent + '/'));
  const spaces = [...new Set(peers.map(p => p.subspaceName ?? 'default'))];
  let subspaceName;
  if (enabled) {
    subspaceName = options.subspace ?? (spaces.length === 1 ? spaces[0] : 'default');
    if (subspaceName !== 'default' && !subspaces.subspaceNames?.includes(subspaceName)) fail(`Unregistered subspace: ${subspaceName}`);
  } else if (options.subspace) fail('Subspaces are not enabled');
  const policyPath = enabled ? join(root, 'common/config/subspaces', subspaceName, 'common-versions.json') : join(root, 'common/config/rush/common-versions.json');
  const policies = existsSync(policyPath) ? read(policyPath) : {};
  const source = read(inside(root, join(root, template.dependencySource)));
  const versionManifests = enabled ? manifests.filter(manifest => {
    const project = rush.projects.find(p => p.packageName === manifest.name);
    return (project.subspaceName ?? 'default') === subspaceName;
  }) : manifests;
  const files = {};
  for (const path of walk(join(templateRoot, 'files'))) {
    files[path] = readFileSync(join(templateRoot, 'files', path), 'utf8')
      .replaceAll('__PACKAGE_NAME__', name).replaceAll('__PROJECT_FOLDER__', folder);
  }
  const pkg = parseJsonc(files['package.json']);
  const selected = {};
  for (const dependency of template.baseDevDependencies) selected[dependency] = rangeFor(dependency, versionManifests, policies, source);
  pkg.devDependencies = selected;
  const local = [...new Set(options.dependsOn ?? [])];
  for (const dependency of local) {
    if (!rush.projects.some(p => p.packageName === dependency)) fail(`Unknown local dependency: ${dependency}`);
    pkg.dependencies[dependency] = 'workspace:*';
  }
  files['package.json'] = json(pkg);
  const entry = { packageName: name, projectFolder: folder, shouldPublish: false, tags: [parentRules.tag] };
  if (enabled && subspaceName !== 'default') entry.subspaceName = subspaceName;
  const tags = rush.allowedProjectTags;
  if (tags && !tags.includes(parentRules.tag)) fail(`Tag not allowed: ${parentRules.tag}`);
  const changedRush = appendRootArray(rushText, 'projects', entry);
  const provenance = { template: template.id, parent, projectFolder: folder, dependencySource: template.dependencySource,
    versions: selected, localDependencies: local, rushVersion: rush.rushVersion, pnpmVersion: rush.pnpmVersion };
  files['config/project-init.json'] = json(provenance);
  const config = { 'rush.json': changedRush };
  if (options.workspace) {
    const workspacePath = inside(root, resolve(root, options.workspace));
    const old = readFileSync(workspacePath, 'utf8');
    const workspace = parseJsonc(old);
    const path = relative(dirname(workspacePath), target).split(sep).join('/');
    if (workspace.folders.some(f => f.path === path)) fail('Workspace already references target');
    config[relative(root, workspacePath)] = appendRootArray(old, 'folders', { name, path });
  }
  const warnings = !enabled && rush.projects.some(p => p.subspaceName) ? ['Existing Rush projects specify subspaces, but no enabled registry was found; new project uses default configuration.'] : [];
  return { root, folder, name, files, config, originals: Object.fromEntries(Object.keys(config).map(path => [path, readFileSync(join(root, path), 'utf8')])), provenance, warnings };
}

export function applyPlan(plan) {
  const target = join(plan.root, plan.folder);
  if (existsSync(target)) fail('Target appeared after planning; refusing to overwrite');
  for (const [path, old] of Object.entries(plan.originals)) {
    if (readFileSync(join(plan.root, path), 'utf8') !== old) fail(`Configuration changed after planning: ${path}`);
  }
  mkdirSync(dirname(target), { recursive: true });
  mkdirSync(target);
  const written = [];
  try {
    for (const [path, content] of Object.entries(plan.files)) {
      const dest = join(target, path); mkdirSync(dirname(dest), { recursive: true }); writeFileSync(dest, content, { flag: 'wx' });
    }
    for (const [path, content] of Object.entries(plan.config)) {
      written.push(path); writeFileSync(join(plan.root, path), content);
    }
  } catch (error) {
    for (const path of written) writeFileSync(join(plan.root, path), plan.originals[path]);
    rmSync(target, { recursive: true, force: true }); throw error;
  }
}

export function activatePlan(plan, runner = spawnSync) {
  const bootstrap = join(plan.root, 'common/scripts/install-run-rush.js');
  if (!existsSync(bootstrap)) fail('Missing official Rush bootstrap: common/scripts/install-run-rush.js');
  const steps = [
    ['init', [join(plan.root, plan.folder, 'scripts/init.mjs')]],
    ['dependency policy', [bootstrap, 'check']],
    ['install and link', [bootstrap, 'update']],
    ['build dependencies and project', [bootstrap, 'build', '--to', plan.name]],
    ['test compiled project', [join(plan.root, plan.folder, 'scripts/test.mjs')]]
  ];
  for (const [label, args] of steps) {
    console.log(`STEP ${label}`);
    const result = runner(process.execPath, args, { cwd: join(plan.root, plan.folder), stdio: 'inherit' });
    if (result.error || result.status !== 0) fail(`Activation failed at ${label}; generated files retained. ${result.error?.message ?? `Exit ${result.status ?? result.signal}`}`);
  }
}

export function cli(argv) {
  const o = { root: resolve(dirname(fileURLToPath(import.meta.url)), '../..'), dependsOn: [] };
  let apply = false, install = true;
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i];
    if (key === '--apply') { apply = true; continue; }
    if (key === '--no-install') { install = false; continue; }
    if (key === '--help') { console.log('create-project --parent library|services|examples|APIs|backend|frontend --name NAME [--package-name NAME] [--depends-on PACKAGE] [--workspace FILE] [--subspace NAME] [--root PATH] [--apply] [--no-install]\nDefault: read-only plan. --apply creates the project and activates it with Rush.'); return; }
    const mapping = { '--parent': 'parent', '--name': 'name', '--package-name': 'packageName', '--workspace': 'workspace', '--root': 'root', '--template': 'template', '--subspace': 'subspace' };
    if (key === '--depends-on') { if (!argv[i + 1] || argv[i + 1].startsWith('--')) fail('Missing dependency'); o.dependsOn.push(argv[++i]); continue; }
    if (!mapping[key] || !argv[i + 1] || argv[i + 1].startsWith('--')) fail(`Unknown option or missing value: ${key}`);
    o[mapping[key]] = argv[++i];
  }
  const plan = planProject(o);
  console.log(json({ status: apply ? 'applying' : 'plan', project: plan.folder, packageName: plan.name,
    files: Object.keys(plan.files), config: Object.keys(plan.config), versions: plan.provenance.versions, warnings: plan.warnings }));
  if (apply) {
    if (install && !existsSync(join(plan.root, 'common/scripts/install-run-rush.js'))) fail('Rush bootstrap missing; nothing written');
    applyPlan(plan);
    if (install) activatePlan(plan);
    console.log(json({ status: install ? 'activated-with-pending-phases' : 'created-not-installed', project: plan.folder,
      pendingPhases: parseJsonc(plan.files['config/lifecycle.json']).pending }));
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { cli(process.argv.slice(2)); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
