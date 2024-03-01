import { ProtoBox } from "../Box/template";

export class MyFunctor<T> extends ProtoBox<T> {
  public static of<TVal>(value: TVal): MyFunctor<TVal> {
    return new MyFunctor<TVal>(value);
  }

  protected constructor(value: T) {
    super(value);
    return this;
  }

  ["fantasy-land/map"] = this.map;
  map<R>(f: (value: T) => R): MyFunctor<R> {
    return new MyFunctor(f(this.value));
  }
  public override unbox(): T {
    return super.value;
  }

  get value(): T {
    return super.value;
  }
}
