import { coreFunction_MAIN_TESTS_ } from '../function/specs/smoke-tests';
import { awaitedMapping_TEST_ } from './awaitedMapping_TEST_';
import { generateMappingAsync_TEST_ } from './generateMappingAsync_TEST_';
import { generateMapping_TEST_ } from './generateMapping_TEST_';
import { paralellMapping_TEST_ } from './paralellMapping_TEST_';
import { serialMapping_TEST_ } from './serialMapping_TEST_';

export async function core_MAIN_TESTS_(counter: {
  a: number;
  core: number;
  coreFunction: number;
}) {
  console.log(`FROM: core_MAIN_TESTS_ in ${__filename}\n`);
  await serialMapping_TEST_(counter);
  counter.core++;
  await paralellMapping_TEST_(counter);
  counter.core++;
  await generateMappingAsync_TEST_(counter);
  counter.core++;
  await generateMapping_TEST_(counter);
  counter.core++;
  await awaitedMapping_TEST_(counter);
  counter.core++;
  coreFunction_MAIN_TESTS_(counter);
  return counter;
}
