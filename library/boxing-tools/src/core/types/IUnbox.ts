import { Unbox } from './Unbox';

/**
 * Represents a type that can be unboxed.
 *
 * @template U - The type of the value stored in the box.
 * @public
 */

export interface IUnbox<U> {
  /**
   * Extracts the value stored in the box.
   *
   * @returns The unboxed value.
   * @public
   */
  unbox(): Unbox<U> | U;
}
