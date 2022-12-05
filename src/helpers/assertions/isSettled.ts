import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';

/** @public */
export function isSettled<T>(contender: any): contender is Settled<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}

/** @public */
export function isSettledRight<T>(
  contender: unknown
): contender is SettledRight<T> {
  return (
    typeof contender === 'object' &&
    contender !== null &&
    'status' in contender &&
    'value' in contender &&
    'currentRejection' in contender &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    //
    FULFILLED in contender &&
    REJECTED in contender &&
    contender.rejected === null &&
    //
    contender.status === FULFILLED &&
    contender.value === contender[FULFILLED] &&
    //
    contender.currentRejection === null
  );
}

/** @public */
export function isSettledLeft(contender: unknown): contender is SettledLeft {
  return (
    typeof contender === 'object' &&
    contender !== null &&
    //
    'status' in contender &&
    'reason' in contender &&
    'currentRejection' in contender &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    //
    REJECTED in contender &&
    FULFILLED in contender &&
    contender.fulfilled === null &&
    //
    contender.status === REJECTED &&
    contender.reason === contender[REJECTED] &&
    //
    (contender.currentRejection === true ||
      contender.currentRejection === false ||
      contender.currentRejection === undefined)
  );
}
