import { OnlySideEffect } from '..';

/** @public */
export interface ValidateFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ): Promise<OnlySideEffect>;
}

export interface ValidateFnSync<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ):  OnlySideEffect;
}
// TASK LIST: [TODO: Types] (Review Documentation) -------------------
