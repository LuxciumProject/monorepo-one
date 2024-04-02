/**
 * A simple box type that wraps a value of type `T`.
 *
 * @remarks
 * This class implements the Fantasy Land Specification, providing a set of
 * standard methods for working with "boxed" values.
 *
 * @typeParam T - The type of the value stored in the box.
 * @public
 */
export class PlainBox<T> implements IUnbox<T> {
  /**
   * A static method that creates a new `PlainBox` instance with the given value.
   *
   * @param value - The value to be wrapped in the box.
   * @returns A new `PlainBox` instance containing the provided value.
   *
   * @category Constructors
   * @fantasy-land/of
   */
  public static of<TVal>(value: TVal): PlainBox<TVal> {
    return new PlainBox<TVal>(value);
  }

  /**
   * A static method that implements the Fantasy Land "chain recursion" pattern.
   *
   * @param f - A function that takes the current value, a "next" callback, and a "done" callback,
   *           and returns a new `PlainBox` instance.
   * @param i - The initial value to pass to the `f` function.
   * @returns A new `PlainBox` instance containing the final result of the chain recursion.
   *
   * @category Constructors
   * @fantasy-land/chainRec
   */
  public static chainRec<TVal>(
    f: (
      next: (v: TVal) => PlainBox<TVal>,
      done: (v: TVal) => PlainBox<TVal>,
      v: TVal
    ) => PlainBox<TVal>,
    i: TVal
  ): PlainBox<TVal> {
    const step = (v: TVal): PlainBox<TVal> => {
      return f(
        (nextValue: TVal) => step(nextValue),
        (doneValue: TVal) => new PlainBox(doneValue),
        v
      );
    };
    return step(i);
  }

  /**
   * A static method that creates a new `PlainBox` instance from an existing one.
   *
   * @param value - The `PlainBox` instance to be copied.
   * @returns A new `PlainBox` instance containing the same value as the input.
   *
   * @category Constructors
   * @fantasy-land/from
   */
  public static from<TVal>(value: PlainBox<TVal>): PlainBox<TVal> {
    return PlainBox.of<TVal>(value.boxedValue);
  }

  /**
   * A static method that checks if a value is an instance of `IUnbox`.
   *
   * @param val - The value to be checked.
   * @returns `true` if the value is an instance of `IUnbox`, `false` otherwise.
   *
   * @category Utilities
   */
  public static isUnboxable<TVal>(
    val: TVal | IUnbox<TVal>
  ): val is IUnbox<TVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'unbox' in val &&
      typeof val.unbox === 'function' &&
      val.unbox.length === 0
    );
  }

  /**
   * A static method that unboxes a value, if it is an instance of `IUnbox`.
   *
   * @param value - The value to be unboxed.
   * @returns The unboxed value, or the original value if it is not an instance of `IUnbox`.
   *
   * @category Utilities
   */
  public static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    return PlainBox.isUnboxable(value) ? PlainBox.unbox(value.unbox()) : value;
  }

  protected constructor(private _boxedValue: T) {}

  /**
   * Applies the provided function to the boxed value, returning a new `PlainBox` instance
   * with the transformed value.
   *
   * @param fn - The function to apply to the boxed value.
   * @returns A new `PlainBox` instance containing the transformed value.
   *
   * @fantasy-land/map
   */
  public map<R>(fn: (value: T) => R): PlainBox<R> {
    return PlainBox.of(fn(this.boxedValue));
  }

  /**
   * Applies the function contained in the current `PlainBox` instance to the value
   * contained in the provided `PlainBox` instance, returning a new `PlainBox` instance
   * with the result.
   *
   * @param b - The `PlainBox` instance containing the value to be applied to.
   * @returns A new `PlainBox` instance containing the result of the application.
   *
   * @fantasy-land/ap
   */
  public ap<B>(this: PlainBox<(b: T) => B>, b: PlainBox<T>): PlainBox<B> {
    return this.chain(f => b.map(f));
  }

  /**
   * Applies the provided function to the boxed value, returning the result as a new
   * `PlainBox` instance.
   *
   * @param f - The function to apply to the boxed value.
   * @returns A new `PlainBox` instance containing the result of the function application.
   *
   * @fantasy-land/chain
   */
  public chain<B>(f: (value: T) => PlainBox<B>): PlainBox<B> {
    return f(this.boxedValue);
  }

  /**
   * Extracts the boxed value from the `PlainBox` instance.
   *
   * @returns The boxed value.
   *
   * @fantasy-land/extract
   */
  public extract(): T {
    return this.boxedValue;
  }

  /**
   * Applies the provided function to the current `PlainBox` instance, returning a new
   * `PlainBox` instance with the result.
   *
   * @param f - The function to apply to the current `PlainBox` instance.
   * @returns A new `PlainBox` instance containing the result of the function application.
   *
   * @fantasy-land/extend
   */
  public extend<R>(f: (mb: PlainBox<T>) => R): PlainBox<R> {
    return new PlainBox(f(this));
  }

  /**
   * Unboxes the value contained in the `PlainBox` instance.
   *
   * @returns The unboxed value.
   */
  public unbox(): Unbox<T> {
    return PlainBox.unbox(this.boxedValue);
  }

  /**
   * The value contained in the `PlainBox` instance.
   */
  public get boxedValue(): T {
    return this._boxedValue;
  }
}

/**
 * A type alias that represents the unboxed value of a given type `U`.
 *
 * If `U` is an instance of `IUnbox`, the unboxed value is recursively extracted.
 * Otherwise, `U` is returned as is.
 *
 * @typeParam U - The type to be unboxed.
 */
export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;

/**
 * An interface that defines the unbox operation for a type `U`.
 *
 * @typeParam U - The type of the value to be unboxed.
 * @public
 */
export interface IUnbox<U> {
  /**
   * Unboxes the value and returns it.
   *
   * @returns The unboxed value.
   */
  unbox(): Unbox<U> | U;
}

/*

```

The provided code defines a `PlainBox` class that implements the Fantasy Land Specification, providing a set of standard methods for working with "boxed" values. The class also includes several static methods for constructing and manipulating `PlainBox` instances.

The documentation for the `PlainBox` class and its members is comprehensive and follows the TSDoc standard. It includes:

1. A summary of the class's purpose and functionality in the class-level comment.
2. Detailed descriptions of the static methods, including their parameters, return values, and their relation to the Fantasy Land Specification.
3. Detailed descriptions of the instance methods, including their parameters, return values, and their relation to the Fantasy Land Specification.
4. A type alias `Unbox` that represents the unboxed value of a given type, handling recursive unboxing.
5. An interface `IUnbox` that defines the unbox operation for a type.

The documentation is well-structured, using appropriate TSDoc tags such as `@remarks`, `@typeParam`, `@param`, `@returns`, `@category`, and `@fantasy-land` to provide clear and concise information about the class and its members.

Overall, the documentation provided for the `PlainBox` class is comprehensive, follows the TSDoc standard, and should be very helpful for users of the class.
 */
