import { REJECTED } from '../../constants';
import { SettledLeft } from '../../types';

/** @internal */
type MakeRejectionArgs = {
  reason: any;
  index: number;
  transformStep: number;
  currentRejection?: true | false | undefined;
};
/** @internal */

export function makeRejection({
  reason,
  index,
  transformStep,
  currentRejection = undefined,
}: MakeRejectionArgs): SettledLeft {
  const result: SettledLeft = {
    status: REJECTED,
    reason,
    rejected: reason,
    fulfilled: null,
    currentRejection: currentRejection,
    transformStep,
    index,
  };

  Object.defineProperty(result, 'reason', {
    value: Object.freeze(reason),
    enumerable: true,
    writable: false,
  });

  Object.defineProperty(result, 'value', {
    value: undefined,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'rejected', {
    value: reason,
    enumerable: false,
    writable: false,
  });

  Object.defineProperty(result, 'fulfilled', {
    value: null,
    enumerable: false,
    writable: false,
  });

  // Object.seal()
  return Object.freeze(result);
}
