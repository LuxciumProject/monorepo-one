import { Functor } from '../decorators';
import { BaseBox } from './BaseBox';
import {
  FLExtractable,
  IMap,
  IUnbox,
  IXMap,
  ReplaceInnerType,
  Unbox,
} from './types';

export class MyBox<T>
  extends BaseBox<T>
  implements IMap<T>, IUnbox<T>, IXMap<T>, FLExtractable<T>
{
  ['fantasy-land/of'] = MyBox.of;

  public static override of<TVal>(value: TVal): MyBox<TVal> {
    return new MyBox<TVal>(value);
  }

  public static override from<TVal>(value: BaseBox<TVal>): MyBox<TVal> {
    return MyBox.of<TVal>(value.boxedValue);
  }

  public static override isBox<TVal>(
    val: TVal | BaseBox<TVal>
  ): val is MyBox<TVal> {
    return val instanceof BaseBox && val instanceof MyBox;
  }

  protected constructor(boxedValue: T) {
    super(boxedValue);
  }

  @Functor()
  public override map<R>(fn: (value: T) => R): MyBox<R> {
    return MyBox.of(fn(this.boxedValue));
  }

  public override xmap<Rx>(
    fn: (value: Unbox<T>) => Rx
  ): MyBox<ReplaceInnerType<T, Rx>> {
    const result = MyBox.of(this._xmap(fn));
    return result;
  }
}
