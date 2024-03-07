import { IUnbox } from './IUnbox';

/**
 * ## IMap define a basic Functor
 *

 * @remarks
 * </br>
 *
 * ### Functor
 *
 * 1. `u['fantasy-land/map'](a => a)` is equivalent to `u` (identity)
 * 2. `u['fantasy-land/map'](x => f(g(x)))` is equivalent to `u['fantasy-land/map'](g)['fantasy-land/map'](f)` (composition).
 *
 * <a name="map-method"></a>
 *
 * #### `fantasy-land/map` method
 *
 * </br>
 *
 * ```haskell
 * fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b
 * ```
 * </br>
 *
 * A value which has a Functor must provide a `fantasy-land/map` method. The `fantasy-land/map`
 * method takes one argument:
 * </br>
 *
 *     u['fantasy-land/map'](f)
 *
 * 1. `f` must be a function,
 *     1. If `f` is not a function, the behaviour of `fantasy-land/map` is
 *        unspecified.
 *     2. `f` can return any value.
 *     3. No parts of `f`'s return value should be checked.
 *
 * 2. `fantasy-land/map` must return a value of the same Functor
 *
 * @typeParam T Type `T` is treated as a scalar value and may contain
 * a primitive type, an object or even an array which is treated as a whole.
 *
 *
 * */
export interface IMap<T> extends IUnbox<T> {
  /**
   * The `map()` method creates a new Functor populated with the
   * results of calling a provided function `fn` on the scalar value
   * of type `T` contained in the current functor.
   *
   * @param fn - Must be a function that is called on the element
   * within the Functor and can return any value `R`.
   * No parts of `f`'s return value should be checked.
   *
   * The argument `value` of type `T` is the element 'value' being
   * hold within the Functor, it is treated as a scalar value that
   * may be a primitive type, an object or even an array which is
   * treated as a whole.
   *
   * @typeParam R - The type `R` is the return value of the function `fn`
   * it is analogous to the type `T` and represents a scalar value
   * `R` that may be a primitive type, an object or even an array
   * which is treated as a whole.
   *
   * @returns The `map()` method must return a value of the same
   * Functor that implements it minimally `IMap<R> & IUnbox<R>`
   */
  map<R>(
    /**
     *
     * @param {T} value - The parameter `value` of type `T` is the
     * 'value' of the element being hold within the Functor, it is
     * treated as a scalar value that may be a primitive type, an
     * object or even an array which is treated as a whole.
     *
     * @param {number} index - Optional, should always return -1,
     * this parameter is used for backward compatibility with the
     * array map method.
     *
     * @returns R Type `R` is the return value of the function `fn`
     * it represents a scalar value `R` that may be a primitive type,
     * an object or even an array which is treated as a whole.
     */
    fn: (value: T, index?: number) => R
  ): IMap<R> & IUnbox<R>; //& IStaticBox<IMap<R> & IUnbox<R>>;
}

export interface IStaticBox<BoxedType> {
  of<TVal>(value: TVal): BoxedType;
  from<TVal>(box: IUnbox<TVal>): BoxedType;
}

[1, 2, 3, 4, 5].map(x => x * 2).map(x => x + 2); // [2,4,6,8,10]
