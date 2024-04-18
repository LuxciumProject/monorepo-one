import { IUnbox, Unbox } from './types';

export class PlainBox<T> implements IUnbox<T> {
  public static of<TVal>(value: TVal): PlainBox<TVal> {
    return new PlainBox<TVal>(value);
  }
  public static ['fantasy-land/of']: typeof PlainBox.of = PlainBox.of;

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

  public map<R>(fn: (value: T) => R): PlainBox<R> {
    return PlainBox.of(fn(this._boxedValue));
  }

  public chain<B>(f: (value: T) => PlainBox<B>): PlainBox<B> {
    return f(this.boxedValue);
  }

  public extract(): T {
    return this.boxedValue;
  }

  public extend<R>(f: (mb: PlainBox<T>) => R): PlainBox<R> {
    return new PlainBox(f(this));
  }

  public unbox(): Unbox<T> {
    return PlainBox.unbox(this._boxedValue);
  }

  public get boxedValue(): T {
    return this._boxedValue;
  }
  /*
Apply
A value that implements the Apply specification must also implement the Functor specification.

v['fantasy-land/ap'](u['fantasy-land/ap'](a['fantasy-land/map'](f => g => x => f(g(x))))) is equivalent to v['fantasy-land/ap'](u)['fantasy-land/ap'](a) (composition)

fantasy-land/ap method
fantasy-land/ap :: Apply f => f a ~> f (a -> b) -> f b
A value which has an Apply must provide a fantasy-land/ap method. The fantasy-land/ap method takes one argument:

a['fantasy-land/ap'](b)
b must be an Apply of a function

If b does not represent a function, the behaviour of fantasy-land/ap is unspecified.
b must be same Apply as a.
a must be an Apply of any value

fantasy-land/ap must apply the function in Apply b to the value in Apply a

No parts of return value of that function should be checked.
The Apply returned by fantasy-land/ap must be the same as a and b
 */

  ap<B>(plainBox: PlainBox<(value: T) => B>): PlainBox<B> {
    return plainBox.map(fn => fn(this._boxedValue));
  }
}
export default PlainBox;
