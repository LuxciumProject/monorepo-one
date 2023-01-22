import { generateMappingAsync } from '../..';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMappingAsync_TEST_', async () => {
    const generator = generateMappingAsync([{ item: 10 }]);

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      });
    }
  });
  it('Should pass the smoke test generateMappingAsync_TEST_ with null in each delegates functions', async () => {
    const generator = generateMappingAsync(
      [{ item: 10 }],
      null,
      null,
      null,
      null
    );

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      });
    }
  });
});

describe('generateMappingAsync', () => {
  it('Should survive when throwing', async () => {
    const generator = generateMappingAsync([{ size: 10 }], async obj => {
      if (obj.size === 10) {
        throw ['test'];
      }
    });

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        currentRejection: true,
        // fulfilled: null,
        index: 0,
        reason: ['test'],
        status: 'rejected',
        transformStep: 0,
      });
    }
  });

  it('Should survive when throwing with null in each delegates functions', async () => {
    const generator = generateMappingAsync(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) {
          throw ['test'];
        }
      },
      null,
      null,
      null
    );

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        currentRejection: true,
        // fulfilled: null,
        index: 0,
        reason: ['test'],
        status: 'rejected',
        transformStep: 0,
      });
    }
  });
});
describe('generateMappingAsync take both Collection<B> or PromiseLike<Collection<B>>', () => {
  it('Should take PromiseLike<Collection<B>>', async () => {
    const generator = generateMappingAsync((async () => [{ size: 10 }])());

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        index: 0,
        status: 'fulfilled',
        transformStep: 1,
        value: { size: 10 },
      });
    }
  });

  it('Should take Collection<B>', async () => {
    const generator = generateMappingAsync((() => [{ size: 10 }])());

    for await (const generation of generator) {
      expect(generation).toStrictEqual({
        index: 0,
        status: 'fulfilled',
        transformStep: 1,
        value: { size: 10 },
      });
    }
  });
});
