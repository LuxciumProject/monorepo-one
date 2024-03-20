import { BaseBox } from './BaseBox';
import { IMap, IUnbox, IXMap, ReplaceInnerType, Unbox } from './types';

export class MyBox<T>
  extends BaseBox<T>
  implements IMap<T>, IUnbox<T>, IXMap<T>
{
  public static of<TVal>(value: TVal): MyBox<TVal> {
    return new MyBox<TVal>(value);
  }

  public static isBox<TVal>(val: TVal | BaseBox<TVal>): val is MyBox<TVal> {
    return val instanceof BaseBox && val instanceof MyBox;
  }

  public static from<TVal>(value: BaseBox<TVal>): MyBox<TVal> {
    return MyBox.of<TVal>(value.boxedValue);
  }
  protected constructor(boxedValue: T) {
    super(boxedValue);
  }
  public map<R>(fn: (value: T) => R): MyBox<R> {
    return MyBox.of(fn(this.boxedValue));
  }
  public xmap<Rx>(fn: (value: Unbox<T>) => Rx): MyBox<ReplaceInnerType<T, Rx>> {
    const result = MyBox.of(this._xmap(fn));
    return result;
  }
}

export interface FunctorFL<T> extends IMap<T> {
  ['fantasy-land/map']<R>(fun: (value: T) => R): IMap<R>;
}
