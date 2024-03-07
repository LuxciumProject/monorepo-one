/** `IUnbox<T>` Unboxes the value `T` from inside Functors ({@link IMap})
 *
 * @typeParam T Type `T` is treated as a scalar value and may contain
 * a primitive type, an object or even an array which is treated as a whole.
 */
export interface IUnbox<T> {
  /** Unboxes the value `T` from inside the _current_ Functor. */
  unbox(): T;
}
