import { generateMappingAsync_TEST_ } from '../../core/generateMappingAsync';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMappingAsync_TEST_', () => {
    expect(async () => await generateMappingAsync_TEST_()).not.toThrow();
  });
});
