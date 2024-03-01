import { Functor } from "../../../types";
import { Box } from "..";

export interface SettledLeft<E = any> extends PromiseRejectedResult {
  /**
   * The status of the promise, which is always set to `'rejected'`.
   */
  status: "rejected";

  /**
   * The reason for the rejection.
   */
  reason: E;

  /**
   * The value of the promise, which is always `never` for a rejected promise.
   */
  value: never;

  /**
   * The rejected value.
   */
  rejected: E;

  /**
   * The fulfilled value, which is always `null` for a rejected promise.
   */
  fulfilled: never;

  /**
   * The step in the transformation process.
   */
  transformStep: number;

  /**
   * The current rejection status.
   */
  currentRejection?: false | true;

  /**
   * The index of the promise in the set of settled promises.
   */
  index: number;
}

export class SettledLeftBox
  extends Box<any>
  implements SettledLeft, Functor<any>
{
  private _status: "rejected" = "rejected";
  private _reason: unknown;
  private _fulfilled: never = null as never;
  private _rejected: unknown;
  private _transformStep: number = -1;
  private _currentRejection: false | true | undefined;
  private _index: number = -1;
  static of(reason: unknown): SettledLeftBox {
    return new SettledLeftBox(reason, false);
  }
  protected static fromMap(
    reason: unknown,
    index: number,
    transformStep: number,
    currentRejection: false | true,
  ): SettledLeftBox {
    return new SettledLeftBox(
      reason,
      currentRejection,
      index,
      transformStep + 1,
    );
  }
  protected constructor(
    reason: unknown,
    currentRejection: false | true,
    index = -1,
    transformStep = -1,
  ) {
    super(reason);
    this._index = index;
    this._transformStep = transformStep;
    this._rejected = reason;
    this._currentRejection = currentRejection;
    super["fantasy-land/map"] = this.map as any;
    return this;
  }

  public map<R>(fn: (value: any) => R): SettledLeftBox {
    void fn;
    // const result = fn(super.value);
    const currentRejection = !this._currentRejection;
    return SettledLeftBox.fromMap(
      this._reason,
      this._index,
      this._transformStep,
      currentRejection,
    );
  }

  unbox(): any {
    return super.value;
  }
  get status(): "rejected" {
    return this._status;
  }
  get reason(): unknown {
    return this._reason;
  }
  get value(): never {
    return this._fulfilled;
  }
  get rejected(): unknown {
    return this._rejected;
  }
  get fulfilled(): never {
    return this._fulfilled;
  }
  get transformStep(): number {
    return this._transformStep;
  }
  get currentRejection(): false | true | undefined {
    return this._currentRejection;
  }
  // public map<R>(fn: (value: unknown, index: number) => R): SettledLeftBox {
  //   const result = fn(super.value, this._index);
  //   return SettledLeftBox.fromMap(result, this._transformStep);
  // }

  get index(): number {
    return this._index;
  }
}
