import { FULFILLED, REJECTED } from '../../constants';

/** @public */
export function isPromiseSettledResult<T>(
  contender: any
): contender is PromiseSettledResult<T> {
  return (
    isPromiseFulfilledResult<T>(contender) || isPromiseRejectedResult(contender)
  );
}

/** @public */
export function isPromiseFulfilledResult<T>(
  contender: any
): contender is PromiseFulfilledResult<T> {
  return contender?.status === FULFILLED && 'value' in contender;
}

/** @public */
export function isPromiseRejectedResult(
  contender: any
): contender is PromiseRejectedResult {
  return contender?.status === REJECTED && 'reason' in contender;
}
