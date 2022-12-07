import { LookupFn, SettledRight, TransformFn, ValidateFn } from '../../types';
import { makeFulfillement } from './makeFulfillement';
import { preTransform } from './preTransform';

/** @internal */
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
