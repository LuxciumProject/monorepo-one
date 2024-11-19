import { IMap } from '../../types';
import { IUnbox, Unbox } from '../types';

export class BaseBox<T> implements IMap<T>, IUnbox<T> {
  public static of<TVal>(value: TVal): BaseBox<TVal> {
    return new BaseBox<TVal>(value);
  }
  public static from<TVal>(value: BaseBox<TVal>): BaseBox<TVal> {
    return BaseBox.of<TVal>(value.boxedValue);
  }
  public static isBox<TVal>(val: TVal | BaseBox<TVal>): val is BaseBox<TVal> {
    return val instanceof BaseBox;
  }
  public static isMappable<TVal>(val: TVal | IMap<TVal>): val is IMap<TVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'map' in val &&
      typeof val.map === 'function'
    );
  }
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
  static unbox<U>(value: IUnbox<U>): Unbox<U>;
  static unbox<U>(value: U): U;
  static unbox<U>(value: IUnbox<U> | U): Unbox<U> | U {
    const _value = value; // Safe temporary variable
    return BaseBox.isUnboxable(_value) ? BaseBox.unbox(_value.unbox()) : _value;
  }
  protected constructor(private _boxedValue: T) {}

  public map<R>(fn: (value: T) => R): BaseBox<R> {
    return BaseBox.of(fn(this.boxedValue));
  }

  public unbox(): T {
    return BaseBox.unbox(this.boxedValue);
  }

  public get boxedValue(): T {
    return this._boxedValue;
  }
}
