import { NULL_SYMBOL } from '../constants';
import { Settled, SettledLeft, SettledRight } from './Settled';

/**
 * @group Base Types
 * @public
 * */

export type Base<TVal> =
  | TVal
  | Settled<TVal>
  | PromiseSettledResult<TVal>
  | SettledRight<TVal>
  | PromiseFulfilledResult<TVal>
  | SettledLeft
  | PromiseRejectedResult;

/**
 * Alias for `Iterable<Base<B>>` or `Iterable<PromiseLike<Base<B>>>`
 * @group Base Types
 * @public
 */
export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

/**
 * Alias `PromiseLike<Base<B>>`
 * @public
 */
export type Deferred<B> = PromiseLike<Base<B>>;

/**
 * Alias for `Iterable<PromiseLike<Base<B>>>`
 * @public
 */
export type CollectionOfDeferred<B> = Iterable<Deferred<B>>;

/**
 * Alias for `Base<B>` or `PromiseLike<Base<B>>`
 * @public
 */
export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

/**
 * Alias for `Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>`
 * or `PromiseLike<Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>>`
 *
 * @public
 */
export type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;

/** @public */
// export type Deferred<B> = PromiseLike<Base<B>>;

/** @public */
// export type BaseOrDeferred<B> = Base<B> | Deferred<B>;

/** @public */
// export type CollectionOfDeferred<B> = Iterable<Deferred<B>>;

/** @public */
// export type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;

/** @public */
// export type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;

/** @public */
export type SettledArray<R> = Settled<R>[];

/** @public */
export type NullSymbol = typeof NULL_SYMBOL;

/** @public */
export type SettledValue<R> = R | NullSymbol;

/** @public */
export type SettledValues<R> = SettledValue<R>[];

/** @public */
export type OnlySideEffect = void | undefined;

export type Type1<B> = Base<B> | PromiseLike<Base<B>>;
export type Type1a<B> = Base<B>;
export type Type1b<B> = PromiseLike<Base<B>>;

export type Type2<B> = Iterable<Base<B>> | Iterable<PromiseLike<Base<B>>>;
export type Type2a<B> = Iterable<Base<B>>;
export type Type2b<B> = Iterable<PromiseLike<Base<B>>>;

export type Type3<B> =
  | PromiseLike<Iterable<Base<B>>>
  | PromiseLike<Iterable<PromiseLike<Base<B>>>>;
export type Type3a<B> = PromiseLike<Iterable<Base<B>>>;
export type Type3b<B> = PromiseLike<Iterable<PromiseLike<Base<B>>>>;

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
