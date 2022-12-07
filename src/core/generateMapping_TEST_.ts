import { generateMapping } from './generateMapping';

/* istanbul ignore next */

export async function generateMapping_TEST_() {
  console.log(`at: generateMapping_TEST_ from ${__filename}`);
  const generator = generateMapping([{ item: 10 }]);
  for (const generation of generator) {
    console.log(await generation);
  }
  return void 0;
}
