import { generateMapping } from '../generateMapping';

/* istanbul ignore next */
export async function generateMapping_TEST_(counter: { a: number }) {
  console.log(`at: generateMapping_TEST_ from ${__filename}`);
  const generator = generateMapping([{ item: 10 }]);
  for (const generation of generator) {
    console.log(await generation);
  }
  counter.a++;
  return counter;
}
