import { FULFILLED, REJECTED } from '../constants';
import { Settled, SettledIso, SettledLeft, SettledRight } from '../types';

/** @public */
export function isSettledResult<T>(
  contender: any
): contender is PromiseSettledResult<T> {
  return isFulfilledResult<T>(contender) || isRejectedResult(contender);
}
/** @public */
export function isFulfilledResult<T>(
  contender: any
): contender is PromiseFulfilledResult<T> {
  return contender?.status === FULFILLED && 'value' in contender;
}

/** @public */
export function isRejectedResult(
  contender: any
): contender is PromiseRejectedResult {
  return contender?.status === REJECTED && 'reason' in contender;
}

/** @public */
export function is_Settled<T>(contender: any): contender is Settled<T> {
  return is_SettledRight<T>(contender) || is_SettledLeft(contender);
}

/** @public */
export function is_SettledIso<T>(contender: any): contender is SettledIso<T> {
  return is_SettledRight<T>(contender) || is_SettledLeft(contender);
}
/** @public */
export function is_SettledRight<T>(
  contender: any
): contender is SettledRight<T> {
  return (
    isFulfilledResult(contender) &&
    FULFILLED in contender &&
    'index' in contender
  );
}

/** @public */
export function is_SettledLeft(contender: any): contender is SettledLeft {
  return (
    isRejectedResult(contender) && REJECTED in contender && 'index' in contender
  );
}

/*

// Warning: (ae-incompatible-release-tags) The symbol "serialMapping_α"
is marked as @public, but its signature references "TransformFn" which is marked as @public
// Warning: (ae-incompatible-release-tags) The symbol "serialMapping_α"
is marked as @public, but its signature references "LookupFn" which is marked as @public
// Warning: (ae-incompatible-release-tags) The symbol "serialMapping_α"
is marked as @public, but its signature references "ValidateFn" which is marked as @public
// Warning: (ae-incompatible-release-tags) The symbol "serialMapping_α"
is marked as @public, but its signature references "ErrLookupFn" which is marked as @public
//


 */
