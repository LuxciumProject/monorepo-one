import { FULFILLED, REJECTED } from '../../../constants';
import {
  fulfillementBlock,
  fulfillementBlock_v1,
} from '../../../functions/core/fulfillementBlock';

/* istanbul ignore next */
export async function fulfillementBlock_TEST_(counter: { a: number }) {
  console.log(`at: fulfillementBlock_TEST_ from ${__filename}`);
  console.log(await fulfillementBlock_v1(10, 0, [10], 0));
  console.log(
    await fulfillementBlock_v1(
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
      [10],
      0
    )
  );
  console.log(
    await fulfillementBlock_v1(
      {
        status: 'fulfilled',
        value: 10,
      },
      0,
      [10],
      0
    )
  );

  console.log(
    await fulfillementBlock(
      {
        status: FULFILLED,
        value: 10,
        [FULFILLED]: 10,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      },
      -1,
      [
        {
          status: FULFILLED,
          value: 10,
          [FULFILLED]: 10,
          [REJECTED]: null,
          currentRejection: null,
          transformStep: 0,
          index: 0,
        },
      ]
    )
  );
  counter.a++;
  return counter;
}
