import {
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseSettledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import { Base, Settled } from '../../types';
import { Await } from '../../types/MainTypes';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';

/** @internal */
export function makeSettler<T>(
  item: Promise<T> | Promise<Settled<T>> | Promise<PromiseFulfilledResult<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item:
    | PromiseLike<T>
    | PromiseLike<Settled<T>>
    | PromiseLike<PromiseFulfilledResult<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<Settled<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<PromiseFulfilledResult<T>>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: PromiseLike<T>,
  index?: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item: T | Settled<T> | PromiseSettledResult<T>,
  index?: number
): Settled<T>;
export function makeSettler<T>(item: Settled<T>, index?: number): Settled<T>;
export function makeSettler<T>(
  item: PromiseSettledResult<T>,
  index?: number
): Settled<T>;
export function makeSettler<T>(item: T, index?: number): Settled<T>;
// FUNC DEF:(makeSettler<T>) --------------------------------------------
export function makeSettler<T>(
  item: Base<T> | Await<T>,
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
