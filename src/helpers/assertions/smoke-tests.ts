import { isPromise_TEST_ } from './isPromise';
import { isPromiseLike_TEST_ } from './isPromiseLike';
import { isPromiseSettledResult_TEST_ } from './isPromiseSettledResult';
import { isSettled_TEST_ } from './isSettled';

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  await isPromise_TEST_();
  await isPromiseLike_TEST_();
  await isPromiseSettledResult_TEST_();
  await isSettled_TEST_();
  return void 0;
})();
