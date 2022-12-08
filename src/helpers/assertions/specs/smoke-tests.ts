import { isPromiseLike_TEST_ } from './isPromiseLike_TEST_';
import { isPromiseSettledResult_TEST_ } from './isPromiseSettledResult_TEST_';
import { isPromise_TEST_ } from './isPromise_TEST_';
import { isSettled_TEST_ } from './isSettled_TEST_';

/* istanbul ignore next */
export async function assert_MAIN_TESTS_(counter: {
  a: number;
  assertions: number;
}) {
  console.log(`FROM: assert_MAIN_TESTS_ in ${__filename}`);
  await isPromise_TEST_(counter);
  counter.assertions++;
  await isPromiseLike_TEST_(counter);
  counter.assertions++;
  await isPromiseSettledResult_TEST_(counter);
  counter.assertions++;
  await isSettled_TEST_(counter);
  counter.assertions++;
  return void 0;
}
