#!/usr/bin/env ts-node
import { converToIsometricSettledResult_TEST_ } from './converToIsometricSettledResult_TEST_';
import { getFulfilledResults_TEST_ } from './getFulfilledResults_TEST_';
import { getRejectedResults_TEST_ } from './getRejectedResults_TEST_';
import { isometricSettledResult_TEST_ } from './isometricSettledResult_TEST_';
import { listFulfilledResults_TEST_ } from './listFulfilledResults_TEST_';
import { settledLengts_TEST_ } from './settledLengts_TEST_';
export async function tools_MAIN_TESTS_(counter: { a: number; tools: number }) {
  console.log(`FROM: tools_MAIN_TESTS_ in ${__filename}`);
  await converToIsometricSettledResult_TEST_(counter);
  counter.tools++;
  await getFulfilledResults_TEST_(counter);
  counter.tools++;
  await getRejectedResults_TEST_(counter);
  counter.tools++;
  await isometricSettledResult_TEST_(counter);
  counter.tools++;
  await listFulfilledResults_TEST_(counter);
  counter.tools++;
  await settledLengts_TEST_(counter);
  counter.tools++;
  console.log('count:', counter);
  return counter;
}
