import {
  isPromiseFulfilledResult,
  isSettledRight,
} from '../../helpers/assertions';
import { SettledRight } from '../../types';

/** @internal */

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
