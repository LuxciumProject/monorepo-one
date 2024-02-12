import { Unboxable } from "../types";

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
