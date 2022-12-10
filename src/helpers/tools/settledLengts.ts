import { Settled } from '../../types';
import { getRejectedResults } from './getRejectedResults';

/** @beta */
export function settledLengts<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
) {
  const settled = collection.length;
  const rejected = getRejectedResults(collection).length;
  const fulfilled = settled - rejected;

  return {
    fulfilled,
    rejected,
    settled,
  };
}
