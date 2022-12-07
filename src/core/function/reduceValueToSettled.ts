import {
  isPromiseRejectedResult,
  isSettledLeft,
} from '../../helpers/assertions';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';
import { preTransform } from './preTransform';

// /** @internal */
//   function postTransform<T>(
//   itemValue: T,
//   index: number,
//   transformStep: number
// ) {
//   return makeFulfillement<T>({
//     value: itemValue,
//     index,
//     transformStep,
//   });
// }
/** @internal */

export function reduceValueToSettled<T>(
  item: T | (Settled<T> | PromiseSettledResult<T>),
  index: number
): SettledLeft | SettledRight<T> {
  if (isPromiseRejectedResult(item)) {
    if (isSettledLeft(item)) {
      return item;
    }
    const { reason } = item;
    return makeRejection({ reason, index });
  }
  const [value, transformStep] = preTransform<T>(item);
  return makeFulfillement<T>({ value, index, transformStep });
}
