import { serialMapping } from '../../core';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test serialMapping', async () => {
    expect(
      await serialMapping([{ item: 10 }], async element => element)
    ).toStrictEqual([
      {
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: { item: 10 },
      },
    ]);
  });

  it('Should pass the smoke test serialMapping on rejection', async () => {
    expect(
      await serialMapping([{ item: 10 }], async element => {
        if (element.item === 11) throw element;
      })
    ).toStrictEqual([
      {
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: undefined,
      },
    ]);
  });
});
