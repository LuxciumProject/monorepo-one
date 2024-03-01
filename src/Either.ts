export type Either<T1, Err> = Just<T1> | Nothing<Err>;

class Just<T> {
  public static of<TVal>(val: TVal) {
    return new Just(val);
  }

  private _value: T;

  public constructor(val: T) {
    this._value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Just<TMap>(fn(this._value));
  }
}
class Nothing<E> {
  public static of<TVal>(val?: TVal) {
    return new Nothing(val);
  }

  private _value: E | undefined;

  public constructor(val?: E) {
    this._value = val;
  }

  public map<TMap>(fn: (val: E) => TMap) {
    if (this._value !== undefined) {
      return new Nothing<TMap>(fn(this._value));
    } else {
      return new Nothing<TMap>(this._value as any);
    }
  }
}
