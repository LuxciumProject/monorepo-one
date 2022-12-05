import { FULFILLED, REJECTED } from '../../constants';
import { isSettledRight, isSettledLeft, isSettled } from './isSettled';

/*

  // return (
  //   typeof contender === 'object' &&
  //   contender !== null &&
  //   'status' in contender &&
  //   'reason' in contender &&
  //   'currentRejection' in contender &&
  //   'recipeSteps' in contender &&
  //   'index' in contender &&
  //   REJECTED in contender &&
  //   FULFILLED in contender &&
  //   contender.status === REJECTED &&
  //   contender.reason === contender[REJECTED] &&
  //   typeof contender.recipeSteps === 'number' &&
  //   typeof contender.index === 'number' &&
  //   contender.fulfilled === null &&
  //   (contender.currentRejection === true ||
  //     contender.rejected === false ||
  //     contender.rejected === undefined)
  // );

 typeof contender === 'object' &&
    contender !== null &&
    'status' in contender &&
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
 */
// XXX: --------------------------------------------------------------
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
