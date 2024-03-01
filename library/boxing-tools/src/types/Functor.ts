/**
 * A Functor is a type that implements a map function.
 * @remarks
 * The map function applies a function to the value of the Functor.
 * The value of the Functor will be passed to the function.
 * The return value of the function will be wrapped in a new Functor.
 * No parts of fun's return value should be checked.
 *
 * @typeParam T - The type of the value contained in the Functor.
 */
export interface Functor<T> {
  /**
   * Applies a function to the value of the Functor.
   * @remarks
   * The value of the Functor will be passed to the function.
   * The return value of the function will be wrapped in a new Functor.
   * No parts of fun's return value should be checked.
   * @typeParam T - The type of the value contained in the Functor.
   * @typeParam R - The type of the return value of the function.
   * @param fun - A function which takes a value of type T and returns a value of type R.
   * @returns Functor<R>
   */
  map: <R>(fun: (value: T) => R) => Functor<R>;
}
