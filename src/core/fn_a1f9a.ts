import { FULFILLED, REJECTED } from '../constants';
import { assertions } from '../helpers';
import { isSettledRight } from '../helpers/assertions';
import {
  ErrLookupFn,
  LookupFn,
  MapperOptions,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
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
  lookup = (value, index) => void [value, index],
  validate = async (value, index) => void [value, index],
  errLookup = (value, index, currentRejection) =>
    void [value, index, currentRejection],
}: MapperOptions<T, R>) {
  // let recipeSteps = -1;
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

      return rejectionBlock(reason, index, errLookup, false);
    }
    throw new TypeError(
      `NEVER: item (${item}) is not assignable to type 'never'`
    );
  } catch (reason) {
    return rejectionBlock(reason, index, errLookup, true);
  }
}

function rejectionBlock(
  reason: unknown,
  index: number,
  errLookup: ErrLookupFn,
  currentRejection: boolean
) {
  errLookup(reason, index, currentRejection);
  const result: SettledLeft = {
    status: REJECTED,
    reason,
    rejected: reason,
    fulfilled: null,
    currentRejection: currentRejection,
    recipeSteps: 0,
    index,
  };

  Object.defineProperty(result, 'rejected', {
    value: reason,
    enumerable: false,
  });

  return result;
}

export async function fulfillementBlock<T, R>(
  item: T | PromiseFulfilledResult<T>,
  index: number,
  array: (T | PromiseSettledResult<T>)[],
  transform: TransformFn<T, R>,
  lookup: LookupFn<T, R>,
  validate: ValidateFn<T, R>
) {
  let recipeSteps = -1;
  let itemValue: T;
  if (isPromiseFulfilledResult<T>(item)) {
    if (isSettledRight<T>(item)) {
      const itemRecipeSteps = item.recipeSteps;
      recipeSteps = itemRecipeSteps + 1;
    }
    itemValue = item.value;
  } else {
    itemValue = item;
    recipeSteps = 0;
  }
  const value = await transform(itemValue, index, array);
  lookup(value, index, array);
  await validate(value, index, array);
  const result: SettledRight<R> = {
    status: FULFILLED,
    value,
    fulfilled: value,
    rejected: null,
    currentRejection: null,
    recipeSteps,
    index,
  };

  Object.defineProperty(result, 'fulfilled', {
    value,
    enumerable: false,
  });

  return result;
}

// let itemValue: T;
// if (isPromiseFulfilledResult<T>(item)) {
//   if (isSettledRight<T>(item)) {
//     const itemRecipeSteps = item.recipeSteps;
//     recipeSteps = itemRecipeSteps + 1;
//   }
//   itemValue = item.value;
// } else {
//   itemValue = item;
// }
// const value = await transform(itemValue, index, array);
// lookup(value, index, array);
// await validate(value, index, array);
// const result: SettledRight<R> = {
//   status: FULFILLED,
//   value,
//   fulfilled: value,
//   rejected: null,
//   currentRejection: null,
//   recipeSteps,
//   index,
// };

// Object.defineProperty(result, 'fulfilled', {
//   value,
//   enumerable: false,
// });

// return result;

// errLookup(reason, index, false);

// const result: SettledLeft = {
//   status: REJECTED,
//   reason,
//   rejected: reason,
//   fulfilled: null,
//   currentRejection: false,
//   recipeSteps: 0,
//   index,
// };

// Object.defineProperty(result, 'rejected', {
//   value: reason,
//   enumerable: false,
// });

// Object.defineProperty(result, 'currentRejection', {
//   value: false,
//   enumerable: true,
// });
// return result;

// errLookup(reason, index, true);
// const result: SettledLeft = {
//   status: REJECTED,
//   reason,
//   rejected: reason,
//   fulfilled: null,
//   currentRejection: true,
//   recipeSteps: 0,
//   index,
// };

// Object.defineProperty(result, 'rejected', {
//   value: reason,
//   enumerable: false,
// });

// Object.defineProperty(result, 'currentRejection', {
//   value: true,
//   enumerable: true,
// });
// return result;
