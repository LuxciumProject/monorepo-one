import { FULFILLED, REJECTED } from '../../constants';
import {
  isPromiseFulfilledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { LookupFn, SettledRight, TransformFn, ValidateFn } from '../../types';
import { makeFulfillement } from './makeFulfillement';

/** @internal */
export async function fulfillementBlock<T, R>(
  item: T | (SettledRight<T> | PromiseFulfilledResult<T>),
  index: number,
  array: any, // T | (SettledRight<T> | PromiseFulfilledResult<T>)[],
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = (value, index, array) => void [value, index, array],
  validate: ValidateFn<T, R> = async (value, index, array) =>
    void [value, index, array]
) {
  let transformStep = -1;
  let itemValue: T;
  if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
    if (isSettledRight<T>(item)) {
      const itemTransformStep = item.transformStep;
      transformStep = itemTransformStep + 1;
    }
    itemValue = item.value;
  } else {
    itemValue = item;
    transformStep = 1;
  }
  try {
    const value = await transform(itemValue, index, array);
    lookup(value, index, array);
    await validate(value, index, array);
    return makeFulfillement<R>({
      value,
      index,
      transformStep,
    });
  } catch (error) {
    throw error;
  }
}

/* istanbul ignore next */
export async function fulfillementBlock_TEST_() {
  console.log(`at: fulfillementBlock_TEST_ from ${__filename}`);
  console.log(await fulfillementBlock(10, 0, [10]));
  console.log(
    await fulfillementBlock(
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
    )
  );
  console.log(
    await fulfillementBlock(
      {
        status: 'fulfilled',
        value: 10,
      },
      0,
      [10]
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
  return void 0;
}
// fulfillementBlock_TEST_();
