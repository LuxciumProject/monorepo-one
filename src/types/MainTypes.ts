import { NULL_SYMBOL } from '../constants';
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
export type Deferred<B> = PromiseLike<Base<B>>;

/** @public */
export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

/** @public */
export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

/** @public */
export type DeferredCollection<B> = Collection<B> | Deferred<Collection<B>>;

/** @public */
export type SettledArray<R> = Settled<R>[];

/** @public */
export type NullSymbol = typeof NULL_SYMBOL;

/** @public */
export type SettledValue<R> = R | NullSymbol;

/** @public */
export type SettledValues<R> = SettledValue<R>[];

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
