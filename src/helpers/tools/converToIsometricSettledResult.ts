import { isometricSettledResult } from './isometricSettledResult';

/** @beta */
export async function converToIsometricSettledResult<T>(
  collection: Array<PromiseSettledResult<T>>
) {
  return collection.map(isometricSettledResult);
}
