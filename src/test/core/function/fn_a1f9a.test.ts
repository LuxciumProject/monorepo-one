import { fn_a1f9a } from '../../../core/function/fn_a1f9a';

describe('Sanity check Level 1', () => {
  it('Should pass the smoke test fn_a1f9a_TEST_', async () => {
    expect(
      await fn_a1f9a({
        item: 10,
        index: 0,
        array: [10],
      })
    ).toStrictEqual({
      currentRejection: null,
      index: 0,
      recipeSteps: 0,
      rejected: null,
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
      currentRejection: null,
      index: 0,
      recipeSteps: 0,
      rejected: null,
      status: 'fulfilled',
      value: 100,
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
        lookup: item => console.log(item),
      })
    ).toStrictEqual({
      currentRejection: null,
      index: 0,
      recipeSteps: 0,
      rejected: null,
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
        lookup: item => console.log(item),
        validate: async value => {
          if (value === 10) throw value;
        },
      })
    ).toStrictEqual({
      currentRejection: null,
      index: 0,
      recipeSteps: 0,
      rejected: null,
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
        lookup: item => console.log(item),
        validate: async value => {
          if (value === 10) throw value;
        },
        errLookup: async reason => void reason,
      })
    ).toStrictEqual({
      currentRejection: true,
      fulfilled: null,
      index: 0,
      reason: 10,
      recipeSteps: 0,
      status: 'rejected',
    });
  });
});
