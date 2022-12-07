import { awaitedMapping } from '../../core/awaitedMapping';

describe('Sanity check Level 1', () => {
  it('Should pass basic smoke test', async () => {
    expect(await awaitedMapping([{ item: 10 }])).toStrictEqual([
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
});
describe('awaitedMapping', () => {
  it('Should survive when throwing', async () => {
    const result = awaitedMapping([{ size: 10 }], async obj => {
      if (obj.size === 10) throw ['test'];
    });
    const expected = {
      currentRejection: true,
      fulfilled: null,
      index: 0,
      reason: ['test'],
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });
  it('Should recive the ccollection also as a promise', async () => {
    const result = awaitedMapping((async () => [{ size: 10 }])(), async obj => {
      if (obj.size === 10) throw ['test'];
    });
    const expected = {
      currentRejection: true,
      fulfilled: null,
      index: 0,
      reason: ['test'],
      status: 'rejected',
      transformStep: 0,
    };

    expect(await result).toStrictEqual([expected]);
  });
});
