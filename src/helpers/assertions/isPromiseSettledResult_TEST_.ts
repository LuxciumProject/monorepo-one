import { FULFILLED, REJECTED } from '../../constants';
import {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} from './isPromiseSettledResult';

/** @internal */
/* istanbul ignore next */
export async function isPromiseSettledResult_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromiseFulfilledResult({ status: FULFILLED, value: null }));
  console.log(isPromiseRejectedResult({ status: REJECTED, reason: null }));

  console.log(isPromiseSettledResult({ status: FULFILLED, value: null }));
  console.log(isPromiseSettledResult({ status: REJECTED, reason: null }));
  return void 0;
}
