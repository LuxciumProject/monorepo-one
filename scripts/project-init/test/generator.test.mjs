import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { planProject, applyPlan, activatePlan } from '../create-project.mjs';
import { parseJsonc, appendRootArray } from '../jsonc.mjs';
import { migrateManifest, migrateRepo } from '../migrate-yarn.mjs';
import { spawnSync } from 'node:child_process';

const sourceRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'rush-project-init-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(join(sourceRoot, 'common/templates'), join(root, 'common/templates'), { recursive: true });
  mkdirSync(join(root, 'examples/template'), { recursive: true });
  writeFileSync(join(root, 'examples/template/package.json'), JSON.stringify({ name: 'template-example', version: '1.0.0', devDependencies: { typescript: '~5.9.3', '@types/node': '~24.10.0' } }));
  mkdirSync(join(root, 'common/config/rush'), { recursive: true });
  writeFileSync(join(root, 'common/config/rush/common-versions.json'), '{}');
  writeFileSync(join(root, 'rush.json'), `// Preserve this note and URL https://example.test/a\n{ "rushVersion": "5.175.1", "pnpmVersion": "11.9.0", "projectFolderMinDepth": 2, "projectFolderMaxDepth": 3, "allowedProjectTags": ["examples", "library", "backend"], "projects": [ { "packageName": "template-example", "projectFolder": "examples/template" }, ], }`);
  return root;
}
const options = root => ({ root, parent: 'examples', name: 'new-project', dependsOn: ['template-example'] });

test('plan is read-only; apply creates lifecycle files, local link and preserves Rush comments', t => {
  const root = fixture(t), before = readFileSync(join(root, 'rush.json'), 'utf8');
  const plan = planProject(options(root));
  assert.equal(existsSync(join(root, plan.folder)), false);
  assert.equal(readFileSync(join(root, 'rush.json'), 'utf8'), before);
  applyPlan(plan);
  const packageJson = JSON.parse(readFileSync(join(root, plan.folder, 'package.json')));
  assert.equal(packageJson.dependencies['template-example'], 'workspace:*');
  assert.equal(packageJson.devDependencies.typescript, '~5.9.3');
  assert.equal(packageJson.scripts.build, 'node scripts/build.mjs');
  assert.equal(packageJson.scripts.install, 'node scripts/install.mjs');
  assert.equal(packageJson.packageManager, undefined);
  assert.equal(parseJsonc(readFileSync(join(root, 'rush.json'), 'utf8')).projects.length, 2);
  assert.ok(readFileSync(join(root, 'rush.json'), 'utf8').startsWith('// Preserve this note'));
  assert.ok(existsSync(join(root, plan.folder, 'scripts/init.mjs')));
  assert.equal(existsSync(join(root, 'package.json')), false);
});

test('rejects duplicate projects, invalid paths and missing local dependencies', t => {
  const root = fixture(t);
  assert.throws(() => planProject({ ...options(root), name: '../bad' }), /folder name/);
  assert.throws(() => planProject({ ...options(root), parent: '../library' }), /Unsupported parent/);
  assert.throws(() => planProject({ ...options(root), dependsOn: ['missing'] }), /Unknown local/);
  const plan = planProject(options(root)); applyPlan(plan);
  assert.throws(() => planProject(options(root)), /overwrite/);
});

test('conflicting baseline dependency versions stop before mutation', t => {
  const root = fixture(t);
  const rush = parseJsonc(readFileSync(join(root, 'rush.json'), 'utf8'));
  rush.projects.push({ packageName: 'other', projectFolder: 'library/other' });
  writeFileSync(join(root, 'rush.json'), JSON.stringify(rush));
  mkdirSync(join(root, 'library/other'), { recursive: true });
  writeFileSync(join(root, 'library/other/package.json'), JSON.stringify({ name: 'other', devDependencies: { typescript: '^4.0.0' } }));
  assert.throws(() => planProject(options(root)), /Conflicting ranges/);
  assert.equal(existsSync(join(root, 'examples/new-project')), false);
});

