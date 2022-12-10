import { awaitedMapping } from '../functions/awaitedMapping';
import { paralellMapping } from '../functions/paralellMapping';
import { listFulfilledResults } from '../helpers/tools';

const transformFn = async (x: number) => {
  return x ** 2;
};

const addFn = async (x: number) => {
  return x + Date.now();
};

export const validateFn = async (x: number) => {
  if (x % 5) {
    throw x;
  }
  return void x;
};

const step1 = awaitedMapping(
  [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10, 11, 12, 13, 14, 15, 16, 17, 18,
    19, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 10,
  ],
  transformFn
);
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);

  // INFO: //// awaitedMapping ///////////////////////////////////////
  const step2 = paralellMapping(
    await step1,
    transformFn,
    undefined,
    validateFn
  );
  const step3 = awaitedMapping(step2, addFn, undefined, validateFn);
  console.log(await step3);
  console.log(await listFulfilledResults(step3));
  const value = await Promise.all(paralellMapping([{ item: 10 }]));
  console.log('value =', value);
  const result3 = paralellMapping([{ size: 10 }], async obj => {
    if (obj.size === 10) throw ['test'];
  });
  result3.map(async item => console.log('result3 =', await item));
  return void step3;
})();

/*

describe.skip('Sanity check Level 1', () => {
  it('Should pass the smoke test paralellMapping_TEST_', async () => {
    expect(await Promise.all(paralellMapping([{ item: 10 }]))).toStrictEqual([
      {
        status: 'fulfilled',
        value: { item: 10 },
        transformStep: 1,
        index: 0,
      },
    ]);
  });
});
describe.skip('paralellMapping', () => {
  it('Should survive when throwing', async () => {
    const result3 = paralellMapping([{ size: 10 }], async obj => {
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
    result.map(async item => expect(await item).toStrictEqual(expected));
  });
});

 */
