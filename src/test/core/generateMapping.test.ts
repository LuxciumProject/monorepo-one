import { generateMapping_TEST_ } from '../../core/generateMapping';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMapping_TEST_', () => {
    expect(async () => await generateMapping_TEST_()).not.toThrow();
  });
});
