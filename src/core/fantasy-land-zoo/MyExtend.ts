import { MyFunctor } from "./MyFunctor";

export class MyExtend<T> extends MyFunctor<T> {
  public static of<TVal>(value: TVal): MyExtend<TVal> {
    return new MyExtend<TVal>(value);
  }
  protected constructor(value: T) {
    super(value);
    return this;
  }

  ["fantasy-land/map"] = this.map;
  public override map<R>(f: (value: T) => R): MyExtend<R> {
    return new MyExtend(f(this.value));
  }

  ["fantasy-land/extend"] = this.extend;
  public extend<U>(f: (w: MyExtend<T>) => U): MyExtend<U> {
    const value = f(this);
    return MyExtend.of(value);
  }

  public override unbox(): T {
    return super.value;
  }

  public override get value(): T {
    return super.value;
  }
}
