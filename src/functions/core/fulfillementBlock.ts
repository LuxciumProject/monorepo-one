import { LookupFn, SettledRight, TransformFn, ValidateFn } from '../../types';
import { TransformFnSync } from '../../types/mapper-options/TransformFn';
import { makeFulfillement } from './makeFulfillement';
// FUNC DEF:(fulfillementBlock<T, R>) ----------------------------------------
/** @internal */
export async function fulfillementBlock<T, R>(
  item: SettledRight<T>,
  index: number,
  array: any,
  transformFn: TransformFn<T, R> = async value => value as any as R,
  lookupFn: LookupFn<T, R> = (value, index, array) =>
    void [value, index, array],
  validateFn: ValidateFn<T, R> = async (value, index, array) =>
    void [value, index, array]
) {
  const transformation = transformFn(item.value, index, array);
  const value = await transformation;
  void lookupFn(value, index, array);
  await validateFn(value, index, array);
  let { transformStep } = item;
  transformStep++;
  return makeFulfillement<R>({ value, index, transformStep });
}



export async function fulfillementBlockSync<T, R>(
  item: SettledRight<T>,
  index: number,
  array: any,
  transformFn: TransformFnSync<T, R> =   value => value as any as R,
  lookupFn: LookupFn<T, R> = (value, index, array) =>
    void [value, index, array],
  validateFn: ValidateFn<T, R> = async (value, index, array) =>
    void [value, index, array]
) {
  const transformation = transformFn(item.value, index, array);
  const value = await transformation;
  void lookupFn(value, index, array);
  await validateFn(value, index, array);
  let { transformStep } = item;
  transformStep++;
  return makeFulfillement<R>({ value, index, transformStep });
}
// TASK LIST: [TODO] (Review Documentation) --------------------------
