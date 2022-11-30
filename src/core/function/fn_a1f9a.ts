import { assertions } from '../../helpers';
import { MapperOptions } from '../../types';
import { fulfillementBlock } from './fulfillementBlock';
import { makeRejection } from './makeRejection';
const {
  isPromiseFulfilledResult,
  isPromiseRejectedResult,
  isPromiseSettledResult,
} = assertions;

/** @internal */
export async function fn_a1f9a<T, R>({
  item,
  index,
  array,
  transform = async value => value as any as R,
  lookup = (value, index, array) => void [value, index, array],
  validate = async (value, index, array) => void [value, index, array],
  errLookup = (value, index, currentRejection) =>
    void [value, index, currentRejection],
}: MapperOptions<T, R>) {
  try {
    if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
      return fulfillementBlock<T, R>(
        item,
        index,
        array,
        transform,
        lookup,
        validate
      );
    }
    if (isPromiseRejectedResult(item)) {
      const { reason } = item;
      errLookup(reason, index, false);
      return makeRejection({ reason, index, currentRejection: false });
    }
    throw new TypeError(
      `NEVER: item (${item}) is not assignable to type 'never'`
    );
  } catch (reason) {
    errLookup(reason, index, true);
    return makeRejection({ reason, index, currentRejection: true });
  }
}

export async function fn_a1f9a_TEST_() {
  console.log(`at: MAIN from ${__filename}`);
  console.log(await fn_a1f9a({ item: 10, index: 0, array: [10] }));
  return void 0;
}

// fn_a1f9a_TEST_()
