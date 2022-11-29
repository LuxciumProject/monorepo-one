import { FULFILLED, REJECTED } from '../constants';
import { assertions } from '../helpers';
import { MapperOptions, SettledLeft, SettledRight } from '../types';
const { isFulfilledResult, isRejectedResult, isSettledResult } = assertions;

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
  let recipeSteps = -1;
  try {
    if (!isSettledResult(item) || isFulfilledResult(item)) {
      let itemValue: T;
      if (isFulfilledResult<T>(item)) {
        itemValue = item.value;
        const itemRecipeSteps = item?.recipeSteps || 0;
        recipeSteps = itemRecipeSteps + 1;
      } else {
        itemValue = item;
      }
      const value = await transform(itemValue, index, array);
      lookup(value, index);
      await validate(value, index);
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
        value: value,
        enumerable: false,
      });

      Object.defineProperty(result, 'currentRejection', {
        value: null,
        enumerable: true,
      });

      return result;
    }
    if (isRejectedResult(item)) {
      const { reason } = item;
      errLookup(reason, index, false);

      const result: SettledLeft = {
        status: REJECTED,
        reason,
        rejected: reason,
        fulfilled: null,
        currentRejection: false,
        recipeSteps: 0,
        index,
      };

      Object.defineProperty(result, 'rejected', {
        value: reason,
        enumerable: false,
      });

      Object.defineProperty(result, 'currentRejection', {
        value: false,
        enumerable: true,
      });
      return result;
    }
    throw new TypeError(
      `NEVER: item (${item}) is not assignable to type 'never'`
    );
  } catch (reason) {
    errLookup(reason, index, true);
    const result: SettledLeft = {
      status: REJECTED,
      reason,
      rejected: reason,
      fulfilled: null,
      currentRejection: true,
      recipeSteps: 0,
      index,
    };

    Object.defineProperty(result, 'rejected', {
      value: reason,
      enumerable: false,
    });

    Object.defineProperty(result, 'currentRejection', {
      value: true,
      enumerable: true,
    });
    return result;
  }
}
