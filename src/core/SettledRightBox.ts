import { Functor } from '../types';
import { Box } from './Box';
export interface SettledRight<T> extends PromiseFulfilledResult<T> {
  /**
   * The status of the settled value.
   */
  status: 'fulfilled';

  /**
   * The fulfilled value.
   */
  value: T;

  /**
   * The reason for rejection. Always `never` for a fulfilled value.
   */
  reason: never;

  /**
   * The fulfilled value. Same as `value`.
   */
  fulfilled: T;

  /**
   * The rejected value. Always `never` for a fulfilled value.
   */
  rejected: never;

  /**
   * The step number of the transformation process.
   */
  transformStep: number;

  /**
   * The current rejection value. Always `null` for a fulfilled value.
   */
  currentRejection: null;

  /**
   * The index of the settled value in the Promise.allSettled result.
   */
  index: number;
}

export class SettledRightBox<T> extends Box<T> implements SettledRight<T>, Functor<T> {
  private _status: 'fulfilled' = 'fulfilled';
  private _reason: never = null as never;
  private _fulfilled: T;
  private _rejected: never = null as never;
  private _transformStep: number = -1;
  private _currentRejection: null = null;
  private _index: number = -1;
  static of<TVal>(value: TVal): SettledRightBox<TVal> {
    return new SettledRightBox(value);
  }
  protected static fromMap<TVal>(value: TVal, index: number, transformStep: number, currentRejection: null): SettledRightBox<TVal> {
    return new SettledRightBox(value, index, transformStep + 1, currentRejection);
  }

  protected constructor(value: T, index = -1, transformStep = -1, currentRejection: null = null) {
    super(value);
    this._fulfilled = value;
    this._index = index;
    this._transformStep = transformStep;
    this._currentRejection = currentRejection;
    super["fantasy-land/map"] = this.map;
    return this;
  }
  public map<R>(fn: (value: T, index: number) => R): SettledRightBox<R> {
    const result = fn(super.value, this._index);
    return SettledRightBox.fromMap(result, this._index, this._transformStep, null);
  }

  unbox(): T {
    return super.value;
  }
  get status(): 'fulfilled' {
    return this._status;
  }
  get reason(): never {
    return this._reason;
  }
  get fulfilled(): T {
    return this._fulfilled;
  }
  get rejected(): never {
    return this._rejected;
  }
  get transformStep(): number {
    return this._transformStep;
  }
  get currentRejection(): null {
    return this._currentRejection;
  }
  get index(): number {
    return this._index;
  }
  get value(): T {
    return super.value;
  }
}
