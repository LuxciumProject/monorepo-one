import { compile } from './run.mjs';
await import('./prebuild.mjs');
compile();
await import('./postbuild.mjs');
