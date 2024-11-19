import type { Settled, SettledLeft, SettledRight } from "./Settled";

/**
 * @group Base Types
 * @public
 */

export type Base<TVal> =
  | PromiseFulfilledResult<TVal>
  | PromiseRejectedResult
  | PromiseSettledResult<TVal>
  | Settled<TVal>
  | SettledLeft
  | SettledRight<TVal>
  | TVal;
