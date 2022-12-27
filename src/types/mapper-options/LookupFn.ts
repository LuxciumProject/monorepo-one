import { OnlySideEffect, Settled } from '..';

/** @public */
export interface LookupFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | Settled<S> | PromiseSettledResult<S>)[]
  ): OnlySideEffect;
}

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
