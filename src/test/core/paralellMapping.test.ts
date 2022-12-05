import { paralellMapping } from '../../core/paralellMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test paralellMapping_TEST_', async () => {
    expect(await Promise.all(paralellMapping([{ item: 10 }]))).toStrictEqual([
      {
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      },
    ]);
  });
});
