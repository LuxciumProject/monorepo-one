import { ProtoBox } from "./ProtoBox";
import { Apply, Chain, Extend, Functor, Unboxable } from "../types";
export class Box<T>
  extends ProtoBox<T>
  implements Unboxable<T>, Functor<T>, Apply<T>, Chain<T>, Extend<T>
{
  static ["fantasy-land/of"] = Box.of;

  public ["fantasy-land/map"] = this.map;
  public ["fantasy-land/ap"] = this.ap;
  public ["fantasy-land/chain"] = this.chain;
  public ["fantasy-land/extend"] = this.extend;
  public ["fantasy-land/extract"] = this.unbox;

  public static of<TVal>(value: TVal): Box<TVal> {
    return new Box<TVal>(value);
  }

  protected constructor(value: T) {
    super(value);
  }
  public map<R>(fn: (value: T) => R): Box<R> {
    const result = fn(super.value);
    return Box.of(result);
  }

  public chain<R>(fn: (value: T) => Box<R>): Box<R> {
    return fn(super.value);
  }

  public ap<R>(boxFn: Box<(value: T) => R>): Box<R> {
    return boxFn.chain((fn) => this.map(fn));
  }

  public extend<R>(f: (w: Box<T>) => R): Box<R> {
    const value = f(this);
    return Box.of(value);
  }

  public unbox(): T {
    return super.value;
  }

  get value(): T {
    return super.value;
  }
}

export default Box;
