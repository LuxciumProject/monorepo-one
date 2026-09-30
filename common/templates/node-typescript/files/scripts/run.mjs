import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(new URL('../package.json', import.meta.url));
export function run(args) {
  const result = spawnSync(process.execPath, args, { cwd: projectRoot, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Command failed (${result.status ?? result.signal}): node ${args.join(' ')}`);
}
export function compile(extra = []) {
  run([require.resolve('typescript/bin/tsc'), '-p', 'tsconfig.json', ...extra]);
}
