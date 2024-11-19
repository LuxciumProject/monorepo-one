// XmapBox.ts
import { IUnbox, Unbox } from './types';

// type Boxable = any;

export type RecursiveUnbox<T> =
  T extends XmapBox<infer U> ? RecursiveUnbox<U> : T;
export type RecursiveBox<T, B> =
  B extends XmapBox<infer U> ? XmapBox<RecursiveBox<T, U>> : T;

interface BoxLike<T> {
  boxedValue: T;
  map<R>(fn: (value: T) => R): BoxLike<R>;
}

export class XmapBox<T> implements IUnbox<T>, BoxLike<T> {
  [key: string]: any;

  public static of<TVal>(value: TVal): XmapBox<TVal> {
    return new XmapBox<TVal>(value);
  }

  protected constructor(private _boxedValue: T) {}

  static chainRec<TVal>(
    f: (
      next: (v: TVal) => XmapBox<TVal>,
      done: (v: TVal) => XmapBox<TVal>,
      v: TVal
    ) => XmapBox<TVal>,
    i: TVal
  ): XmapBox<TVal> {
    const step = (v: TVal): XmapBox<TVal> => {
      return f(
        (nextValue: TVal) => step(nextValue),
        (doneValue: TVal) => new XmapBox(doneValue),
        v
      );
    };

    return step(i);
  }

  public static from<TVal>(value: XmapBox<TVal>): XmapBox<TVal> {
    return XmapBox.of<TVal>(value.boxedValue);
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

  static unbox<U>(value: IUnbox<U>): Unbox<U>;
  static unbox<U>(value: U): U;
  static unbox<U>(value: IUnbox<U> | U): Unbox<U> | U {
    return XmapBox.isUnboxable(value) ? XmapBox.unbox(value.unbox()) : value;
  }

  public map<R>(fn: (value: T) => R): XmapBox<R> {
    return XmapBox.of(fn(this.boxedValue));
  }

  ap<B>(plainBox: XmapBox<(value: T) => B>): XmapBox<B> {
    return plainBox.map(fn => fn(this._boxedValue));
  }

  public chain<B>(f: (value: T) => XmapBox<B>): XmapBox<B> {
    return f(this.boxedValue);
  }

  public extract(): T {
    return this.boxedValue;
  }

  public extend<R>(f: (mb: XmapBox<T>) => R): XmapBox<R> {
    return new XmapBox(f(this));
  }

  public unbox(): Unbox<T> {
    const value = this.boxedValue;
    return XmapBox.isUnboxable(value) ? value.unbox() : (value as Unbox<T>);
  }

  public get boxedValue(): T {
    return this._boxedValue;
  }

  public xmap<R>(fn: (value: Unbox<T>) => R): XmapBox<R> {
    const value = this.boxedValue;
    if (XmapBox.isUnboxable(value)) {
      return XmapBox.of(fn(value.unbox()));
    }
    return XmapBox.of(fn(value as Unbox<T>));
  }

  public static isXmapBox<U>(value: any): value is XmapBox<U> {
    return value instanceof XmapBox;
  }
}
