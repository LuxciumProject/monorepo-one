import { awaitedMapping_TEST_ } from './awaitedMapping_TEST_';
import { generateMappingAsync_TEST_ } from './generateMappingAsync';
import { generateMapping_TEST_ } from './generateMapping_TEST_';
import { paralellMapping_TEST_ } from './paralellMapping_TEST_';
import { serialMapping_TEST_ } from './serialMapping';

void (async function MAIN() {
  console.log(`FROM: SMOKE-TEST in ${__filename}\n`);
  await serialMapping_TEST_();
  await paralellMapping_TEST_();
  await generateMappingAsync_TEST_();
  await generateMapping_TEST_();
  await awaitedMapping_TEST_();

  // await fn_a1f9a_TEST_();
  // await fulfillementBlock_TEST_();
  // makeFulfillement_TEST_();
  // makeRejection_TEST_();
  return void 0;
})();
