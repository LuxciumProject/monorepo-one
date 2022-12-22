import { Settled, SettledLeft, SettledRight } from './Settled';

/** @public */

export type Base<TBase> =
  | TBase
  | Settled<TBase>
  | PromiseSettledResult<TBase>
  | SettledRight<TBase>
  | PromiseFulfilledResult<TBase>
  | SettledLeft
  | PromiseRejectedResult;

/** @public */
export type Await<B> = PromiseLike<Base<B>>;

/** @public */
export type AwaitBase<B> = Base<B> | Await<B>;

/** @public */
export type Collection<B> = Iterable<Base<B>> | Iterable<Await<B>>;

/** @public */
export type AwaitCollection<B> = Collection<B> | PromiseLike<Collection<B>>;
