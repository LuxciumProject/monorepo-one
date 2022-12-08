#!/usr/bin/env ts-node
import './core/function/specs/smoke-tests';
import './core/specs/smoke-tests';
import { core_MAIN_TESTS_ } from './core/specs/smoke-tests';
import { helpers_TESTS_ } from './helpers/specs/smoke-test';

// import './helpers/specs/smoke-test';
let counter = {
  a: 0,
  tools: 0,
  assertions: 0,
  core: 0,
  coreFunction: 0,
};
(async function _SMOKE_TESTS_(
  counters: {
    a: number;
    core: number;
    coreFunction: number;
    tools: number;
    assertions: number;
  } = counter
) {
  console.log(`FROM: _SMOKE_TESTS_ in ${__filename}`);
  await core_MAIN_TESTS_(counters);
  await helpers_TESTS_(counters);
  console.log(counters);
  return counters;
})();
