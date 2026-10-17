import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { projectRoot } from './run.mjs';
export function noop(phase) {
  const state = JSON.parse(readFileSync(join(projectRoot, 'config/lifecycle.json'), 'utf8'));
  if (!state.pending.includes(phase)) throw new Error(`Lifecycle state and no-op implementation disagree: ${phase}`);
  console.log(JSON.stringify({ phase, status: 'no-op', configured: false,
    reason: 'Reserved lifecycle entry; implement this script and update config/lifecycle.json when defined.' }));
}
