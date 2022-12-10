import { generateMappingAsync } from '../../functions/generateMappingAsync';

/* istanbul ignore next */

export async function generateMappingAsync_TEST_(counter: { a: number }) {
  console.log(`at: generateMappingAsync_TEST_ from ${__filename}`);
  const generator = generateMappingAsync([{ item: 10 }]);
  for await (const generation of generator) {
    console.log(generation);
  }
  counter.a++;
  return counter;
}
