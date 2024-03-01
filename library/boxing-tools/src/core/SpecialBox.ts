export abstract class ProtoBox<T> implements Unboxable<T> {
  private readonly _value: T;

  protected constructor(value: T) {
    this._value = value;
  }
  public unbox(): T {
    return this._value;
  }
  get value(): T {
    return this._value;
  }
}
interface Unboxable<T> {
  unbox: () => T;
}

export type UnboxableFn<T, R> = Unboxable<(input: T) => R>;
export class SpecialBox<T, R>
  extends ProtoBox<(input: T) => R>
  implements Unboxable<(input: T) => R>
{
  private readonly _fn: (input: T) => R;

  static of<T, R>(fn: (input: T) => R): SpecialBox<T, R> {
    return new SpecialBox(fn);
  }

  static from<TVal, RVal>(
    box: UnboxableFn<TVal, RVal>,
  ): SpecialBox<TVal, RVal> {
    return SpecialBox.of(box.unbox());
  }

  protected constructor(fn: (input: T) => R) {
    super(fn);
    this._fn = fn;
  }

  public pipe<U>(nextFn: (input: R) => U): SpecialBox<T, U> {
    const composedFn = (input: T) => nextFn(this._fn(input));
    return SpecialBox.of(composedFn);
  }

  public compose<U>(prevFn: (input: U) => T): SpecialBox<U, R> {
    const composedFn = (input: U) => this._fn(prevFn(input));
    return SpecialBox.of(composedFn);
  }

  public override unbox(): (input: T) => R {
    return this._fn;
  }
  /** @deprecated */
  public get fn(): (input: T) => R {
    return this._fn;
  }

  public override get value(): (input: T) => R {
    return this._fn;
  }
}
