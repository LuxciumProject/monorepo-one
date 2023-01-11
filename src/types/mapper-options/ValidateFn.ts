import { OnlySideEffect } from '..';

/**
 * @group Delegates
 *   @public
 */
export interface ValidateFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ): Promise<OnlySideEffect>;
}

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
