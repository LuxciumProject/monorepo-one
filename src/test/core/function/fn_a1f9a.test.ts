import { FULFILLED, REJECTED } from '../../../constants';
import { fn_a1f9a } from '../../../functions/core/fn_a1f9a';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test fn_a1f9a_TEST_', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 10,
    });
  });
});

describe('Sanity check Level 1', () => {
  it('Should accept a transformFn', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
        transform: async item => item * 10,
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
  it('Should accept a transformFn', async () => {
    expect(
      await fn_a1f9a({
        item: { status: FULFILLED, value: 10 },
        index: 0,
        array: [10],
        transform: async value => value * 10,
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
  it('Should accept a isPromiseLike(item)', async () => {
    expect(
      await fn_a1f9a({
        item: (async () => ({ status: FULFILLED, value: 10 }))(),
        index: 0,
        array: [10],
        transform: async value => value * 10,
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
  it('Should accept a transformFn', async () => {
    expect(
      await fn_a1f9a({
        item: { status: REJECTED, reason: null },
        index: 0,
        array: [10],
        transform: async value => value * 10,
      })
    ).toStrictEqual({
      currentRejection: false,
      // fulfilled: null,
      index: 0,
      transformStep: 0,
      reason: null,
      status: 'rejected',
    });
  });
});
describe('Sanity check Level 1', () => {
  it('Should accept a lookupFn', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
        transform: async item => item * 10,
        lookup: item => void item,
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
});
describe('Sanity check Level 1', () => {
  it('Should accept a validateFn which do not throw', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
        transform: async item => item * 10,
        lookup: item => void item,
        validate: async value => {
          if (value === 10) {
            throw value;
          }
        },
      })
    ).toStrictEqual({
      // currentRejection: null,
      index: 0,
      transformStep: 1,
      // rejected: null,
      status: 'fulfilled',
      value: 100,
    });
  });
});
describe('Sanity check Level 1', () => {
  it('Should accept a validateFn which throws', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
        transform: async item => item,
        lookup: item => void item,
        validate: async value => {
          if (value === 10) {
            throw value;
          }
        },
        errLookup: reason => void reason,
      })
    ).toStrictEqual({
      currentRejection: true,
      // fulfilled: null,
      index: 0,
      reason: 10,
      transformStep: 0,
      status: 'rejected',
    });
  });
});
