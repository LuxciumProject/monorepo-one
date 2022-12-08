import { Settled, SettledLeft, SettledRight } from '.';

// Iterable<PromiseLike<Settled<T>>>
// PromiseLike<Iterable<Settled<T>>>

// collection: Collection<T> | PromiseLike<Collection<T>>,

/** @public */
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
export type Name_001<T> = T;
export type Name_002<T> = SettledRight<T>;
export type Name_003<T> = PromiseFulfilledResult<T>;
export type Name_004 = SettledLeft;
export type Name_005 = PromiseRejectedResult;
export type Name_011<T> = PromiseLike<T>;
export type Name_012<T> = PromiseLike<SettledRight<T>>;
export type Name_013<T> = PromiseLike<PromiseFulfilledResult<T>>;
export type Name_014 = PromiseLike<SettledLeft>;
export type Name_015 = PromiseLike<PromiseRejectedResult>;
export type Name_016<T> = Iterable<T>;
export type Name_017<T> = Iterable<SettledRight<T>>;
export type Name_018<T> = Iterable<PromiseFulfilledResult<T>>;
export type Name_019 = Iterable<SettledLeft>;
export type Name_020 = Iterable<PromiseRejectedResult>;
export type Name_021<T> = Iterable<PromiseLike<T>>;
export type Name_022<T> = Iterable<PromiseLike<SettledRight<T>>>;
export type Name_023<T> = Iterable<PromiseLike<PromiseFulfilledResult<T>>>;
export type Name_024 = Iterable<PromiseLike<SettledLeft>>;
export type Name_025 = Iterable<PromiseLike<PromiseRejectedResult>>;
export type Name_026<T> = PromiseLike<Iterable<T>>;
export type Name_027<T> = PromiseLike<Iterable<SettledRight<T>>>;
export type Name_028<T> = PromiseLike<Iterable<PromiseFulfilledResult<T>>>;
export type Name_029 = PromiseLike<Iterable<SettledLeft>>;
export type Name_030 = PromiseLike<Iterable<PromiseRejectedResult>>;
export type Name_031<T> = PromiseLike<Iterable<PromiseLike<T>>>;
export type Name_032<T> = PromiseLike<Iterable<PromiseLike<SettledRight<T>>>>;
export type Name_033<T> = PromiseLike<
  Iterable<PromiseLike<PromiseFulfilledResult<T>>>
>;
export type Name_034 = PromiseLike<Iterable<PromiseLike<SettledLeft>>>;
export type Name_035 = PromiseLike<
  Iterable<PromiseLike<PromiseRejectedResult>>
>;

/*
| T;
| SettledRight<T>;
| PromiseFulfilledResult<T>;
| SettledLeft;
| PromiseRejectedResult;
| PromiseLike<T>;
| PromiseLike<SettledRight<T>>;
| PromiseLike<PromiseFulfilledResult<T>>;
| PromiseLike<SettledLeft>;
| PromiseLike<PromiseRejectedResult>;
| Iterable<T>;
| Iterable<SettledRight<T>>;
| Iterable<PromiseFulfilledResult<T>>;
| Iterable<SettledLeft>;
| Iterable<PromiseRejectedResult>;
| Iterable<PromiseLike<T>>;
| Iterable<PromiseLike<SettledRight<T>>>;
| Iterable<PromiseLike<PromiseFulfilledResult<T>>>;
| Iterable<PromiseLike<SettledLeft>>;
| Iterable<PromiseLike<PromiseRejectedResult>>;
| PromiseLike<Iterable<T>>;
| PromiseLike<Iterable<SettledRight<T>>>;
| PromiseLike<Iterable<PromiseFulfilledResult<T>>>;
| PromiseLike<Iterable<SettledLeft>>;
| PromiseLike<Iterable<PromiseRejectedResult>>;
| PromiseLike<Iterable<PromiseLike<T>>>;
| PromiseLike<Iterable<PromiseLike<SettledRight<T>>>>;
| PromiseLike<Iterable<PromiseLike<PromiseFulfilledResult<T>>>>;
| PromiseLike<Iterable<PromiseLike<SettledLeft>>>;
| PromiseLike<Iterable<PromiseLike<PromiseRejectedResult>>>;
 */
