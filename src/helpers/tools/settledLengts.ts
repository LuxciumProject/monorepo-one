import { FULFILLED, REJECTED } from '../../constants';
import { Settled } from '../../types';
import { getFulfilledResults } from './getFulfilledResults';

/** @beta */
export function settledLengts<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
) {
  const settled = collection.length;
  const fulfilled = getFulfilledResults(collection).length;
  const rejected = settled - fulfilled;

  return {
    fulfilled,
    rejected,
    settled,
  };
}

/** @internal */
export async function settledLengts_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    settledLengts([
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
    settledLengts([
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
    settledLengts([
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
// settledLengts_TEST_();
