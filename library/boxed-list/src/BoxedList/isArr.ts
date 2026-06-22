// ─── Internal shape discriminators ────────────────────────────────────────────
/**
 * Type guard for `unknown[]` (narrows to `unknown[]`).
 *
/**
True when `v` is an `Array` (narrows to `unknown[]`). */
export const isArr = (v: unknown): v is unknown[] => Array.isArray(v);
