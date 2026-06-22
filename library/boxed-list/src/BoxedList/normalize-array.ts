// normalize-array.ts
// Safely convert any of TVal | TVal[] | [TVal[]] → TVal[]

// ─── Union type for all three input shapes ─────────────────────────────────────

import type { Wrappable } from '@/types';
import { isArr } from './isArr';
import { isWrappedShape } from './isWrappedShape';
// ─── Type guards (exported) ────────────────────────────────────────────────────

/** Narrows to the bare `TVal` case. */
export function isBareVal<TVal>(
  value: Wrappable<TVal>,
  isVal: (x: unknown) => x is TVal
): value is TVal {
  return isVal(value);
}

/** Narrows to the `TVal[]` case (flat array of values). */
export function isFlatArray<TVal>(
  value: Wrappable<TVal>,
  isVal: (x: unknown) => x is TVal
): value is TVal[] {
  return isArr(value) && !isWrappedShape(value, isVal) && value.every(isVal);
}

/** Narrows to the `[TVal[]]` case (1-tuple wrapping the flat array). */
export function isWrappedArray<TVal>(
  value: Wrappable<TVal>,
  isVal: (x: unknown) => x is TVal
): value is [TVal[]] {
  return isArr(value) && isWrappedShape(value, isVal);
}

// ─── toArray — heuristic (no predicate) ───────────────────────────────────────

/**
 * Converts any `Wrappable<TVal>` to `TVal[]`.
 *
 * Detection strategy (all three cases handled):
 *
 *   TVal          → wraps in a new single-element array
 *   TVal[]        → returned as-is (identity)
 *   [TVal[]]      → unwraps by returning the sole inner array
 *
 * Runtime heuristic for `[TVal[]]`:
 *   `Array.isArray(value) && value.length === 1 && Array.isArray(value[0])`
 *
 * ⚠  If TVal is itself an array type (e.g. `TVal = number[]`) this heuristic
 *    is ambiguous. Use `toArrayWith` or `assertToArray` instead, and pass an
 *    `isVal` predicate so detection is unambiguous.
 */
export function toArray<TVal>(value: Wrappable<TVal>) {
  if (!isArr(value)) {
    // ① bare TVal → [value]
    return [value];
  }
  if (isWrappedShape<TVal>(value)) {
    // ③ [TVal[]] → value[0]
    return value[0];
  }
  // ② TVal[] → identity
  return value;
}

// ─── toArrayWith — predicate-guarded (handles unknown & array-valued TVal) ────

export type NormalizeOk<TVal> = { ok: true; value: TVal[] };
export type NormalizeErr = { ok: false; reason: string };
export type NormalizeResult<TVal> = NormalizeOk<TVal> | NormalizeErr;

/**
 * Like `toArray` but accepts `unknown` as input and validates every element
 * with the supplied `isVal` predicate before committing to a shape.
 *
 * Returns a discriminated-union result — no throws.
 *
 * Order of shape probing:
 *   1. Not an array → try bare TVal
 *   2. length === 1 && inner element is array of TVal → unwrap [TVal[]]
 *   3. Every element satisfies isVal → flat TVal[]
 *   4. Otherwise → { ok: false, reason }
 */
export function toArrayWith<TVal>(
  input: unknown,
  isVal: (x: unknown) => x is TVal
): NormalizeResult<TVal> {
  if (!isArr(input)) {
    if (isVal(input)) return { ok: true, value: [input] };
    return { ok: false, reason: 'Input is not TVal and not an array.' };
  }

  // Probe for [TVal[]] first — must come before flat-array check so a
  // single-element wrapped array is never mistaken for TVal[].
  if (isWrappedShape(input, isVal)) {
    return { ok: true, value: input[0] };
  }

  if (input.every(isVal)) {
    return { ok: true, value: input };
  }

  return {
    ok: false,
    reason:
      'Input is an array but its elements do not conform to TVal ' +
      '(and it does not match the [TVal[]] shape either).',
  };
}

// ─── assertToArray — throws on failure ────────────────────────────────────────

/**
 * Asserts that `input` conforms to `TVal | TVal[] | [TVal[]]` and returns
 * the normalized `TVal[]`.  Throws `TypeError` on any mismatch.
 *
 * Useful at API boundaries where you want hard failure, not a result type.
 */
export function assertToArray<TVal>(
  input: unknown,
  isVal: (x: unknown) => x is TVal,
  label = 'assertToArray'
): TVal[] {
  const result = toArrayWith(input, isVal);
  if (!result.ok) throw new TypeError(`[${label}] ${result.reason}`);
  return result.value;
}

// ─── Usage examples (stripped by your bundler in prod) ────────────────────────

if (process.env['NODE_ENV'] !== 'production') {
  const isString = (x: unknown): x is string => typeof x === 'string';

  // ① bare value
  console.assert(
    JSON.stringify(toArray('hello')) === '["hello"]',
    'bare value'
  );

  // ② flat array
  console.assert(
    JSON.stringify(toArray(['a', 'b'])) === '["a","b"]',
    'flat array'
  );

  // ③ wrapped array [TVal[]]
  console.assert(
    JSON.stringify(toArray([['x', 'y', 'z']])) === '["x","y","z"]',
    'wrapped array'
  );

  // safe version — unknown input
  const r1 = toArrayWith<string>('hello', isString);
  console.assert(
    r1.ok && JSON.stringify(r1.value) === '["hello"]',
    'safe bare'
  );

  const r2 = toArrayWith<string>([['a', 'b']], isString);
  console.assert(
    r2.ok && JSON.stringify(r2.value) === '["a","b"]',
    'safe wrapped'
  );

  const r3 = toArrayWith<string>(42, isString);
  console.assert(!r3.ok, 'safe rejects non-TVal');

  console.log('All assertions passed ✓');
}
