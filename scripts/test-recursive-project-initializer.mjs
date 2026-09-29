#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const initializer = path.join(scriptDirectory, 'recursive-project-initializer.mjs');
const fixture = await mkdtemp(path.join(os.tmpdir(), 'recursive-project-initializer-'));

function run(...args) {
  return spawnSync(process.execPath, [initializer, ...args], {
    encoding: 'utf8',
    cwd: fixture,
  });
}

try {
  const appRoot = path.join(fixture, 'frontend/projects/app');
  const nestedRoot = path.join(fixture, 'frontend/projects/group/nested-app');
  const submoduleRoot = path.join(fixture, 'services/example-submodule');

  await mkdir(appRoot, { recursive: true });
  await mkdir(nestedRoot, { recursive: true });
  await mkdir(submoduleRoot, { recursive: true });

  await writeFile(
    path.join(fixture, 'rush.json'),
    `{
      // JSONC comments and trailing commas are intentional.
      "projects": [
        {
          "packageName": "fixture-app",
          "projectFolder": "frontend/projects/app",
        },
      ],
    }
`,
    'utf8',
  );
  await writeFile(path.join(appRoot, 'package.json'), '{"name":"fixture-app"}\n', 'utf8');
  await writeFile(path.join(nestedRoot, 'pyproject.toml'), '[project]\nname = "nested-app"\n', 'utf8');
  await writeFile(path.join(submoduleRoot, 'go.mod'), 'module example.invalid/submodule\n', 'utf8');
  await writeFile(
    path.join(fixture, '.gitmodules'),
    `[submodule "example-submodule"]
      path = services/example-submodule
      url = https://example.invalid/example-submodule.git
`,
    'utf8',
  );

  // Confirm a legacy .clinerules file is preserved instead of being replaced by a directory.
  await writeFile(path.join(appRoot, '.clinerules'), 'preserve me\n', 'utf8');

  const writeResult = run('--write', `--root=${fixture}`, '--max-passes=6');
  assert.equal(
    writeResult.status,
    0,
    `write failed\nstdout:\n${writeResult.stdout}\nstderr:\n${writeResult.stderr}`,
  );
  assert.match(writeResult.stdout, /incomplete projects: 0/u);

  const checkResult = run('--check', `--root=${fixture}`);
  assert.equal(
    checkResult.status,
    0,
    `check failed\nstdout:\n${checkResult.stdout}\nstderr:\n${checkResult.stderr}`,
  );
  assert.match(checkResult.stdout, /files changed: 0/u);
  assert.match(checkResult.stdout, /incomplete projects: 0/u);

  for (const projectRoot of [fixture, appRoot, nestedRoot, submoduleRoot]) {
    assert.ok(existsSync(path.join(projectRoot, 'AGENTS.md')));
    assert.ok(existsSync(path.join(projectRoot, '.github/copilot-instructions.md')));
    assert.ok(existsSync(path.join(projectRoot, '.vscode/settings.json')));
    assert.ok(existsSync(path.join(projectRoot, 'memory-bank/progress.md')));
  }

  assert.equal(await readFile(path.join(appRoot, '.clinerules'), 'utf8'), 'preserve me\n');
  assert.equal(existsSync(path.join(appRoot, '.clinerules/README.md')), false);

  const catalog = await readFile(path.join(fixture, 'PROJECTS.generated.md'), 'utf8');
  assert.match(catalog, /frontend\/projects\/app/u);
  assert.match(catalog, /frontend\/projects\/group\/nested-app/u);
  assert.match(catalog, /services\/example-submodule/u);
  assert.doesNotMatch(catalog, /missing [1-9]/u);

  console.log('recursive project initializer smoke test passed');
} finally {
  await rm(fixture, { recursive: true, force: true });
}
