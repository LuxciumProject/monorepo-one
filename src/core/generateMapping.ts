import {
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './function/fn_a1f9a';

/** @public */
export function* generateMapping<T, R>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) /* : Generator<PromiseSettledResult<Promise<R>>, void, unknown> */ {
  let index = 0;
  for (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform,
      validate,
      errLookup,
      lookup,
    });
  }
}

/* istanbul ignore next */
export async function generateMapping_TEST_() {
  console.log(`at: generateMapping_TEST_ from ${__filename}`);
  const generator = generateMapping([{ item: 10 }]);
  for (const generation of generator) {
    console.log(await generation);
  }
  return void 0;
}
// generateMapping_TEST_();
