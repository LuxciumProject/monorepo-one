import { fn_a1f9a } from '../../../core/function/fn_a1f9a';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test fn_a1f9a_TEST_', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
        transform: async item => item * 10,
      })
    ).toStrictEqual({
      currentRejection: null,
      index: 0,
      recipeSteps: 0,
      rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
});
