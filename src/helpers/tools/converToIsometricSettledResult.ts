import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { isometricSettledResult } from './isometricSettledResult';

function converToIsometricSettledResult_(
  collection: Array<SettledLeft | PromiseRejectedResult>
): SettledLeft[];
function converToIsometricSettledResult_<T>(
  collection: Array<SettledRight<T> | PromiseSettledResult<T>>
): SettledRight<T>[];
function converToIsometricSettledResult_<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[];
function converToIsometricSettledResult_<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[] {
  return collection.map(isometricSettledResult);
}

/** @internal */
/* istanbul ignore next */
export async function converToIsometricSettledResult_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    converToIsometricSettledResult_([
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      },
    ])
  );
  console.log(
    converToIsometricSettledResult_([
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      },
    ])
  );

  console.log(
    converToIsometricSettledResult_([
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
        transformStep: 0,
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
        transformStep: 0,
        index: 0,
      },
    ])
  );
  return void 0;
}
// converToIsometricSettledResult_TEST_();

/** @beta */
export const converToIsometricSettledResult = converToIsometricSettledResult_;
