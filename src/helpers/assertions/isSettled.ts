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
    contender.value === contender[FULFILLED] &&
    REJECTED in contender &&
    contender.rejected === null &&
    'currentRejection' in contender &&
    contender.currentRejection === null &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number'
  );
}

/** @public */
export function isSettledLeft(contender: any): contender is SettledLeft {
  return (
    contender?.status === REJECTED &&
    'reason' in contender &&
    FULFILLED in contender &&
    REJECTED in contender &&
    contender.reason === contender[REJECTED] &&
    contender.fulfilled === null &&
    'currentRejection' in contender &&
    (contender.currentRejection === true ||
      contender.rejected === false ||
      contender.rejected === undefined) &&
    'recipeSteps' in contender &&
    typeof contender.recipeSteps === 'number' &&
    'index' in contender &&
    typeof contender.index === 'number'
  );
}

/** @internal */
export async function isSettled_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    isSettledRight({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      recipeSteps: 0,
      index: 0,
    })
  );
  isSettledRight({
    status: 'fulfilled',
    value: 10,
    // reason: undefined,
    fulfilled: 10,
    rejected: null,
    currentRejection: null,
    recipeSteps: -1,
  }) &&
    // HACK: -------------------------------------------------------
    process.exit(51);
  // BUG: --------------------------------------------------------

  console.log(
    isSettledLeft({
      status: REJECTED,
      reason: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: true,
      recipeSteps: 0,
      index: 0,
    })
  );

  console.log(
    isSettled({
      status: FULFILLED,
      value: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: null,
      recipeSteps: 0,
      index: 0,
    })
  );
  console.log(
    isSettled({
      status: REJECTED,
      reason: null,
      [FULFILLED]: null,
      [REJECTED]: null,
      currentRejection: true,
      recipeSteps: 0,
      index: 0,
    })
  );
  return void 0;
}
// isSettled_TEST_();

/*
{
status: REJECTED,
reason: null,
[FULFILLED]: null,
[REJECTED]: null,
currentRejection:true,
recipeSteps:0,
index:0,
}

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
 */
