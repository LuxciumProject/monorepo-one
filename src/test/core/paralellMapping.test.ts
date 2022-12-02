import { paralellMapping_TEST_ } from '../../core/paralellMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test paralellMapping_TEST_', () => {
    expect(async () => await paralellMapping_TEST_()).not.toThrow();
  });
});
