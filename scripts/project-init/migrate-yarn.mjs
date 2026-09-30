#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseJsonc } from './jsonc.mjs';

// Deliberately narrow transformations: never replace an arbitrary word in source,
// a quoted message, a comment, an unregistered project or a nested Git repository.
export function migrateManifest(manifest) {
  const result = structuredClone(manifest), changes = [], review = [];
  if (result.packageManager?.startsWith('yarn@')) {
    delete result.packageManager; changes.push('Remove Yarn selector; Rush pins pnpm in rush.json');
  }
  for (const [key, command] of Object.entries(result.scripts ?? {})) {
    if (!/\byarn\b/i.test(command)) continue;
    if (key === 'install' && /^pwd;\s*(?:#\s*)?yarn build \|\| exit (?:0|13); pwd$/.test(command)) {
      delete result.scripts[key]; changes.push('Remove installation-time build; Rush build controls dependency order'); continue;
    }
    // Recognized invocation syntax; verify the target script exists.
    let updated = command;
    const direct = /^yarn (?:run )?([a-zA-Z0-9:_-]+)(.*)$/.exec(command);
    if (direct && result.scripts[direct[1]] && !direct[2].includes('yarn')) {
      updated = `rushx ${direct[1]}${direct[2]}`;
    } else if (command === '(yarn coverage && bash scripts/build.sh) || exit 15' && result.scripts.coverage) {
      updated = '(rushx coverage && bash scripts/build.sh) || exit 15';
    }
    if (updated !== command) { result.scripts[key] = updated; changes.push(`${key}: ${command} -> ${updated}`); }
    else review.push({ script: key, command, reason: 'Not a recognized safe transformation' });
  }
  return { manifest: result, changes, review };
}

export function migrateRepo(root, apply = false) {
  const rush = parseJsonc(readFileSync(join(root, 'rush.json'), 'utf8'));
  const submodulesFile = join(root, '.gitmodules');
  const submodules = existsSync(submodulesFile) ? [...readFileSync(submodulesFile, 'utf8').matchAll(/^\s*path\s*=\s*(.+)$/gm)].map(m => m[1].trim()) : [];
  const report = { changed: [], review: [], skipped: [], applied: apply };
  const pending = [];
  for (const project of rush.projects) {
    const path = `${project.projectFolder}/package.json`;
    if (submodules.some(p => project.projectFolder === p || project.projectFolder.startsWith(p + '/'))) {
      report.skipped.push({ path, reason: 'Separate Git submodule repository' }); continue;
    }
    if (!existsSync(join(root, path))) { report.skipped.push({ path, reason: 'Missing manifest' }); continue; }
    const original = readFileSync(join(root, path), 'utf8');
    // Fast keyword prefilter: only parse candidates.
    if (!/\byarn\b/i.test(original)) continue;
    const before = JSON.parse(original), migrated = migrateManifest(before);
    if (migrated.changes.length) {
      const next = JSON.stringify(migrated.manifest, null, 2) + '\n';
      pending.push({ path, original, next }); report.changed.push({ path, changes: migrated.changes });
    }
    report.review.push(...migrated.review.map(x => ({ path, ...x })));
  }
  if (apply) {
    const written = [];
    try {
      for (const item of pending) {
        if (readFileSync(join(root, item.path), 'utf8') !== item.original) throw new Error(`File changed during planning: ${item.path}`);
        written.push(item); writeFileSync(join(root, item.path), item.next);
      }
    } catch (error) {
      for (const item of written) writeFileSync(join(root, item.path), item.original);
      throw error;
    }
  }
  return report;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const args = process.argv.slice(2);
    const index = args.indexOf('--root');
    const root = index >= 0 ? resolve(args[index + 1]) : resolve(dirname(fileURLToPath(import.meta.url)), '../..');
    if (args.some(x => x !== '--root' && x !== '--apply' && x !== args[index + 1])) throw new Error('Usage: migrate-yarn.mjs [--root PATH] [--apply]');
    console.log(JSON.stringify(migrateRepo(root, args.includes('--apply')), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
