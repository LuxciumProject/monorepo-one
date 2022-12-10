import {
  isPromise,
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseSettledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';

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

export function makeSettler<T>(
  item:
    | T
    | Settled<T>
    | PromiseSettledResult<T>
    | PromiseLike<T>
    | PromiseLike<Settled<T>>
    | PromiseLike<PromiseSettledResult<T>>,
  index: number = -1
): Promise<Settled<T>> | Settled<T> {
  return isPromise(item) || isPromiseLike(item)
    ? (async () => makeSettler_(await item, index))()
    : makeSettler_(item, index);
}

function makeSettler_<T>(
  item:
    | T
    | Settled<T>
    | PromiseSettledResult<T>
    | SettledRight<T>
    | PromiseFulfilledResult<T>
    | SettledLeft
    | PromiseRejectedResult,
  index: number
): Settled<T> {
  let itemTransformStep = getTransformStep(item, 0);
  let transformStep = -1;
  if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
    let itemValue: T;
    if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
      transformStep = itemTransformStep;
      itemValue = item.value;
    } else {
      transformStep = 0;
      itemValue = item;
    }

    return makeFulfillement<T>({
      value: itemValue,
      index,
      transformStep: transformStep,
    });
  }
  const { reason } = item;
  transformStep = getTransformStep(item, 0);
  return makeRejection({
    reason,
    index,
    transformStep,
    currentRejection: false,
  });
}
