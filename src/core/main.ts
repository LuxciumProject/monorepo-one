import { listFulfilledResults } from '../helpers/tools';
import { awaitedMapping } from './awaitedMapping';

const transformFn = async (x: number) => {
  return x ** 2;
};

const validateFn = async (x: number) => {
  if (x % 2) {
    throw x;
  }
  return void x;
};

const step1 = awaitedMapping([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], transformFn);
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  // INFO: //// awaitedMapping /////////////////////////////////////////////////
  const step2 = awaitedMapping(step1, transformFn, undefined, validateFn);
  console.log(await step2);
  console.log(await listFulfilledResults(step2));
  return void step2;
})();
