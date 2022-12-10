import { isPromiseLike } from '../helpers/assertions';
import {
  Base,
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './function/fn_a1f9a';

/** @public */
export async function awaitedMapping<T, R>(
  collection:
    | Iterable<Base<T>>
    | PromiseLike<Iterable<Base<T>>>
    | Iterable<PromiseLike<Base<T>>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  const values = [
    ...(isPromiseLike(collection) ? await collection : collection),
  ];
  const result = values.map((item, index, array) =>
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

/* istanbul ignore next */
void async function awaitedMapping_v1<R, T>(
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
};
