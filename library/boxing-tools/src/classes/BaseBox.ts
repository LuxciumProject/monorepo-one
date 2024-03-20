import {
  FLExtractable,
  IMap,
  IUnbox,
  IXMap,
  ReplaceInnerType,
  Unbox,
} from './types';

export class BaseBox<T>
  implements FLExtractable<T>, IMap<T>, IUnbox<T>, IXMap<T>
{
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

  public static isXMappable<TVal>(val: TVal | IXMap<TVal>): val is IXMap<TVal> {
    return (
      typeof val === 'object' &&
      val !== null &&
      'xmap' in val &&
      typeof val.xmap === 'function'
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

  static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    return BaseBox.isUnboxable(value) ? BaseBox.unbox(value.unbox()) : value;
  }

  protected constructor(private _boxedValue: T) {}

  public map<R>(fn: (value: T) => R): BaseBox<R> {
    return BaseBox.of(fn(this.boxedValue));
  }
  protected _xmap<Rx>(fn: (value: Unbox<T>) => Rx): ReplaceInnerType<T, Rx> {
    const value = this._boxedValue;

    if (BaseBox.isBox(value)) {
      const result = value._xmap(fn);
      return result;
    } else {
      const result = fn(value as Unbox<T>);
      return result as ReplaceInnerType<T, Rx>;
    }
  }
  public xmap<Rx>(
    fn: (value: Unbox<T>) => Rx
  ): BaseBox<ReplaceInnerType<T, Rx>> {
    const result = BaseBox.of(this._xmap(fn));
    return result;
  }

  public ['fantasy-land/extract'] = this.unbox;

  public unbox(): Unbox<T> {
    return BaseBox.unbox(this.boxedValue);
  }

  public get boxedValue(): T {
    return this._boxedValue;
  }
}
