import { Settled, SettledLeft, SettledRight } from '.';

export type Base<TBase> =
  | TBase
  | Settled<TBase>
  | PromiseSettledResult<TBase>
  | SettledRight<TBase>
  | PromiseFulfilledResult<TBase>
  | SettledLeft
  | PromiseRejectedResult;
