import { Box } from "./Box";
import { ISettled } from "./ISettled";

export class SettleBox<U> extends Box<U> implements ISettled {
  protected constructor(
    boxedValue: U,
    _status: "fulfilled",
    _currentRejection: null,
    _index: number,
    _transformStep: number,
  );
  protected constructor(
    boxedValue: U,
    _status: "rejected",
    _currentRejection: false | true,
    _index: number,
    _transformStep: number,
  );
  protected constructor(
    boxedValue: U,
    private _status: "fulfilled" | "rejected",
    private _currentRejection: false | true | null = null,
    private _index = -1,
    private _transformStep = -1,
  ) {
    super(boxedValue);
  }
  get transformStep() {
    return this._transformStep;
  }
  get index() {
    return this._index;
  }
  get currentRejection() {
    return this._currentRejection;
  }
  get status(): "fulfilled" | "rejected" {
    return this._status;
  }
}