test('activation stops at failed update and never runs build or tests', t => {
  const root = fixture(t), plan = planProject(options(root)); applyPlan(plan);
  mkdirSync(join(root, 'common/scripts'), { recursive: true });
  writeFileSync(join(root, 'common/scripts/install-run-rush.js'), '');
  const calls = [];
  assert.throws(() => activatePlan(plan, (_cmd, args) => {
    calls.push(args); return { status: args.includes('update') ? 9 : 0 };
  }), /install and link/);
  assert.equal(calls.length, 3);
  assert.equal(calls.some(args => args.includes('build')), false);
});

test('activation uses pinned bootstrap then build --to before test', t => {
  const root = fixture(t), plan = planProject(options(root)); applyPlan(plan);
  mkdirSync(join(root, 'common/scripts'), { recursive: true });
  writeFileSync(join(root, 'common/scripts/install-run-rush.js'), '');
  const calls = [];
  activatePlan(plan, (_cmd, args) => { calls.push(args); return { status: 0 }; });
  assert.deepEqual(calls[3].slice(1), ['build', '--to', '@luxcium/new-project']);
  assert.ok(calls[4][0].endsWith('/scripts/test.mjs'));
});

test('concurrent configuration change aborts without creating project', t => {
  const root = fixture(t), plan = planProject(options(root));
  writeFileSync(join(root, 'rush.json'), '// changed\n' + plan.originals['rush.json']);
  assert.throws(() => applyPlan(plan), /changed after planning/);
  assert.equal(existsSync(join(root, plan.folder)), false);
});

test('JSONC insertion ignores nested keys, comments, brackets and escaped quotes', () => {
  const text = '{"nested":{"projects":[]}, /* ] */ "message":"quote \\\" ] https://a/b", "projects":[{"n":1} // tail\n]}';
  const updated = appendRootArray(text, 'projects', { n: 2 });
  assert.deepEqual(parseJsonc(updated).projects, [{ n: 1 }, { n: 2 }]);
  assert.ok(updated.includes('// tail'));
});

test('migration removes known install build and Yarn selector; preserves quoted text', () => {
  const before = { packageManager: 'yarn@1.22.22', scripts: { install: 'pwd; yarn build || exit 13; pwd', build: 'tsc', coverage: 'jest', message: 'echo "yarn build"', test: 'yarn coverage' } };
  const result = migrateManifest(before);
  assert.equal(result.manifest.scripts.install, undefined);
  assert.equal(result.manifest.packageManager, undefined);
  assert.equal(result.manifest.scripts.test, 'rushx coverage');
  assert.equal(result.manifest.scripts.message, before.scripts.message);
  assert.equal(result.review.length, 1);
  assert.equal(before.packageManager, 'yarn@1.22.22');
});

test('migration skips submodules and is idempotent', t => {
  const root = fixture(t);
  const path = join(root, 'examples/template/package.json');
  const pkg = JSON.parse(readFileSync(path)); pkg.packageManager = 'yarn@1'; writeFileSync(path, JSON.stringify(pkg));
  writeFileSync(join(root, '.gitmodules'), '[submodule "example"]\n path = examples/template\n');
  assert.equal(migrateRepo(root, true).changed.length, 0);
  assert.equal(JSON.parse(readFileSync(path)).packageManager, 'yarn@1');
  writeFileSync(join(root, '.gitmodules'), '');
  assert.equal(migrateRepo(root, true).changed.length, 1);
  assert.equal(migrateRepo(root, true).changed.length, 0);
});

test('reserved lifecycle scripts run as explicit no-ops with consistent pending state', t => {
  const root = fixture(t), plan = planProject(options(root)); applyPlan(plan);
  const cwd = join(root, plan.folder);
  const state = JSON.parse(readFileSync(join(cwd, 'config/lifecycle.json')));
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json')));
  for (const phase of state.pending) {
    assert.equal(pkg.scripts[phase], `node scripts/${phase}.mjs`);
    const result = spawnSync(process.execPath, [`scripts/${phase}.mjs`], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const output = JSON.parse(result.stdout);
    assert.equal(output.status, 'no-op'); assert.equal(output.configured, false);
  }
});
