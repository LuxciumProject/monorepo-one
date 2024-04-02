/**
 * Represents a plain box (container) that implements the IUnbox interface.
 *
 * @remarks
 * The PlainBox class is a generic container that adheres to the Fantasy Land
 * algebraic data type specifications. It provides methods for creating, mapping,
 * applying functions, chaining, and extracting values from the box.
 *
 * @typeParam T - The type of the value contained within the box.
 */
export class PlainBox<T> implements IUnbox<T> {
  /**
   * Creates a new PlainBox instance with the given value.
   *
   * @param value - The value to be boxed.
   * @returns A new PlainBox instance containing the provided value.
   */
  public static of<TVal>(value: TVal): PlainBox<TVal> {
    return new PlainBox<TVal>(value);
  }

  /**
   * Performs the `chainRec` operation on the PlainBox instance.
   *
   * @remarks
   * The `chainRec` operation allows for recursive chaining of computations.
   * It takes a function `f` that returns either a new boxed value to continue
   * the chain or a final boxed value to terminate the chain.
   *
   * @typeParam TVal - The type of the value contained within the box.
   * @param f - The function to be applied recursively.
   * @param i - The initial value to start the recursion.
   * @returns A new PlainBox instance containing the final result of the recursion.
   */
  static chainRec<TVal>(
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
   * Creates a new PlainBox instance from an existing PlainBox.
   *
   * @typeParam TVal - The type of the value contained within the box.
   * @param value - The PlainBox instance to be converted.
   * @returns A new PlainBox instance containing the value from the provided PlainBox.
   */
  public static from<TVal>(value: PlainBox<TVal>): PlainBox<TVal> {
    return PlainBox.of<TVal>(value.boxedValue);
  }

  /**
   * Checks if a given value is an instance of IUnbox.
   *
   * @typeParam TVal - The type of the value contained within the box.
   * @param val - The value to be checked.
   * @returns True if the value is an instance of IUnbox, false otherwise.
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
   * Unboxes the given value if it implements the IUnbox interface.
   *
   * @typeParam U - The type of the value to be unboxed.
   * @param value - The value to be unboxed.
   * @returns The unboxed value if the input value implements IUnbox, otherwise the original value.
   */
  static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    return PlainBox.isUnboxable(value) ? PlainBox.unbox(value.unbox()) : value;
  }

  /**
   * The value contained within the box.
   */
  private _boxedValue: T;

  /**
   * Creates a new PlainBox instance with the specified value.
   *
   * @param _boxedValue - The value to be contained within the box.
   */
  protected constructor(_boxedValue: T) {
    this._boxedValue = _boxedValue;
    return this;
  }

  /**
   * Maps the contained value using the provided function.
   *
   * @typeParam R - The type of the result value after applying the mapping function.
   * @param fn - The mapping function to be applied to the contained value.
   * @returns A new PlainBox instance containing the result of applying the mapping function.
   */
  public map<R>(fn: (value: T) => R): PlainBox<R> {
    return PlainBox.of(fn(this.boxedValue));
  }

  /**
   * Applies the contained function to the provided PlainBox instance.
   *
   * @typeParam B - The type of the result value after applying the function.
   * @param b - The PlainBox instance containing the value to be applied to the contained function.
   * @returns A new PlainBox instance containing the result of applying the function.
   */
  public ap<B>(this: PlainBox<(b: T) => B>, b: PlainBox<T>): PlainBox<B> {
    return this.chain(f => b.map(f));
  }

  /**
   * Chains the contained value with the provided function.
   *
   * @typeParam B - The type of the result value after chaining with the provided function.
   * @param f - The function to be applied to the contained value, which returns a new PlainBox instance.
   * @returns A new PlainBox instance containing the result of chaining with the provided function.
   */
  public chain<B>(f: (value: T) => PlainBox<B>): PlainBox<B> {
    return f(this.boxedValue);
  }

  /**
   * Extracts the contained value from the box.
   *
   * @returns The value contained within the box.
   */
  public extract(): T {
    return this.boxedValue;
  }

  /**
   * Extends the contained value with the provided function.
   *
   * @typeParam R - The type of the result value after extending with the provided function.
   * @param f - The function to be applied to the current PlainBox instance, which returns a new value.
   * @returns A new PlainBox instance containing the result of extending with the provided function.
   */
  extend<R>(f: (mb: PlainBox<T>) => R): PlainBox<R> {
    return new PlainBox(f(this));
  }

  /**
   * Unboxes the contained value if it implements the IUnbox interface.
   *
   * @returns The unboxed value if the contained value implements IUnbox, otherwise the original value.
   */
  public unbox(): Unbox<T> {
    return PlainBox.unbox(this.boxedValue);
  }

  /**
   * Returns the value contained within the box.
   *
   * @returns The value contained within the box.
   */
  public get boxedValue(): T {
    return this._boxedValue;
  }
}

/**
 * Represents the unboxed type of a value.
 *
 * @typeParam U - The type of the value to be unboxed.
 */
export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;

/**
 * Defines the interface for unboxable values.
 *
 * @typeParam U - The type of the value to be unboxed.
 */
export interface IUnbox<U> {
  /**
   * Unboxes the value.
   *
   * @returns The unboxed value.
   */
  unbox(): Unbox<U> | U;
}
