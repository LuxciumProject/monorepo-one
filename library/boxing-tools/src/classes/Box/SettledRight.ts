import { ISettledRight } from '../../types';
import { SettleBox } from './SettleBox';
import { IUnbox } from './types/IUnbox';

export class SettledRight<T>
  extends SettleBox<T>
  implements ISettledRight<T>, IUnbox<T>
{
  private _value: T;
  protected constructor(value: T, transformStep = -1, index = -1) {
    super(value, 'fulfilled', null, index, transformStep);
    this._value = value;
    return this;
  }

  override get currentRejection(): null {
    if (super.currentRejection === null) {
      return null;
    }
    throw new Error(
      'NEVER: class SettledRight currentRejection property must be as "null"'
    );
  }
  override get status(): 'fulfilled' {
    if (super.status === 'fulfilled') {
      return super.status;
    }
    throw new Error(
      'NEVER: class SettledRight status property must be as "fulfilled"'
    );
  }

  get value(): T {
    return this._value;
  }

  get fulfilled(): T {
    return this._value;
  }
}
