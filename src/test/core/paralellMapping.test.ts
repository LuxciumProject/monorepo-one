import { paralellMapping } from '../../core/paralellMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test paralellMapping_TEST_', async () => {
    expect(await Promise.all(paralellMapping([{ item: 10 }]))).toStrictEqual([
      {
        status: 'fulfilled',
        value: { item: 10 },
        transformStep: 1,
        index: 0,
      },
    ]);
  });
});
describe('paralellMapping', () => {
  it('Should survive when throwing', async () => {
    const result = paralellMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) throw ['test'];
    });
    const expected = {
      status: 'rejected',
      reason: ['test'],
      currentRejection: true,
      transformStep: 0,
      index: 0,
    };

    expect(await Promise.all(result)).toStrictEqual([expected]);
  });
});
