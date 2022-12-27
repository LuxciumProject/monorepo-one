import { Base } from '../../types';
import { isPromiseLike } from '../assertions';
import { getFulfilledResults } from './getFulfilledResults';

export {};
// type Collection<T> = Array<Settled<T> | PromiseSettledResult<T>>;

/** @beta */
export async function listFulfilledResults<T>(
  collection: Iterable<Base<T>> | PromiseLike<Iterable<Base<T>>> //  Array<Settled<T> | PromiseSettledResult<T>>
) {
  // TODO: ===========================================================

  const values = isPromiseLike(collection) ? await collection : collection;
  return getFulfilledResults(values).flatMap(item => item.value);
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
