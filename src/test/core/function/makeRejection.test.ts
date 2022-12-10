import { makeRejection } from '../../../functions/core/makeRejection';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test makeRejection_TEST_', () => {
    expect(
      makeRejection({
        reason: 'any',
        index: 0,
        transformStep: 0,
        currentRejection: true,
      })
    ).toStrictEqual({
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: 'any',
      transformStep: 0,
      status: 'rejected',
    });
  });
});
