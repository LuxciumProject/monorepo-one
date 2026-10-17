import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { projectRoot } from './run.mjs';
for (const path of ['package.json', 'tsconfig.json', 'src/index.ts', 'scripts/build.mjs', 'scripts/test.mjs']) {
  if (!existsSync(join(projectRoot, path))) throw new Error(`Missing project file: ${path}`);
}
console.log('Initial project structure verified.');
