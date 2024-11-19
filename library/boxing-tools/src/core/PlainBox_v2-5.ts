import { IUnbox, Unbox } from './types';

/**
 * Represents a simple box that can hold a value of type `T`.
 *
 * `PlainBox` implements the Fantasy Land Specification, which is a set of
 * protocols for functional programming in JavaScript. It provides a consistent
 * interface for working with various data types that support common algebraic
 * structures, such as monads, functors, and applicatives.
 *
 * @template T - The type of the value stored in the box.
 * @public
 */
export class PlainBox<T> implements IUnbox<T> {
  /**
   * Creates a new `PlainBox` instance with the given value.
   *
   * @param value - The value to be stored in the box.
   * @returns A new `PlainBox` instance containing the provided value.
   * @example
   * const box = PlainBox.of(42);
   * console.log(box.boxedValue); // Output: 42
   *
   * @public
   */
  public static of<TVal>(value: TVal): PlainBox<TVal> {
    return new PlainBox<TVal>(value);
  }
  public static ['fantasy-land/of']: typeof PlainBox.of = PlainBox.of;

  /**
   * Implements the Fantasy Land "chainRec" operation, which allows for
   * efficient implementation of recursive computations.
   *
   * @template TVal - The type of the initial value.
   * @param f - A function that takes the current value, a "next" function, and a "done" function, and returns a new `PlainBox`.
   * @param i - The initial value to pass to the `f` function.
   * @returns A new `PlainBox` containing the result of the recursive computation.
   * @public
   * @example
   * const result = PlainBox.chainRec(
   *   (next, done, value) => (value <= 0 ? done(value) : next(value - 1)),
   *   10
   * );
   * console.log(result.boxedValue); // Output: 0
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
  public static ['fantasy-land/chainRec']: typeof PlainBox.chainRec =
    PlainBox.chainRec;

  /**
   * Creates a new `PlainBox` instance with the same value as the provided `PlainBox`.
   *
   * @template TVal - The type of the value stored in the `PlainBox`.
   * @param value - The `PlainBox` instance to copy.
   * @returns A new `PlainBox` instance containing the same value as the provided `PlainBox`.
   * @public
   * @example
   * const originalBox = PlainBox.of(42);
   * const copiedBox = PlainBox.from(originalBox);
   * console.log(copiedBox.boxedValue); // Output: 42
   */
  public static from<TVal>(value: PlainBox<TVal>): PlainBox<TVal> {
    return PlainBox.of<TVal>(value.boxedValue);
  }

  /**
   * Checks if the provided value is an instance of `IUnbox`.
   *
   * @template TVal - The type of the value to check.
   * @param val - The value to check.
   * @returns `true` if the value is an instance of `IUnbox`, `false` otherwise.
   * @public
   * @example
   * const box = PlainBox.of(42);
   * console.log(PlainBox.isUnboxable(box)); // Output: true
   * console.log(PlainBox.isUnboxable(42)); // Output: false
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
   * Extracts the value from an `IUnbox` instance, or returns the value as is if it's not an `IUnbox`.
   *
   * @template U - The type of the value to unbox.
   * @param value - The value to unbox.
   * @returns The unboxed value.
   * @public
   * @example
   * const box = PlainBox.of(42);
   * const unboxedValue = PlainBox.unbox(box);
   * console.log(unboxedValue); // Output: 42
   */
  static unbox<U>(value: IUnbox<U>): Unbox<U>;
  static unbox<U>(value: U): U;
  static unbox<U>(value: IUnbox<U> | U): Unbox<U> | U {
    return PlainBox.isUnboxable(value) ? PlainBox.unbox(value.unbox()) : value;
  }

  /**
   * Constructs a new `PlainBox` instance with the provided value.
   *
   * @param _boxedValue - The value to be stored in the box.
   * @internal
   */
  protected constructor(private _boxedValue: T) {}

