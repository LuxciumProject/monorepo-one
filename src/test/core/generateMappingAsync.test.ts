import { generateMappingAsync } from '../../core';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMappingAsync_TEST_', async () => {
    const generator = generateMappingAsync([{ item: 10 }]);

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      });
    }
  });
});
