import { Settled, SettledLeft, SettledRight } from '.';

// Iterable<PromiseLike<Settled<T>>>
// PromiseLike<Iterable<Settled<T>>>

// collection: Collection<T> | PromiseLike<Collection<T>>,

export type Collection<U> = Iterable<U | Settled<U> | PromiseSettledResult<U>>;

/*
Collection<T> | PromiseLike<Collection<T>> | Iterable<PromiseLike<Settled<T>>>

export type MyLongVersionCatchAllType =
| PromiseLike<T | SettledLeft | SettledRight<T>| PromiseFulfilledResult<T> | PromiseRejectedResult>
| Iterable<T | SettledLeft | SettledRight<T>| PromiseFulfilledResult<T> | PromiseRejectedResult>
| PromiseLike<Iterable<T | SettledLeft | SettledRight<T>| PromiseFulfilledResult<T> | PromiseRejectedResult>>;
| Iterable<PromiseLike<T | SettledLeft | SettledRight<T>| PromiseFulfilledResult<T> | PromiseRejectedResult>>;

Settled<T> PromiseSettledResult<T>
 */

type NamingIsNotAlwaysTheEasiestThingToDoInTheWorld<T> =
  | T
  | Settled<T>
  | PromiseSettledResult<T>;
type Alias<T> = NamingIsNotAlwaysTheEasiestThingToDoInTheWorld<T>;

type AliasOrPromiseAlias<T> = Alias<T> | PromiseLike<Alias<T>>;
export type MyLongVersionCatchAllType<T> =
  | Alias<T>
  | Iterable<AliasOrPromiseAlias<T>>
  | PromiseLike<Alias<T> | Iterable<AliasOrPromiseAlias<T>>>;

type TheOtherWayAround<A> = A | Iterable<A> | PromiseLike<A>;
type Level2<B> = TheOtherWayAround<TheOtherWayAround<B>>;
export type Level3<C> = Level2<C | Settled<C> | PromiseSettledResult<C>>;

export type MyLongVersionCatchAllType_Full<T> =
  | T
  | SettledLeft
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult
  | Iterable<
      | T
      | SettledLeft
      | SettledRight<T>
      | PromiseFulfilledResult<T>
      | PromiseRejectedResult
      | PromiseLike<
          | T
          | SettledLeft
          | SettledRight<T>
          | PromiseFulfilledResult<T>
          | PromiseRejectedResult
        >
    >
  | PromiseLike<
      | T
      | SettledLeft
      | SettledRight<T>
      | PromiseFulfilledResult<T>
      | PromiseRejectedResult
      | Iterable<
          | T
          | SettledLeft
          | SettledRight<T>
          | PromiseFulfilledResult<T>
          | PromiseRejectedResult
          | PromiseLike<
              | T
              | SettledLeft
              | SettledRight<T>
              | PromiseFulfilledResult<T>
              | PromiseRejectedResult
            >
        >
    >;
