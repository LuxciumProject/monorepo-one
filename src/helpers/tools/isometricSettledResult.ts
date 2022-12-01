import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';

/** @beta */

export function isometricSettledResult<T>(
  item: PromiseSettledResult<T>,
  index: number = -1
): Settled<T> {
  if (item.status === FULFILLED) {
    const settled: SettledRight<T> = {
      status: item.status,
      value: item.value,
      reason: undefined,
      fulfilled: item.value,
      rejected: null,
      currentRejection: null,
      recipeSteps: -1,
      index,
    };
    return settled;
  }
  const settled: SettledLeft = {
    status: item.status,
    reason: item.reason,
    value: undefined,
    rejected: item.reason,
    fulfilled: null,
    currentRejection: undefined,
    recipeSteps: -1,
    index,
  };
  return settled;
}

/** @internal */
export async function isometricSettledResult_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    [
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        recipeSteps: 0,
        index: 0,
      },
    ].map(isometricSettledResult)
  );
  console.log(
    [
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        recipeSteps: 0,
        index: 0,
      },
    ].map(isometricSettledResult)
  );

  console.log(
    [
      {
        status: REJECTED,
        reason: null,
      },
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        recipeSteps: 0,
        index: 0,
      },
      {
        status: FULFILLED,
        value: null,
      },
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        recipeSteps: 0,
        index: 0,
      },
    ].map(isometricSettledResult)
  );
  return void 0;
}
// isometricSettledResult_TEST_();
