// ============================================================================
// array-1-mutators-same-instance.ts
// ----------------------------------------------------------------------------
// SPLIT 1 of 3 — Instance methods that MUTATE the array in place AND RETURN
// THE SAME REFERENCE (receiver identity preserved).
//
// Membership rule: runtime returns `this` (the very array it was called on).
// Type signature is either `this` or `T[]`; in every case the returned value
// IS the receiver, never a copy.
//
// Ordering: all members are methods (no getters / non-method members exist in
// this split), so nothing is floated above; listed alphabetically.
// Source of truth: TypeScript 6.0.3 lib.es5.d.ts + lib.es2015.core.d.ts.
// ============================================================================

export interface ArrayMutatorsSameInstance<T> {
  // -- copyWithin --------------------------------------------------------- //
  /**
   * Copies a section of the array onto itself, in place.
   * Mutates the receiver; returns the SAME array (`this`).
   */
  copyWithin(target: number, start: number, end?: number): this;

  // -- fill --------------------------------------------------------------- //
  /**
   * Overwrites the `[start, end)` range with a static `value`, in place.
   * Mutates the receiver; returns the SAME array (`this`).
   */
  fill(value: T, start?: number, end?: number): this;

  // -- reverse ------------------------------------------------------------ //
  /**
   * Reverses the elements in place.
   * Mutates the receiver; returns the SAME array (typed `T[]`, identity-equal
   * to the receiver — contrast with `toReversed`, which copies).
   */
  reverse(): T[];

  // -- sort --------------------------------------------------------------- //
  /**
   * Sorts the elements in place using `compareFn` (UTF-16 order if omitted).
   * Mutates the receiver; returns the SAME array (`this`).
   */
  sort(compareFn?: (a: T, b: T) => number): this;
}
