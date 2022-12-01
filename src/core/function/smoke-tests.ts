import { fn_a1f9a_TEST_ } from './fn_a1f9a';
import { fulfillementBlock_TEST_ } from './fulfillementBlock';
import { makeFulfillement_TEST_ } from './makeFulfillement';
import { makeRejection_TEST_ } from './makeRejection';

void (async function MAIN() {
  console.log(`FROM: SMOKE-TEST in ${__filename}\n`);
  await fn_a1f9a_TEST_();
  await fulfillementBlock_TEST_();
  makeFulfillement_TEST_();
  makeRejection_TEST_();
  return void 0;
})();
