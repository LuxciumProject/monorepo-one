import { awaitedMapping, serialMapping } from './functions';
import {
  extractFulfilledValues,
  extractSettledValues,
} from './helpers/tools/extractValues';

async function main() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const mappedArray = await awaitedMapping(array, async element => {
    // Async operation on each element
    if (element % 4 === 2) {
      throw new Error('Error');
    }
    return element * 2;
  });

  const settledValues = extractSettledValues(mappedArray);
  console.log('settledValues :>>', settledValues);
  console.log('settledValues.length :>>', settledValues.length);
  // settledValues :>>  [
  //   2,  Symbol(null),
  //   6,  8,
  //   10, Symbol(null),
  //   14, 16,
  //   18, Symbol(null),
  //   22, 24
  // ]
  // settledValues.length :>>  12

  const fulfilledValues = extractFulfilledValues(mappedArray);
  console.log('fulfilledValues :>>', fulfilledValues);
  console.log('fulfilledValues.length :>>', fulfilledValues.length);
  // fulfilledValues :>>  [
  //   2,  6,  8, 10, 14,
  //   16, 18, 22, 24
  // ]
  // fulfilledValues.length :>>  9
}
main();

async function main2() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const mappedArray = await serialMapping(array, async element => {
    // Async operation on each element
    if (element % 4 === 2) {
      throw new Error('Error');
    }
    return element * 2;
  });

  const settledValues = extractSettledValues(mappedArray);
  console.log('settledValues :>>', settledValues);
  console.log('settledValues.length :>>', settledValues.length);
  // settledValues :>>  [
  //   2,  Symbol(null),
  //   6,  8,
  //   10, Symbol(null),
  //   14, 16,
  //   18, Symbol(null),
  //   22, 24
  // ]
  // settledValues.length :>>  12

  const fulfilledValues = extractFulfilledValues(mappedArray);
  console.log('fulfilledValues :>>', fulfilledValues);
  console.log('fulfilledValues.length :>>', fulfilledValues.length);
  // fulfilledValues :>>  [
  //   2,  6,  8, 10, 14,
  //   16, 18, 22, 24
  // ]
  // fulfilledValues.length :>>  9
}
main2();
