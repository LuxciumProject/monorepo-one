import { awaitedMapping } from './awaitedMapping';

const doSomething = async (x: number) => {
  return x ** 2;
};
const mappingResult = awaitedMapping([1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  doSomething
);
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  // console.log(await mappingResult);
  const step2 = awaitedMapping(await mappingResult, doSomething);
  console.log(await step2);
  return void step2;
})();
