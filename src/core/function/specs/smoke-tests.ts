import { fn_a1f9a_TEST_ } from './fn_a1f9a_TEST_';
import { fulfillementBlock_TEST_ } from './fulfillementBlock_TEST_';
import { makeFulfillement_TEST_ } from './makeFulfillement_TEST_';
import { makeRejection_TEST_ } from './makeRejection_TEST_';

export async function coreFunction_MAIN_TESTS_(counter: {
  a: number;
  coreFunction: number;
}) {
  console.log(`FROM: coreFunction_MAIN_TESTS_ in ${__filename}\n`);
  makeFulfillement_TEST_(counter);
  counter.coreFunction++;
  makeRejection_TEST_(counter);
  counter.coreFunction++;
  await fn_a1f9a_TEST_(counter);
  counter.coreFunction++;
  await fulfillementBlock_TEST_(counter);
  counter.coreFunction++;
  return counter;
}
