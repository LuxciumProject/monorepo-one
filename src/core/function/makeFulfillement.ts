import { FULFILLED } from '../../constants';
import { SettledRight } from '../../types';

/** @internal */
type MakeFulfillementArgs<U> = {
  value: U;
  index: number;
  transformStep: number;
};

/** @internal */

export function makeFulfillement<U>({
  value,
  index,
  transformStep,
}: MakeFulfillementArgs<U>): SettledRight<U> {
  const result: SettledRight<U> = {
    status: FULFILLED,
    value,
    fulfilled: value,
    rejected: null,
    currentRejection: null,
    transformStep,
    index,
  };

  Object.defineProperty(result, 'reason', {
    value: undefined,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'value', {
    value: Object.freeze(value),
    enumerable: true,
    writable: false,
  });

  Object.defineProperty(result, 'fulfilled', {
    value: Object.freeze(value),
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'rejected', {
    value: null,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'currentRejection', {
    value: null,
    enumerable: false,
    writable: false,
  });
  return Object.freeze(result);
}
