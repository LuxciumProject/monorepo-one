import { awaitedMapping_TEST_ } from '../../core/awaitedMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test awaitedMapping_TEST_', () => {
    expect(async () => await awaitedMapping_TEST_()).not.toThrow();
  });
});
