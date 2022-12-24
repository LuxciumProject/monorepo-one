import { awaitedMapping } from './functions';

async function main() {
  const array = [1, 2, 3];
  const mappedArray = await awaitedMapping(array, async element => {
    // Async operation on each element
    return element * 2;
  });
  console.log(mappedArray);

  /*
    [
      { status: 'fulfilled', value: 2, index: 0, transformStep: 1 },
      { status: 'fulfilled', value: 4, index: 1, transformStep: 1 },
      { status: 'fulfilled', value: 6, index: 2, transformStep: 1 }
    ]
  */

  const fulfilledValues = listFulfilledResults(mappedArray);
  console.log('fulfilled :>> ', fulfilledValues);
}

main();
