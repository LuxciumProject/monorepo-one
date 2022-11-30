import {
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './fn_a1f9a';

/** @public */
export async function awaitedMapping<R, T>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  const result = [...collection].map((item, index, array) =>
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

/*


export async function serialMapping_α<T, R>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<R> = v => void v,
  validate: ValidateFn<R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  let index = 0;
  const results: (SettledLeft | SettledRight<R>)[] = [];
  for (const item of collection) {
    results.push(
      await fn_a1f9a({
        item,
        index: index++,
        transform,
        lookup,
        validate,
        errLookup,
      })
    );
  }
  return results;
}


 */
