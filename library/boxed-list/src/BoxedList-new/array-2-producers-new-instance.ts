// ============================================================================
// array-2-producers-new-instance.ts
// ----------------------------------------------------------------------------
// SPLIT 2 of 3 — Methods whose return type is exactly `T[]` and whose returned
// value is a NEW, DISTINCT array instance (same element type T, no projection).
//
// Membership rule: return type is literally `T[]`, and the returned array is a
// fresh allocation, NOT the receiver. Whether the receiver is mutated is
// orthogonal — `splice` mutates in place yet returns a NEW array of removed
// elements, so it lives here, not in split 1.
//
// Excluded by design: element-TRANSFORMING producers (`map`→U[], `flatMap`→U[],
// `flat`→FlatArray[], `filter`→S[]/T[]) — those change or narrow the element
// type and are grouped with the projection family in split 3.
//
// Ordering: all members are methods; listed alphabetically.
// Source of truth: TypeScript 6.0.3 lib.es5.d.ts + lib.es2023.array.d.ts.
// ============================================================================

import type { ConcatArray } from './array-3-residual-and-statics';

export interface ArrayProducersNewInstance<T> {
  // -- concat ------------------------------------------------------------- //
  /**
   * Combines this array with additional arrays/items into a NEW array.
   * Does not mutate. Overloaded for spreadable concat-arrays vs mixed items.
   */
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];

  // -- slice -------------------------------------------------------------- //
  /**
   * Returns a NEW array: the `[start, end)` shallow section. Negative indices
   * count from the end. Does not mutate.
   */
  slice(start?: number, end?: number): T[];

  // -- splice ------------------------------------------------------------- //
  /**
   * Removes (and optionally inserts) elements in place, returning a NEW array
   * of the removed elements. MUTATES the receiver but the RETURN is a fresh
   * instance — hence this split, not split 1.
   */
  splice(start: number, deleteCount?: number): T[];
  splice(start: number, deleteCount: number, ...items: T[]): T[];

  // -- toReversed --------------------------------------------------------- //
  /**
   * Returns a NEW reversed copy. Non-mutating counterpart of `reverse`.
   */
  toReversed(): T[];

  // -- toSorted ----------------------------------------------------------- //
  /**
   * Returns a NEW sorted copy. Non-mutating counterpart of `sort`.
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  // -- toSpliced ---------------------------------------------------------- //
  /**
   * Returns a NEW array with elements removed/inserted. Non-mutating
   * counterpart of `splice` (returns the resulting array, not the removed).
   */
  toSpliced(start: number, deleteCount: number, ...items: T[]): T[];
  toSpliced(start: number, deleteCount?: number): T[];

  // -- with --------------------------------------------------------------- //
  /**
   * Returns a NEW array with the element at `index` overwritten by `value`.
   * Negative index counts from the end. Non-mutating single-element replace.
   */
  with(index: number, value: T): T[];
}
