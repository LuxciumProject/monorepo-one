import { FlatArray } from './array-complete-three-partition';

// ─────────────────────────────────────────────────────────────────────────
// PARTITION 3: Declarative Operations (Derivation)
// All non-mutating methods; subdivided by return type and semantic purpose
// ─────────────────────────────────────────────────────────────────────────
// ─── 3a: New Array Derivation ───────────────────────────────────────────
/**
 * Methods that return a new T[] array without mutating the original BoxedList
 */
export interface BoxedListDeclarativeNewBoxedList<T> {
  /**
   * Returns a new array combining this array with other arrays/values
   */

  /**
   * Returns a new array with sub-arrays flattened to the specified depth
   */
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];

  /**
   * Returns a new array: maps each element, then flattens one level
   */
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];

  /**
   * Returns a new array of transformed elements
   */
  map<U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}
