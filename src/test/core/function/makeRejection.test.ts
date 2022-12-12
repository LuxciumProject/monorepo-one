import { makeRejection } from '../../../functions/core/makeRejection';

describe('Internal core function makeRejection', () => {
  it('Should pass the smoke test makeRejection_TEST_', () => {
    expect(
      makeRejection({
        reason: 'any',
        index: 0,
        currentRejection: true,
      })
    ).toStrictEqual({
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: 'any',
      status: 'rejected',
    });
  });
  it('Should take only a reason to produce the output', () => {
    expect(
      makeRejection({
        reason: 'any',
      })
    ).toStrictEqual({
      currentRejection: undefined,
      reason: 'any',
      status: 'rejected',
    });
  });
});
