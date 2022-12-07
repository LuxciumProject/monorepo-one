import { converToIsometricSettledResult_TEST_ } from './converToIsometricSettledResult';
import { getFulfilledResults_TEST_ } from './getFulfilledResults_TEST_';
import { getRejectedResults_TEST_ } from './getRejectedResults';
import { isometricSettledResult_TEST_ } from './isometricSettledResult_TEST_';
import { listFulfilledResults_TEST_ } from './listFulfilledResults_TEST_';
import { settledLengts_TEST_ } from './settledLengts_TEST_';

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  await converToIsometricSettledResult_TEST_();
  await getFulfilledResults_TEST_();
  await getRejectedResults_TEST_();
  await isometricSettledResult_TEST_();
  await listFulfilledResults_TEST_();
  await settledLengts_TEST_();
  return void 0;
})();
