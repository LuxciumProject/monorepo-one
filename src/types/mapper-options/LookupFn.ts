import { OnlySideEffect } from '..';

/** @public */
export interface LookupFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ): OnlySideEffect;
}
