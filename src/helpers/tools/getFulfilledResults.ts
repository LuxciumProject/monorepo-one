import { FULFILLED } from '../../constants';

/** @beta */
export function getFulfilledResults<T>(
  collection: Array<PromiseSettledResult<T>>
): PromiseFulfilledResult<T>[] {
  return collection.filter(
    (item): item is PromiseFulfilledResult<T> =>
      item.status === FULFILLED && typeof item.value !== 'undefined'
  );
}
