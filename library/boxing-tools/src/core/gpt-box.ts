import { Functor } from '../decorators';

export interface IUnbox<U> {
  unbox(): Unbox<U> | U;
}
export interface IXMap<U = any> {
  // The 'any' is a temporary placeholder for the return type
  // it must be replaced with the correct return type later.
  xmap(val: U): any;
}

export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;

class Box<T> implements IUnbox<T> {
  // Fields
  private _boxedValue: T;

  // Static Methods
  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box<TVal>(value);
  }

  static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    const isUnboxable = Box.isUnboxable(value);
    const result = isUnboxable ? value.unbox() : value;
    return result;
  }

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

  public static isXmapable(val: any): val is IXMap {
    return (
      typeof val === 'object' &&
      val !== null &&
      'xmap' in val &&
      typeof val.xmap === 'function' &&
      val.xmap.length === 1
    );
  }

  // Constructor
  protected constructor(value: T) {
    this._boxedValue = value;
  }

  // Non-static Methods
  @Functor()
  public map<R>(fn: (value: T) => R): Box<R> {
    return Box.of(fn(this.boxedValue));
  }
  // The 'Box<any>' is a temporary placeholder for the return type.
  public xmap<R>(fn: (value: Unbox<T>) => R): Box<any> {
    return Box.isXmapable(this.boxedValue)
      ? Box.of(this.boxedValue.xmap(fn))
      : Box.of(fn(this.boxedValue as Unbox<T>));
  }

  public unbox(): Unbox<T> | T {
    return Box.unbox(this.boxedValue);
  }

  // Getters
  public get boxedValue(): T {
    return this._boxedValue;
  }
}

export default Box;
