import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';

/** @public */

export function isSettled<T>(contender: any): contender is Settled<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}

/** @public */
export function isSettledRight<T>(
  contender: any
): contender is SettledRight<T> {
  return (
    contender?.status === FULFILLED &&
    'value' in contender &&
    FULFILLED in contender &&
    REJECTED in contender &&
    contender.rejected === null &&
    'currentRejection' in contender &&
    contender.currentRejection === null &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender
  );
}

/** @public */
export function isSettledLeft(contender: any): contender is SettledLeft {
  return (
    contender?.status === REJECTED &&
    'reason' in contender &&
    FULFILLED in contender &&
    REJECTED in contender &&
    contender.fulfilled === null &&
    'currentRejection' in contender &&
    (contender.currentRejection === true ||
      contender.rejected === false ||
      contender.rejected === undefined) &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender
  );
}
