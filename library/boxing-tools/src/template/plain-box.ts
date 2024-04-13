export class PlainBox<T> implements IUnbox<T> {
  public static ['fantasy-land/of'] = PlainBox.of;
  public static of<TVal>(value: TVal): PlainBox<TVal> {
    return new PlainBox<TVal>(value);
  }
  public static ['fantasy-land/chainRec'] = PlainBox.chainRec;
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

  public static from<TVal>(value: PlainBox<TVal>): PlainBox<TVal> {
    return PlainBox.of<TVal>(value.boxedValue);
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
  static unbox<U>(value: IUnbox<any> | U): Unbox<U> {
    return PlainBox.isUnboxable(value) ? PlainBox.unbox(value.unbox()) : value;
  }
  protected constructor(private _boxedValue: T) {}
  public ['fantasy-land/map'] = this.map;
  public map<R>(fn: (value: T) => R): PlainBox<R> {
    return PlainBox.of(fn(this.boxedValue));
  }
  public ['fantasy-land/ap'] = this.ap;
  public ap<B>(this: PlainBox<(b: T) => B>, b: PlainBox<T>): PlainBox<B> {
    return this.chain(f => b.map(f));
  }
  public ['fantasy-land/chain'] = this.chain;
  public chain<B>(f: (value: T) => PlainBox<B>): PlainBox<B> {
    return f(this.boxedValue);
  }
  public ['fantasy-land/extract'] = this.extract;
  public extract(): T {
    return this.boxedValue;
  }
  public ['fantasy-land/extend'] = this.extend;
  extend<R>(f: (mb: PlainBox<T>) => R): PlainBox<R> {
    return new PlainBox(f(this));
  }
  public unbox(): Unbox<T> {
    return PlainBox.unbox(this.boxedValue);
  }
  public get boxedValue(): T {
    return this._boxedValue;
  }
}

export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;

export interface IUnbox<U> {
  unbox(): Unbox<U> | U;
}

export interface IUnbox2<U> {
  unbox: () => Unbox<U> | U;
}

let obj2: IUnbox<number> = {
  unbox: () => 42,
};
obj2.unbox = () => 24; // No error
