/**
 * Represents a type that can unbox an internal value T.
 * @remarks
 * Must not validate the value here.
 * Must not change the value here.
 * Must return value as is.
 * @typeParam T - The type to be unboxed.
 */
export interface Unboxable<T> {
  /**
   * Unboxes the internal values T.
   * @remarks
   * No parts of unbox's return value should be checked.
   * Value will be returned as is.
   * Value will not be validated.
   * Value will not be changed.
   * @typeParam T - The type of the value contained in the Functor.
   * @returns T
   */
  unbox: () => T;
}