  /**
   * Applies the provided function `fn` to the value stored in the `PlainBox` and
   * returns a new `PlainBox` instance with the transformed value.
   *
   * This method implements the Fantasy Land "map" operation.
   *
   * @template R - The type of the transformed value.
   * @param fn - The function to apply to the boxed value.
   * @returns A new `PlainBox` instance containing the transformed value.
   * @public
   * @example
   * const box = PlainBox.of(42);
   * const doubledBox = box.map(x => x * 2);
   * console.log(doubledBox.boxedValue); // Output: 84
   */
  public map<R>(fn: (value: T) => R): PlainBox<R> {
    return PlainBox.of(fn(this._boxedValue));
  }
  public ['fantasy-land/map']: typeof this.map = this.map;

  /**
   * Applies the provided function `f` to the value stored in the `PlainBox` and
   * returns the result as a new `PlainBox` instance.
   *
   * This method implements the Fantasy Land "chain" operation.
   *
   * @template B - The type of the value returned by the provided function.
   * @param f - The function to apply to the boxed value.
   * @returns A new `PlainBox` instance containing the result of applying the function.
   * @example
   * const box = PlainBox.of(42);
   * const result = box.chain(x => PlainBox.of(x * 2));
   * console.log(result.boxedValue); // Output: 84
   *
   * @public
   */
  public chain<B>(f: (value: T) => PlainBox<B>): PlainBox<B> {
    return f(this.boxedValue);
  }
  public ['fantasy-land/chain']: typeof this.chain = this.chain;

  /**
   * Extracts the value stored in the `PlainBox` instance.
   *
   * This method implements the Fantasy Land "extract" operation.
   *
   * @returns The value stored in the `PlainBox` instance.
   * @example
   * const box = PlainBox.of(42);
   * const value = box.extract();
   * console.log(value); // Output: 42
   *
   * @public
   */
  public extract(): T {
    return this.boxedValue;
  }
  public ['fantasy-land/extract']: typeof this.extract = this.extract;
  /**
   * Applies the provided function `f` to the current `PlainBox` instance and
   * returns a new `PlainBox` instance with the result.
   *
   * This method implements the Fantasy Land "extend" operation.
   *
   * @template R - The type of the value returned by the provided function.
   * @param f - The function to apply to the current `PlainBox` instance.
   * @returns A new `PlainBox` instance containing the result of applying the function.
   * @public
   * @example
   * const box = PlainBox.of(42);
   * const result = box.extend(mb => mb.boxedValue * 2);
   * console.log(result.boxedValue); // Output: 84
   */
  public extend<R>(f: (mb: PlainBox<T>) => R): PlainBox<R> {
    return new PlainBox(f(this));
  }
  public ['fantasy-land/extend']: typeof this.extend = this.extend;

  /**
   * Extracts the value stored in the `PlainBox` instance, unboxing it if necessary.
   *
   * @returns The unboxed value stored in the `PlainBox` instance.
   * @public
   * @example
   * const box = PlainBox.of(PlainBox.of(42));
   * const value = box.unbox();
   * console.log(value); // Output: 42
   */
  public unbox(): Unbox<T> {
    const value = this._boxedValue;
    return PlainBox.isUnboxable(value) ? value.unbox() : (value as Unbox<T>);
  }

  /**
   * Retrieves the value stored in the `PlainBox` instance.
   *
   * @returns The value stored in the `PlainBox` instance.
   * @public
   * @example
   * const box = PlainBox.of(42);
   * console.log(box.boxedValue); // Output: 42
   */
  public get boxedValue(): T {
    return this._boxedValue;
  }

  /**
   * Applies the function stored in the current `PlainBox` to the value stored in the provided `PlainBox`.
   *
   * This method implements the Fantasy Land "ap" operation.
   *
   * @template B - The type of the value stored in the provided `PlainBox`.
   * @param b - The `PlainBox` instance containing the value to apply the function to.
   * @returns A new `PlainBox` instance containing the result of applying the function to the value.
   * @public
   * @example
   * const doubleBox = PlainBox.of((x: number) => x * 2);
   * const box = PlainBox.of(42);
   * const result = doubleBox.ap(box);
   * console.log(result.boxedValue); // Output: 84
   */

  public ap<B>(this: PlainBox<(b: T) => B>, b: PlainBox<T>): PlainBox<B> {
    return this.chain(f => b.map(f));
  }
  public ['fantasy-land/ap']: typeof this.ap = this.ap;
}
export default PlainBox;
