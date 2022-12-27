import {
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseSettledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import { Base, Settled, SettledLeft, SettledRight } from '../../types';
import { Deferred } from '../../types/MainTypes';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';

/** @internal */

// INFO: Below are the PromiseLike types -----------------------------
/**
 * **Promise\<Combo\>**: SettledLeft **or** SettledRight<T> as Settled<T>
 * @param item T | Settled<T> | PromiseSettledResult<T>
 * @param index number
 */
export function makeSettler<T>(
  item: PromiseLike<T | Settled<T> | PromiseSettledResult<T>>,
  index?: number
): Promise<Settled<T>>;
/**
 * **Promise\<Right\>**: T will be resolved right (SettledRight<T>)
 * @param item T | SettledRight<T> | PromiseFulfilledResult<T>
 * @param index number
 */
export function makeSettler<T>(
  item: PromiseLike<T | SettledRight<T> | PromiseFulfilledResult<T>>,
  index?: number
): Promise<SettledRight<T>>;
/**
 * **Promise\<Left\>**: SettledLeft
 * @param item SettledLeft | PromiseRejectedResult
 * @param index number
 */
export function makeSettler<T>(
  item: PromiseLike<SettledLeft | PromiseRejectedResult>,
  index?: number
): Promise<SettledLeft>;
/**
 * **Promise\<TBase\>**: T will be resolved right (SettledRight<T>)
 * @param item T
 * @param index number
 */
export function makeSettler<T>(
  item: PromiseLike<T>,
  index?: number
): Promise<SettledRight<T>>;
// INFO: Below are the non Promise like types ------------------------
/**
 * **Combo**: SettledLeft **or** SettledRight<T> as Settled<T>
 * @param item T | Settled<T> | PromiseSettledResult<T>
 * @param index number
 */
export function makeSettler<T>(
  item: T | Settled<T> | PromiseSettledResult<T>,
  index?: number
): Settled<T>;
/**
 * **Right**: T will be resolved right (SettledRight<T>)
 * @param item T | SettledRight<T> | PromiseFulfilledResult<T>
 * @param index number
 */
export function makeSettler<T>(
  item: T | SettledRight<T> | PromiseFulfilledResult<T>,
  index?: number
): SettledRight<T>;
/**
 * **Left**: SettledLeft
 * @param item SettledLeft | PromiseRejectedResult
 * @param index number
 */
export function makeSettler<T>(
  item: SettledLeft | PromiseRejectedResult,
  index?: number
): SettledLeft;
/**
 * **TBase**: T will be resolved right (SettledRight<T>)
 * @param item T
 * @param index number
 */
export function makeSettler<T>(item: T, index?: number): SettledRight<T>;

export function makeSettler<T>(
  item:
    | T
    | PromiseLike<T>
    | PromiseFulfilledResult<T>
    | PromiseLike<PromiseFulfilledResult<T>>,
  index?: number
): SettledRight<T> | Promise<SettledRight<T>>;

export function makeSettler<T>(
  item: PromiseRejectedResult | PromiseLike<PromiseRejectedResult>,
  index?: number
): SettledLeft | Promise<SettledLeft>;

export function makeSettler<T>(
  item:
    | T
    | PromiseLike<T>
    | PromiseSettledResult<T>
    | PromiseLike<PromiseSettledResult<T>>,
  index?: number
): Settled<T> | Promise<Settled<T>>;

// export function makeSettler<T>(
//   item:
//     | T
//     | PromiseLike<T>
//     | Settled<T>
//     | PromiseLike<Settled<T>>
//     | PromiseSettledResult<T>
//     | PromiseLike<PromiseSettledResult<T>>
//     | SettledRight<T>
//     | PromiseLike<SettledRight<T>>
//     | PromiseFulfilledResult<T>
//     | PromiseLike<PromiseFulfilledResult<T>>
//     | SettledLeft
//     | PromiseLike<SettledLeft>
//     | PromiseRejectedResult
//     | PromiseLike<PromiseRejectedResult>,
//   index?: number
// ):
//   | Settled<T>
//   | Promise<Settled<T>>
//   | SettledRight<T>
//   | Promise<SettledRight<T>>
//   | SettledLeft
//   | Promise<SettledLeft>;
// FUNC DEF:(makeSettler<T>) --------------------------------------------
export function makeSettler<T>(
  item: Base<T> | Deferred<T>,
  index: number = -1
): Promise<Settled<T>> | Settled<T> {
  return isPromiseLike(item)
    ? (async () => makeSettler_(await item, index))()
    : makeSettler_(item, index);
}
// FUNC DEF:(makeSettler_<T>) ----------------------------------------
/** @internal */
function makeSettler_<T>(item: Base<T>, index: number): Settled<T> {
  let itemTransformStep = getTransformStep(item, 0);
  let transformStep = -1;
  if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
    let itemValue: T;
    let base: { value: T; status: 'fulfilled' };
    if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
      transformStep = itemTransformStep;
      itemValue = item.value;
      base = item;
    } else {
      transformStep = 0;
      itemValue = item;
      base = { value: itemValue, status: 'fulfilled' };
    }
    return makeFulfillement<T>({
      value: itemValue,
      index,
      transformStep: transformStep,
      base,
    });
  }
  const base: { reason: any; status: 'rejected' } = item;
  const { reason } = item;
  transformStep = getTransformStep(item, 0);
  return makeRejection({
    reason,
    index,
    transformStep,
    currentRejection: false,
    base,
  });
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
