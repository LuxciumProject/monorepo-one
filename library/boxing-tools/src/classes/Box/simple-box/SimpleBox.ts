export class SimpleBox<T> {
  public static of<TVal>(value: TVal): SimpleBox<TVal> {
    return new SimpleBox<TVal>(value);
  }
  public static from<TVal>(value: SimpleBox<TVal>): SimpleBox<TVal> {
    return SimpleBox.of<TVal>(value.boxedValue);
  }
  public static isBox<TVal>(
    val: TVal | SimpleBox<TVal>
  ): val is SimpleBox<TVal> {
    return val instanceof SimpleBox;
  }

  protected constructor(private _boxedValue: T) {}

  public get boxedValue(): T {
    return this._boxedValue;
  }
}
