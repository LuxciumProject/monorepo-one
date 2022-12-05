import { awaitedMapping } from '../../core/awaitedMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test awaitedMapping_TEST_', async () => {
    expect(await awaitedMapping([{ item: 10 }])).toStrictEqual([
      {
        currentRejection: null,
        index: 0,
        recipeSteps: 0,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      },
    ]);
  });
});
