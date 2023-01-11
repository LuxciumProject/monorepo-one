import { OnlySideEffect, Settled } from '..';

/**
 * @group Delegates
 * @public
 */
export interface LookupFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | Settled<S> | PromiseSettledResult<S>)[]
  ): OnlySideEffect;
}

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
