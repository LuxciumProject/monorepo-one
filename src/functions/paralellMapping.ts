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

export function paralellMapping<T, R>(
  collection: Collection<T>,
  transformFn: null | TransformFn<T, R> = async value => value as any as R,
  lookupFn: null | LookupFn<T, R> = v => void v,
  validateFn: null | ValidateFn<T, R> = async v => void v,
  errLookupFn: null | ErrLookupFn = v => void v
): Promise<Settled<R>>[] {
  return [...collection].map((item, index, array) =>
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
}
/*
export async function paralellMapping_<T, R>(
  collection: Collection<T> | PromiseLike<Collection<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  const values = isPromiseLike(collection) ? await collection : collection;

  return [...values].map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      transform,
      array,
      lookup,
      validate,
      errLookup,
    })
  );
}
 */

// /* istanbul ignore next */
// void function paralellMapping_v1<T, R>(
//   collection: Iterable<Base<T>>,
//   transform: TransformFn<T, R> = async value => value as any as R,
//   lookup: LookupFn<T, R> = v => void v,
//   validate: ValidateFn<T, R> = async v => void v,
//   errLookup: ErrLookupFn = v => void v
// ) {
//   return [...collection].map((item, index, array) =>
//     fn_a1f9a({
//       item,
//       index,
//       transform,
//       array,
//       lookup,
//       validate,
//       errLookup,
//     })
//   );
// };
