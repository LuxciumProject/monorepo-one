import { fulfillementBlock } from '../../../core/function/fulfillementBlock';

describe('Sanity check Level 1', () => {
  it.each([
    [
      fulfillementBlock(10, 0, [10]),
      {
        currentRejection: null,
        index: 0,
        transformStep: 1,
        rejected: null,
        status: 'fulfilled',
        value: 10,
      },
    ],
    [
      fulfillementBlock(
        {
          status: 'fulfilled',
          value: 10,
          reason: undefined,
          fulfilled: 10,
          rejected: null,
          currentRejection: null,
          transformStep: -1,
        },
        0,
        [10]
      ),
      {
        currentRejection: null,
        index: 0,
        transformStep: -1,
        rejected: null,
        status: 'fulfilled',
        value: 10,
      },
    ],
    [
      fulfillementBlock(
        {
          status: 'fulfilled',
          value: 10,
        },
        0,
        [10]
      ),
      {
        currentRejection: null,
        index: 0,
        transformStep: -1,
        rejected: null,
        status: 'fulfilled',
        value: 10,
      },
    ],
  ])(
    'Should pass the smoke test fulfillementBlock',
    async (contender, expected) => {
      expect(await contender).toStrictEqual(expected);
    }
  );
});
