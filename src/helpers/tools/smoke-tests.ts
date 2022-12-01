import { converToIsometricSettledResult_TEST_ } from './converToIsometricSettledResult';
import { getFulfilledResults_TEST_ } from './getFulfilledResults';
import { getRejectedResults_TEST_ } from './getRejectedResults';
import { isometricSettledResult_TEST_ } from './isometricSettledResult';
import { listFulfilledResults_TEST_ } from './listFulfilledResults';
import { settledLengts_TEST_ } from './settledLengts';

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
