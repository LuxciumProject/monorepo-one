import { IMap } from '../../types';
import { IUnbox, Unbox } from '../types';

/**
 * Represents a generic container (box) for a value, providing functional utilities
 * such as mapping and unboxing. Implements {@link IMap} and {@link IUnbox} interfaces.
 *
 * @typeParam T - The type of the value contained in the box.
 * @public
 */
export class BaseBox<T> implements IMap<T>, IUnbox<T> {
  /**
   * Creates a new BaseBox instance containing the provided value.
   *
   * @typeParam TVal - The type of the value to box.
   * @param value - The value to be boxed.
   * @returns A new BaseBox containing the value.
   * @example
   * ```ts
   * const box = BaseBox.of(42);
   * ```
   */
  public static of<TVal>(value: TVal): BaseBox<TVal> {
    return new BaseBox<TVal>(value);
  }

  /**
   * Creates a new BaseBox from another BaseBox, copying its boxed value.
   *
   * @typeParam TVal - The type of the value in the box.
   * @param value - The BaseBox instance to copy from.
   * @returns A new BaseBox containing the same value.
   */
  public static from<TVal>(value: BaseBox<TVal>): BaseBox<TVal> {
    return BaseBox.of<TVal>(value.boxedValue);
  }

  /**
   * Type guard to check if a value is a BaseBox instance.
   *
   * @typeParam TVal - The type to check.
   * @param val - The value to check.
   * @returns True if the value is a BaseBox, false otherwise.
   */
  public static isBox<TVal>(val: TVal | BaseBox<TVal>): val is BaseBox<TVal> {
    return val instanceof BaseBox;
  }

  /**
   * Type guard to check if a value implements the IMap interface.
   *
   * @typeParam TVal - The type to check.
   * @param val - The value to check.
   * @returns True if the value is mappable, false otherwise.
   */
  public static isMappable<TVal>(val: TVal | IMap<TVal>): val is IMap<TVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'map' in val &&
      typeof val.map === 'function'
    );
  }

  /**
   * Type guard to check if a value implements the IUnbox interface.
   *
   * @typeParam TVal - The type to check.
   * @param val - The value to check.
   * @returns True if the value is unboxable, false otherwise.
   */
  public static isUnboxable<TVal>(
    val: TVal | IUnbox<TVal>
  ): val is IUnbox<TVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'unbox' in val &&
      typeof val.unbox === 'function'
    );
  }

  /**
   * Recursively unboxes a value if it implements IUnbox, otherwise returns the value as is.
   *
   * @typeParam U - The type of the value to unbox.
   * @param value - The value or IUnbox instance to unbox.
   * @returns The unboxed value.
   */
  static unbox<U>(value: IUnbox<U>): Unbox<U>;
  static unbox<U>(value: U): U;
  static unbox<U>(value: IUnbox<U> | U): Unbox<U> | U {
    const _value = value; // Safe temporary variable
    return BaseBox.isUnboxable(_value) ? BaseBox.unbox(_value.unbox()) : _value;
  }

  /**
   * Constructs a new BaseBox instance. Protected to encourage use of static factory methods.
   *
   * @param _boxedValue - The value to be boxed.
   * @protected
   */
  protected constructor(private _boxedValue: T) {}

  /**
   * Applies a function to the boxed value and returns a new BaseBox containing the result.
   *
   * @typeParam R - The result type after mapping.
   * @param fn - The function to apply to the boxed value.
   * @returns A new BaseBox containing the mapped value.
   * @example
   * ```ts
   * const box = BaseBox.of(2);
   * const mapped = box.map(x => x * 3); // BaseBox containing 6
   * ```
   */
  public map<R>(fn: (value: T) => R): BaseBox<R> {
    return BaseBox.of(fn(this.boxedValue));
  }

  /**
   * Unboxes the value, recursively unboxing if the value is itself unboxable.
   *
   * @returns The unboxed value.
   * @example
   * ```ts
   * const box = BaseBox.of(42);
   * const value = box.unbox(); // 42
   * ```
   */
  public unbox(): T {
    return BaseBox.unbox(this.boxedValue);
  }

  /**
   * Gets the boxed value.
   *
   * @returns The value contained in the box.
   */
  public get boxedValue(): T {
    return this._boxedValue;
  }
}
