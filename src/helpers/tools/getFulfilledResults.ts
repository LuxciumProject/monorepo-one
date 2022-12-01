import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledRight } from '../../types';
import { converToIsometricSettledResult } from './converToIsometricSettledResult';

/** @beta */
export function getFulfilledResults<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): SettledRight<T>[] {
  const result = collection.filter(
    (item): item is PromiseFulfilledResult<T> =>
      item.status === FULFILLED && typeof item.value !== 'undefined'
  );

  return converToIsometricSettledResult(result);
}

/** @internal */
export async function getFulfilledResults_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    getFulfilledResults([
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        recipeSteps: 0,
        index: 0,
      },
    ])
  );
  console.log(
    getFulfilledResults([
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        recipeSteps: 0,
        index: 0,
      },
    ])
  );

  console.log(
    getFulfilledResults([
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
    ])
  );
  return void 0;
}
// getFulfilledResults_TEST_();
