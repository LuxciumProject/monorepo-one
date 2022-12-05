import { generateMapping } from '../../core';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMapping_TEST_', async () => {
    const generator = generateMapping([{ item: 10 }]);

    for (const generation of generator) {
      expect(await generation).toStrictEqual({
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      });
    }
    // expect(
    //   makeRejection({ reason: 'any', index: 0, currentRejection: true })
    // ).toStrictEqual({
    //   currentRejection: true,
    //   fulfilled: null,
    //   index: 0,
    //   reason: 'any',
    //   transformStep: 1,
    //   status: 'rejected',
    // });
  });
});

describe('generateMapping', () => {
  it('Should survive when throwing', async () => {
    const generator = generateMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) throw ['test'];
    });

    for (const generation of generator) {
      expect(await generation).toStrictEqual({
        currentRejection: true,
        fulfilled: null,
        index: 0,
        reason: ['test'],
        status: 'rejected',
        transformStep: 0,
      });
    }
  });
});
