import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { TransformStep } from '../../types/TransformStep';

/** @public */
export function isSettled<T>(contender: any): contender is Settled<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}

/** @public*/
export function hasTransformStep(
  countender: unknown
): countender is TransformStep {
  return (
    countender != null &&
    typeof countender === 'object' &&
    'transformStep' in countender &&
    typeof countender.transformStep === 'number'
  );
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
    'transformStep' in contender &&
    typeof contender.transformStep === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    (('reason' in contender && contender.reason === undefined) ||
      !('reason' in contender)) &&
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
    'transformStep' in contender &&
    typeof contender.transformStep === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number' &&
    (('value' in contender && contender.value === undefined) ||
      !('value' in contender)) &&
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
