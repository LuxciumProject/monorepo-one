import { MyExtend } from "./MyExtend";

export class MyComonad<T> extends MyExtend<T> {
  public static of<TVal>(value: TVal): MyComonad<TVal> {
    return new MyComonad<TVal>(value);
  }
  protected constructor(value: T) {
    super(value);
    return this;
  }

  ["fantasy-land/map"] = this.map;
  public override map<R>(f: (value: T) => R): MyComonad<R> {
    return new MyComonad(f(this.value));
  }
  public ["fantasy-land/extend"] = this.extend;
  public override extend<U>(f: (w: MyComonad<T>) => U): MyComonad<U> {
    const value = f(this);
    return MyComonad.of(value);
  }
  public ["fantasy-land/extract"] = this.unbox;

  public override unbox(): T {
    return super.value;
  }

  public override get value(): T {
    return super.value;
  }
}
