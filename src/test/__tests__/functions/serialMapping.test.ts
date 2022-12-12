import { serialMapping } from '../../../functions';

describe('Main function serialMapping', () => {
  it('Take a TBase value', async () => {
    expect(await serialMapping([{ item: 10 }])).toStrictEqual([
      {
        index: 0,
        transformStep: 1,
        status: 'fulfilled',
        value: { item: 10 },
      },
    ]);
  });
  it('Take a Await<TBase> value', async () => {
    expect(await serialMapping(Promise.resolve([{ item: 10 }]))).toStrictEqual([
      {
        index: 0,
        transformStep: 1,
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
        // currentRejection: null,
        index: 0,
        transformStep: 1,
        // rejected: null,
        status: 'fulfilled',
        value: undefined,
      },
    ]);
  });
});

describe('serialMapping', () => {
  it('Should survive when throwing', async () => {
    const result = serialMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) throw ['test'];
    });
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: ['test'],
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });

  it('Should survive when throwing', async () => {
    const result = serialMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) throw ['test'];
      },
      item => item,
      async item => item,
      reason => reason
    );
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: ['test'],
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });

  it('Should survive when throwing', async () => {
    const result = serialMapping(
      [{ size: 10 }],
      async obj => {
        if (obj.size === 10) throw ['test'];
      },
      item => item,
      async item => item,
      undefined
    );
    const expected = {
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: ['test'],
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });
});
