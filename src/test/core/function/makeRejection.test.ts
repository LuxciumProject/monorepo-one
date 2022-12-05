import { makeRejection } from '../../../core/function/makeRejection';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test makeRejection_TEST_', () => {
    expect(
      makeRejection({ reason: 'any', index: 0, currentRejection: true })
    ).toStrictEqual({
      currentRejection: true,
      fulfilled: null,
      index: 0,
      reason: 'any',
      recipeSteps: 0,
      status: 'rejected',
    });
  });
});
