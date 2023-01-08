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
  let result = false;
  try {
    result =
      contender != null &&
      typeof contender === 'object' &&
      'status' in contender &&
      contender.status === FULFILLED &&
      'value' in contender;
  } catch {
    // Do nothing
    /*
        The addition of the try/catch block
        ensure that the function does not throw any exceptions
        if an unexpected error occurs.
      */
  }
  return result;
}

/** @public */
export function isPromiseRejectedResult(
  contender: unknown
): contender is PromiseRejectedResult {
  let result = false;
  try {
    result =
      contender != null &&
      typeof contender === 'object' &&
      'status' in contender &&
      contender.status === REJECTED &&
      'reason' in contender;
  } catch {
    // Do nothing
    /*
        The addition of the try/catch block
        ensure that the function does not throw any exceptions
        if an unexpected error occurs.
      */
  }
  return result;
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
