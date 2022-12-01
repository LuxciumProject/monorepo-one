
import { getFulfilledResults } from './getFulfilledResults';

/** @beta */
export function listFulfilledResults<T>(
  collection: Array<PromiseSettledResult<T>>
): T[] {
  return getFulfilledResults(collection).map(item => item.value);
}
