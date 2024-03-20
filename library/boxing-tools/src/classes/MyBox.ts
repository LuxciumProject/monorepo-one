import { IMap, IUnbox, IXMap, ReplaceInnerType, Unbox } from './types';

export class MyBox<T> implements IMap<T>, IUnbox<T>, IXMap<T> {
  public static of<TVal>(value: TVal): MyBox<TVal> {
    return new MyBox<TVal>(value);
  }

  public static isBox<TVal>(val: TVal | MyBox<TVal>): val is MyBox<TVal> {
    return val instanceof MyBox;
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

  protected static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    return MyBox.isUnboxable(value) ? MyBox.unbox(value.unbox()) : value;
  }

  protected constructor(private _boxedValue: T) {}

  public map<R>(fn: (value: T) => R): MyBox<R> {
    return MyBox.of(fn(this.boxedValue));
  }
  private _xmap<Rx>(fn: (value: Unbox<T>) => Rx): ReplaceInnerType<T, Rx> {
    const value = this._boxedValue;

    if (MyBox.isBox(value)) {
      const result = value._xmap(fn);
      return result;
    } else {
      const result = fn(value as Unbox<T>);
      return result as ReplaceInnerType<T, Rx>;
    }
  }
  public xmap<Rx>(fn: (value: Unbox<T>) => Rx): MyBox<ReplaceInnerType<T, Rx>> {
    const result = MyBox.of(this._xmap(fn));
    return result;
  }
  public unbox(): Unbox<T> {
    return MyBox.unbox(this.boxedValue);
  }

  public get boxedValue(): T {
    return this._boxedValue;
  }
}
