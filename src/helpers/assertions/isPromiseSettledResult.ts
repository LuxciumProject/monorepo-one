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
  contender: unknown
): contender is PromiseFulfilledResult<T> {
  return (
    contender != null &&
    typeof contender === 'object' &&
    'status' in contender &&
    contender.status === FULFILLED &&
    'value' in contender
  );
}

/** @public */
export function isPromiseRejectedResult(
  contender: unknown
): contender is PromiseRejectedResult {
  return (
    contender != null &&
    typeof contender === 'object' &&
    'status' in contender &&
    contender.status === REJECTED &&
    'reason' in contender
  );
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
