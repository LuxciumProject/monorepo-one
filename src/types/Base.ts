import { Settled, SettledLeft, SettledRight } from '.';

export type Base<T> =
  | T
  | Settled<T>
  | PromiseSettledResult<T>
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | SettledLeft
  | PromiseRejectedResult;

export type AwaitBase<T> = Promise<Base<T>>;
