import { FULFILLED, REJECTED } from '../constants';
import { Settled, SettledLeft, SettledRight } from '../types';

/** @beta */
export function mapFulfilledResults() {}

/** @beta */
export async function converToIsometricSettledResult<T>(
  collection: Array<PromiseSettledResult<T>>
) {
  return collection.map(isometricSettledResult);
}

/** @beta */
export function isometricSettledResult<T>(
  item: PromiseSettledResult<T>,
  index: number = -1
): Settled<T> {
  if (item.status === FULFILLED) {
    const settled: SettledRight<T> = {
      status: item.status,
      value: item.value,
      reason: undefined,
      fulfilled: item.value,
      rejected: null,
      currentRejection: null,
      recipeSteps: -1,
      index,
    };
    return settled;
  }
  const settled: SettledLeft = {
    status: item.status,
    reason: item.reason,
    value: undefined,
    rejected: item.reason,
    fulfilled: null,
    currentRejection: undefined,
    recipeSteps: -1,
    index,
  };
  return settled;
}
/** @beta */
export function getFulfilledResults<T>(
  collection: Array<PromiseSettledResult<T>>
): PromiseFulfilledResult<T>[] {
  return collection.filter(
    (item): item is PromiseFulfilledResult<T> =>
      item.status === FULFILLED && typeof item.value !== 'undefined'
  );
}

/** @beta */
export function listFulfilledResults<T>(
  collection: Array<PromiseSettledResult<T>>
): T[] {
  return getFulfilledResults(collection).map(item => item.value);
}

/** @beta */
export function getRejectedResults<T>(
  collection: Array<PromiseSettledResult<T>>
): PromiseRejectedResult[] {
  const result = collection.filter(
    (item): item is PromiseRejectedResult => item.status === REJECTED
  );
  return result;
}

/** @beta */
export function settledLengts<T>(collection: Array<PromiseSettledResult<T>>) {
  const settled = collection.length;
  const fulfilled = getFulfilledResults(collection).length;
  const rejected = settled - fulfilled;

  return {
    fulfilled,
    rejected,
    settled,
  };
}
