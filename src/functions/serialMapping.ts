import { isPromiseLike } from '../helpers/assertions';
import {
  Base,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';

/** @public */
export async function serialMapping<T, R>(
  collection:
    | Iterable<Base<T>>
    | PromiseLike<Iterable<Base<T>>>
    | Iterable<PromiseLike<Base<T>>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  let array: (Base<T> | PromiseLike<Base<T>>)[];

  if (isPromiseLike(collection)) {
    array = [...(await collection)];
  } else {
    array = [...collection];
  }

  // const array = [...collection_];
  let index = 0;
  const results: Settled<R>[] = [];
  for (const item of array) {
    results.push(
      await fn_a1f9a({
        item,
        index: index++,
        array,
        transform,
        lookup,
        validate,
        errLookup,
      })
    );
  }
  return results;
}
