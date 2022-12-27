import { isPromiseLike } from '../helpers/assertions';
import {
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';

/**
 * **UNSAFE**: Function type signature may still change at any moment please
 * remember this package is in the early devloppment phase and is
 * **UNSAFE** to use as its API is still evolving.
 * @alpha
 */

export async function awaitedMapping<T, R>(
  collection: Collection<T> | PromiseLike<Collection<T>>,
  transformFn: null | TransformFn<T, R> = async value => value as any as R,
  lookupFn: null | LookupFn<T, R> = v => void v,
  validateFn: null | ValidateFn<T, R> = async v => void v,
  errLookupFn: null | ErrLookupFn = v => void v
): Promise<Settled<R>[]> {
  const values = [
    ...(isPromiseLike(collection) ? await collection : collection),
  ];
  const result = values.map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    })
  );
  return Promise.all(result);
}

// /* istanbul ignore next */
// void async function awaitedMapping_v1<R, T>(
//   collection:
//     | Collection<T>
//     | PromiseLike<Collection<T>>
//     | Iterable<PromiseLike<Settled<T>>>,
//   transform: TransformFn<T, R> = async value => value as any as R,
//   lookup: LookupFn<T, R> = v => void v,
//   validate: ValidateFn<T, R> = async v => void v,
//   errLookup: ErrLookupFn = v => void v
// ) {
//   const values: (
//     | T
//     | Settled<T>
//     | PromiseLike<Settled<T>>
//     | PromiseSettledResult<T>
//   )[] = [...(isPromiseLike(collection) ? await collection : collection)];

//   const awaitedValues: (Settled<T> | PromiseSettledResult<T> | T)[] =
//     values.every(isPromiseLike) ? await Promise.all(values) : values;

//   const result = awaitedValues.map((item, index, array) =>
//     fn_a1f9a({
//       item,
//       index,
//       array,
//       transform,
//       lookup,
//       validate,
//       errLookup,
//     })
//   );
//   return Promise.all(result);
// };

// TASK LIST: [TODO] (Review Documentation) --------------------------
