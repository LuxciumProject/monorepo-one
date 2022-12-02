import { serialMapping_TEST_ } from '../../core/serialMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test serialMapping_TEST_', () => {
    expect(async () => await serialMapping_TEST_()).not.toThrow();
  });
});
