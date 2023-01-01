import { generateMapping } from '../..';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test generateMapping_TEST_', async () => {
    const generator = generateMapping([{ item: 10 }]);

    for (const generation of generator) {
      expect(await generation).toStrictEqual({
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
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
        // fulfilled: null,
        index: 0,
        reason: ['test'],
        status: 'rejected',
        transformStep: 0,
      });
    }
  });
  it('Should survive when throwing with null in each delegates functions', async () => {
    const generator = generateMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) throw ['test'];
      },
      null,
      null,
      null
    );

    for (const generation of generator) {
      expect(await generation).toStrictEqual({
        currentRejection: true,
        // fulfilled: null,
        index: 0,
        reason: ['test'],
        status: 'rejected',
        transformStep: 0,
      });
    }
  });
  it('Should be able to recive null in each delegates functions', async () => {
    const generator = generateMapping([1], null, null, null, null);
    const expected = {
      index: 0,
      status: 'fulfilled',
      transformStep: 1,
      value: 1,
    };
    for (const generation of generator) {
      expect(await generation).toStrictEqual(expected);
    }
    // expect(await result).toStrictEqual(expected);
  });
});
