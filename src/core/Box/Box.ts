import type { IUnbox, Unbox } from "./types";

export class Box<U> implements IUnbox<U> {
  static of<UVal>(value: UVal): Box<UVal> {
    return new Box(value);
  }
  [key: symbol]: U;
  static isUnboxable<UVal>(
    this_value: UVal | IUnbox<UVal>,
  ): this_value is IUnbox<UVal> {
    return (
      typeof this_value === "object" &&
      this_value !== null &&
      "unbox" in this_value &&
      typeof this_value.unbox === "function"
    );
  }
  static Value = Symbol.for("value");
  protected constructor(private _uVal: U) {
    Symbol.for("value");
    return this;
  }
  map<R>(fn: (value: U) => R): Box<R> {
    const result = fn(this._uVal);
    return Box.of(result);
  }
  unbox(): Unbox<U> | U {
    if (Box.isUnboxable(this._uVal)) {
      return this._uVal.unbox();
    }
    return this._uVal;
  }
  protected get [Symbol.for("value")](): U {
    return this._uVal;
  }
}
