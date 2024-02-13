import { MyFunctor } from "./MyFunctor";

export abstract class MyBaseAlt<T> extends MyFunctor<T> {
  protected constructor(value: T) {
    super(value);
    return this;
  }

  public abstract override map<R>(f: (value: T) => R): MyBaseAlt<R>;

  public abstract alt(other: MyBaseAlt<T>): MyBaseAlt<T>;

  public override unbox(): T {
    return super.value;
  }

  public override get value(): T {
    return super.value;
  }
}
