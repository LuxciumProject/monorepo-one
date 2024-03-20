import { BaseBox } from './BaseBox';
import {
  FLExtractable,
  FLMapppable,
  IMap,
  IUnbox,
  IXMap,
  ReplaceInnerType,
  Unbox,
} from './types';

export class MyBox<T>
  extends BaseBox<T>
  implements IMap<T>, IUnbox<T>, IXMap<T>, FLMapppable<T>, FLExtractable<T>
{
  ['fantasy-land/of'] = MyBox.of;
  public static of<TVal>(value: TVal): MyBox<TVal> {
    return new MyBox<TVal>(value);
  }

  public static from<TVal>(value: BaseBox<TVal>): MyBox<TVal> {
    return MyBox.of<TVal>(value.boxedValue);
  }

  public static isBox<TVal>(val: TVal | BaseBox<TVal>): val is MyBox<TVal> {
    return val instanceof BaseBox && val instanceof MyBox;
  }

  protected constructor(boxedValue: T) {
    super(boxedValue);
  }

  ['fantasy-land/map'] = this.map;

  public map<R>(fn: (value: T) => R): MyBox<R> {
    return MyBox.of(fn(this.boxedValue));
  }

  public xmap<Rx>(fn: (value: Unbox<T>) => Rx): MyBox<ReplaceInnerType<T, Rx>> {
    const result = MyBox.of(this._xmap(fn));
    return result;
  }
}
