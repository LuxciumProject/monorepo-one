import { generateMapping } from '../../core';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMapping_TEST_', async () => {
    const generator = generateMapping([{ item: 10 }]);

    for (const generation of generator) {
      expect(await generation).toStrictEqual({
        currentRejection: null,
        index: 0,
        recipeSteps: 0,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      });
    }
    // expect(
    //   makeRejection({ reason: 'any', index: 0, currentRejection: true })
    // ).toStrictEqual({
    //   currentRejection: true,
    //   fulfilled: null,
    //   index: 0,
    //   reason: 'any',
    //   recipeSteps: 0,
    //   status: 'rejected',
    // });
  });
});

// export async function generateMapping_TEST_() {
//   console.log(`at: generateMapping_TEST_ from ${__filename}`);
//   const generator = generateMapping([{ item: 10 }]);
//   for (const generation of generator) {
//     console.log(await generation);
//   }
//   return void 0;
// }
// // generateMapping_TEST_();
