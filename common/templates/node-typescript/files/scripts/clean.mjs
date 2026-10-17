import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { projectRoot } from './run.mjs';
rmSync(join(projectRoot, 'dist'), { recursive: true, force: true });
