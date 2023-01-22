import { parallelMapping } from '../..';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test parallelMapping_TEST_', async () => {
    expect(await Promise.all(parallelMapping([{ item: 10 }]))).toStrictEqual([
      {
        status: 'fulfilled',
        value: { item: 10 },
        transformStep: 1,
        index: 0,
      },
    ]);
  });
});
describe('parallelMapping', () => {
  it('Should survive when throwing', async () => {
    const result = parallelMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) {
        throw ['test'];
      }
    });
    const expected = {
      status: 'rejected',
      reason: ['test'],
      currentRejection: true,
      transformStep: 0,
      index: 0,
    };

    expect(await Promise.all(result)).toStrictEqual([expected]);
  });
  it('Should survive when throwing with null in each delegates functions', async () => {
    const result = parallelMapping(
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
    const expected = {
      status: 'rejected',
      reason: ['test'],
      currentRejection: true,
      transformStep: 0,
      index: 0,
    };

    expect(await Promise.all(result)).toStrictEqual([expected]);
  });
  it('Should be able to recive null in each delegates functions', async () => {
    const result = parallelMapping([1, 2, 3], null, null, null, null);
    const expected = [
      { index: 0, status: 'fulfilled', transformStep: 1, value: 1 },
      { index: 1, status: 'fulfilled', transformStep: 1, value: 2 },
      { index: 2, status: 'fulfilled', transformStep: 1, value: 3 },
    ];

    expect(await Promise.all(result)).toStrictEqual(expected);
  });
});
