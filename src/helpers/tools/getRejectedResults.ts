import { REJECTED } from '../../constants';

/** @beta */

export function getRejectedResults<T>(
  collection: Array<PromiseSettledResult<T>>
): PromiseRejectedResult[] {
  const result = collection.filter(
    (item): item is PromiseRejectedResult => item.status === REJECTED
  );
  return result;
}
