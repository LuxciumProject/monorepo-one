import {
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseSettledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { getTransformStep } from '../../helpers/tools';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { makeFulfillement } from './makeFulfillement';
import { makeRejection } from './makeRejection';

export type Base<T> =
  | T
  | Settled<T>
  | PromiseSettledResult<T>
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | SettledLeft
  | PromiseRejectedResult;

export function makeSettler<T>(
  item:
    | T
    | Settled<T>
    | PromiseSettledResult<T>
    | SettledRight<T>
    | PromiseFulfilledResult<T>
    | SettledLeft
    | PromiseRejectedResult,
  index: number
): Settled<T>;
export function makeSettler<T>(
  item:
    | PromiseLike<T>
    | PromiseLike<SettledRight<T>>
    | PromiseLike<PromiseFulfilledResult<T>>
    | PromiseLike<SettledLeft>
    | PromiseLike<PromiseRejectedResult>,
  index: number
): Promise<Settled<T>>;
export function makeSettler<T>(
  item:
    | T
    | Settled<T>
    | PromiseSettledResult<T>
    | SettledRight<T>
    | PromiseFulfilledResult<T>
    | SettledLeft
    | PromiseRejectedResult
    | PromiseLike<T>
    | PromiseLike<SettledRight<T>>
    | PromiseLike<PromiseFulfilledResult<T>>
    | PromiseLike<SettledLeft>
    | PromiseLike<PromiseRejectedResult>,
  index: number = -1
): Promise<Settled<T>> | Settled<T> {
  return isPromiseLike(item)
    ? (async () => makeSettler_(await item, index))()
    : makeSettler_(item, index);
}

function makeSettler_<T>(
  item:
    | T
    | Settled<T>
    | PromiseSettledResult<T>
    | SettledRight<T>
    | PromiseFulfilledResult<T>
    | SettledLeft
    | PromiseRejectedResult,
  index: number = -1
): Settled<T> {
  let transformStep = getTransformStep(item, 0);
  if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
    let itemValue: T;
    if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
      if (isSettledRight<T>(item)) {
        const itemTransformStep = item.transformStep;
        transformStep = itemTransformStep + 1;
      }
      itemValue = item.value;
    } else {
      transformStep = 1;
      itemValue = item;
    }

    return makeFulfillement<T>({
      value: itemValue,
      index,
      transformStep: transformStep,
    });
  }
  const { reason } = item;
  transformStep = getTransformStep(item, 0);
  return makeRejection({
    reason,
    index,
    transformStep,
    currentRejection: false,
  });
}

/*

 return makeRejection({
        reason,
        index,
        transformStep,
        currentRejection: false,
      });

await PromiseLike<ST>
Promise.all(Iterable<PromiseLike<ST>>)

T | Settled<T> | PromiseSettledResult<T> | PromiseFulfilledResult<T> | SettledRight<T> |  PromiseRejectedResult | SettledLeft
°°
T
PromiseFulfilledResult<T> | SettledRight<T>
°
PromiseRejectedResult | SettledLeft
°°

can all be dondensed into Settled<T>





export function preTransform<T>(
  item: T | (SettledRight<T> | PromiseFulfilledResult<T>),
  transformStep: number = -1
): [value: T, transformStep: number] {
  // let transformStep = -1;
  let itemValue: T;
  if (isSettledRight<T>(item) || isPromiseFulfilledResult<T>(item)) {
    if (isSettledRight<T>(item)) {
      const itemTransformStep = item.transformStep;
      transformStep = itemTransformStep + 1;
    }
    itemValue = item.value;
  } else {
    transformStep = 1;
    itemValue = item;
  }

  return [itemValue, transformStep];
}
export function getTransformStep(
  item: unknown,
  initialTransformStep: number = -1
): number {
  let transformStep = initialTransformStep;
  if (hasTransformStep(item)) {
    transformStep = item.transformStep;
  }
  return transformStep;
}
export async function fulfillementBlock<T, R>(
  item: T | (SettledRight<T> | PromiseFulfilledResult<T>),
  index: number,
  array: any, // T | (SettledRight<T> | PromiseFulfilledResult<T>)[],
  transformStep: number = -1,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = (value, index, array) => void [value, index, array],
  validate: ValidateFn<T, R> = async (value, index, array) =>
    void [value, index, array]
) {
  const [itemValue, transformStep_] = preTransform(item, transformStep);

  const transformation = transform(itemValue, index, array);
  const value = await transformation;
  void lookup(value, index, array);
  await validate(value, index, array);

  return makeFulfillement<R>({ value, index, transformStep: transformStep_ });
}

 */
