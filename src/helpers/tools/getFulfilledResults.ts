import { FULFILLED } from '../../constants';
import { makeSettler } from '../../functions/core/makeSettler';
import { Base } from '../../types';

export {};
/** @beta */
export function getFulfilledResults<T>(
  collection: Iterable<Base<T>> //  Array<Settled<T> | PromiseSettledResult<T>>
) {
  const list: Base<T>[] = [...collection];
  const settledList = list.map((element, index) => makeSettler(element, index));
  const result = settledList.filter(
    item => item.status === FULFILLED && typeof item.value !== 'undefined'
  );

  return result;
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
