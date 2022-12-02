import { makeRejection_TEST_ } from '../../../core/function/makeRejection';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test makeRejection_TEST_', () => {
    expect(() => makeRejection_TEST_()).not.toThrow();
  });
});
