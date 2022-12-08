#!/usr/bin/env ts-node
import { assert_MAIN_TESTS_ } from '../assertions/specs/smoke-tests';
import { tools_MAIN_TESTS_ } from '../tools/specs/smoke-tests';
export async function helpers_TESTS_(counter: {
  a: number;
  tools: number;
  assertions: number;
}) {
  console.log(`FROM: helpers_TESTS_ in ${__filename}`);
  await tools_MAIN_TESTS_(counter);
  await assert_MAIN_TESTS_(counter);
  return counter;
}
