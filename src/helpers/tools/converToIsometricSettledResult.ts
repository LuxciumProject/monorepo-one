import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { isometricSettledResult } from './isometricSettledResult';

/** @beta */

export function converToIsometricSettledResult(
  collection: Array<SettledLeft | PromiseRejectedResult>
): SettledLeft[];
export function converToIsometricSettledResult<T>(
  collection: Array<SettledRight<T> | PromiseSettledResult<T>>
): SettledRight<T>[];
export function converToIsometricSettledResult<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[];
export function converToIsometricSettledResult<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[] {
  return collection.map(isometricSettledResult);
}

/** @internal */
export async function converToIsometricSettledResult_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    converToIsometricSettledResult([
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
    converToIsometricSettledResult([
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
    converToIsometricSettledResult([
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
// converToIsometricSettledResult_TEST_();
