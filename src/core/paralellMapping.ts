import {
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './function/fn_a1f9a';

/** @public */
export function paralellMapping<T, R>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  return [...collection].map((item, index, array) =>
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

export async function paralellMapping_TEST_() {
  console.log(`at: paralellMapping_TEST_ from ${__filename}`);
  console.log(await Promise.all(paralellMapping([{ item: 10 }])));
  return void 0;
}
// paralellMapping_TEST_();
