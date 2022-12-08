import { isPromiseLike } from '../helpers/assertions';
import {
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './function/fn_a1f9a';
//  Promise<SettledLeft | SettledRight<number>>[]
// Iterable<PromiseLike<Settled<T>>>
// PromiseLike<Iterable<Settled<T>>>

export type ListThemAll<T> =
  | T
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | SettledLeft
  | PromiseRejectedResult
  | PromiseLike<T>
  | PromiseLike<SettledRight<T>>
  | PromiseLike<PromiseFulfilledResult<T>>
  | PromiseLike<SettledLeft>
  | PromiseLike<PromiseRejectedResult>
  | Iterable<T>
  | Iterable<SettledRight<T>>
  | Iterable<PromiseFulfilledResult<T>>
  | Iterable<SettledLeft>
  | Iterable<PromiseRejectedResult>
  | Iterable<PromiseLike<T>>
  | Iterable<PromiseLike<SettledRight<T>>>
  | Iterable<PromiseLike<PromiseFulfilledResult<T>>>
  | Iterable<PromiseLike<SettledLeft>>
  | Iterable<PromiseLike<PromiseRejectedResult>>
  | PromiseLike<Iterable<T>>
  | PromiseLike<Iterable<SettledRight<T>>>
  | PromiseLike<Iterable<PromiseFulfilledResult<T>>>
  | PromiseLike<Iterable<SettledLeft>>
  | PromiseLike<Iterable<PromiseRejectedResult>>
  | PromiseLike<Iterable<PromiseLike<T>>>
  | PromiseLike<Iterable<PromiseLike<SettledRight<T>>>>
  | PromiseLike<Iterable<PromiseLike<PromiseFulfilledResult<T>>>>
  | PromiseLike<Iterable<PromiseLike<SettledLeft>>>
  | PromiseLike<Iterable<PromiseLike<PromiseRejectedResult>>>;

/*

await PromiseLike<ST>
Promise.all(Iterable<PromiseLike<ST>>)

Settled<T>
PromiseSettledResult<T>
°°
T
PromiseFulfilledResult<T>
SettledRight<T>
°
PromiseRejectedResult
SettledLeft
°°

can all be dondensed into Settled<T>







    if (!isPromiseSettledResult(item) || isPromiseFulfilledResult(item)) {
    }
      if (isPromiseRejectedResult(item)) {
      }
      if (isPromiseRejectedResult(item)) {
      }


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


 */

/** @public */
export async function awaitedMapping<R, T>(
  collection:
    | Collection<T>
    | PromiseLike<Collection<T>>
    | Iterable<PromiseLike<Settled<T>>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  const values: (
    | T
    | Settled<T>
    | PromiseLike<Settled<T>>
    | PromiseSettledResult<T>
  )[] = [...(isPromiseLike(collection) ? await collection : collection)];

  const awaitedValues: (Settled<T> | PromiseSettledResult<T> | T)[] =
    values.every(isPromiseLike) ? await Promise.all(values) : values;

  const result = awaitedValues.map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform,
      lookup,
      validate,
      errLookup,
    })
  );
  return Promise.all(result);
}
