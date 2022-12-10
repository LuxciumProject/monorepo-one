import { reduceValueToSettled } from '../../functions/core/reduceValueToSettled';
import { Collection } from '../../types';
import { isPromiseLike } from '../assertions';
import { getFulfilledResults } from './getFulfilledResults';

// type Collection<T> = Array<Settled<T> | PromiseSettledResult<T>>;

/** @beta */
export async function listFulfilledResults<T>(
  collection: Collection<T> | PromiseLike<Collection<T>> //  Array<Settled<T> | PromiseSettledResult<T>>
) {
  // TODO: ===========================================================
  reduceValueToSettled;

  const values = isPromiseLike(collection) ? await collection : collection;
  return getFulfilledResults(values).flatMap(item => item.value);
}
