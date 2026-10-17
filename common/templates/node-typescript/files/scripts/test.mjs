import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { projectRoot, run } from './run.mjs';
await import('./pretest.mjs');
const tests = readdirSync(join(projectRoot, 'test')).filter(name => name.endsWith('.test.cjs'));
if (!tests.length) throw new Error('No tests found in test/.');
run(['--test', ...tests.map(name => join('test', name))]);
await import('./posttest.mjs');
