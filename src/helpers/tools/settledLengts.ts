import { Settled } from '../../types';
import { getFulfilledResults } from './getFulfilledResults';

/** @beta */
export function settledLengts<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
) {
  const settled = collection.length;
  const fulfilled = getFulfilledResults(collection).length;
  const rejected = settled - fulfilled;

  return {
    fulfilled,
    rejected,
    settled,
  };
}
