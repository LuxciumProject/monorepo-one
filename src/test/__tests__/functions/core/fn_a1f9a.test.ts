import { fn_a1f9a } from '../../../../functions/core';
import { isSettledRight } from '../../../../helpers/assertions';

describe('CORE FUNCTION fn_a1f9a', () => {
  // const settledRight = {
  //   status: 'rejected',
  //   value: 'value of a specific type',
  //   transformStep: -1,
  //   index: -1,
  //   /* Folowing properties a not enumerated (enumerable: false) */
  //   currentRejection: null,
  //   fulfilled: 'value of a specific type',
  //   rejected: null,
  //   reason: undefined,
  // };
  it('Should transform an item of any specific type TBase', async () => {
    const contender = 'item';
    expect(typeof contender === 'string').toBe(true);
    expect(
      await fn_a1f9a({ item: contender, index: -1, array: ['item'] })
    ).toStrictEqual({ status: 'fulfilled', transformStep: 1, value: 'item' });
  });

  it('Should transform an item of type Settled<TBase>', async () => {
    const contender = {
      status: 'fulfilled',
      value: 'value of a specific type',
      transformStep: 3,
      index: 2,
      /* Folowing properties a not enumerated (enumerable: false) */
      currentRejection: null,
      fulfilled: 'value of a specific type',
      rejected: null,
      reason: undefined,
    };
    isSettledRight(contender);
    expect(isSettledRight(contender)).toBe(true);
    expect(
      await fn_a1f9a({
        item: { status: 'fulfilled', transformStep: 1, value: 'item' },
        index: 1,
        array: ['item'],
      })
    ).toStrictEqual({
      status: 'fulfilled',
      transformStep: 2,
      index: 1,
      value: 'item',
    });
  });

  it('Should transform an item of type PromiseSettledResult<TBase>', async () => {
    expect(
      await fn_a1f9a({
        item: { status: 'fulfilled', value: 'item' },
        index: 2,
        array: ['item'],
      })
    ).toStrictEqual({
      status: 'fulfilled',
      transformStep: 1,
      index: 2,
      value: 'item',
    });
  });

  it('Should transform an item of type SettledRight<TBase>', async () => {
    expect(
      await fn_a1f9a({
        item: {
          status: 'fulfilled',
          transformStep: 2,
          index: 1,
          value: 'item',
        },
        index: 3,
        array: ['item'],
      })
    ).toStrictEqual({
      status: 'fulfilled',
      transformStep: 3,
      index: 3,
      value: 'item',
    });
  });

  it.skip('Should transform an item of type PromiseFulfilledResult<TBase>', async () => {
    expect(
      await fn_a1f9a({ item: 'item', index: -1, array: ['item'] })
    ).toStrictEqual({ status: 'fulfilled', transformStep: 1, value: 'item' });
  });

  it.skip('Should transform an item of type SettledLeft', async () => {
    expect(
      await fn_a1f9a({ item: 'item', index: -1, array: ['item'] })
    ).toStrictEqual({ status: 'fulfilled', transformStep: 1, value: 'item' });
  });

  it.skip('Should transform an item of type PromiseRejectedResult', async () => {
    expect(
      await fn_a1f9a({ item: 'item', index: -1, array: ['item'] })
    ).toStrictEqual({ status: 'fulfilled', transformStep: 1, value: 'item' });
  });
});

/*
item
export type Base<TBase> =
  item of any specific type TBase
  item of type Settled<TBase>
  item of type PromiseSettledResult<TBase>
  item of type SettledRight<TBase>
  item of type PromiseFulfilledResult<TBase>
  item of type SettledLeft
  item of type PromiseRejectedResult;
export interface MapperOptions<T, U = unknown> {
  item: Base<T> | PromiseLike<Base<T>>;
  index: number;
  array: (Base<T> | PromiseLike<Base<T>>)[];
  transform?: TransformFn<T, U>;
  lookup?: LookupFn<T, U>;
  validate?: ValidateFn<T, U>;
  errLookup?: ErrLookupFn;
}
0) makeRejection (currentRejection = false)
1) fulfillementBlock resolves
2) fulfillementBlock ErrorOut
   makeRejection (currentRejection = true)

*/
