import { Settled, SettledLeft, SettledRight } from '.';

export type AwaitableTypes<T> =
  | PromiseLike<T>
  | PromiseLike<SettledRight<T>>
  | PromiseLike<PromiseFulfilledResult<T>>
  | PromiseLike<SettledLeft>
  | PromiseLike<PromiseRejectedResult>
  | PromiseLike<Iterable<SettledRight<T>>>
  | PromiseLike<Iterable<PromiseFulfilledResult<T>>>
  | PromiseLike<Iterable<SettledLeft>>
  | PromiseLike<Iterable<PromiseRejectedResult>>
  | PromiseLike<Iterable<T>>
  | PromiseLike<Iterable<PromiseLike<T>>>
  | PromiseLike<Iterable<PromiseLike<SettledRight<T>>>>
  | PromiseLike<Iterable<PromiseLike<PromiseFulfilledResult<T>>>>
  | PromiseLike<Iterable<PromiseLike<SettledLeft>>>
  | PromiseLike<Iterable<PromiseLike<PromiseRejectedResult>>>;

export type BaseType2<T> =
  | T
  | Settled<T>
  | PromiseSettledResult<T>
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | SettledLeft
  | PromiseRejectedResult
  | PromiseLike<T>
  | PromiseLike<SettledRight<T>>
  | PromiseLike<PromiseFulfilledResult<T>>
  | PromiseLike<SettledLeft>
  | PromiseLike<PromiseRejectedResult>;
export type BaseType<T> =
  | T
  | Settled<T>
  | PromiseSettledResult<T>
  | SettledRight<T>
  | PromiseFulfilledResult<T>
  | SettledLeft
  | PromiseRejectedResult;

export type CollectionType<T> = Iterable<BaseType<T>>;
export type AwaitIterablesTypes<T> = Iterable<PromiseLike<BaseType<T>>>;
export type AwaitableTypes_<T> = PromiseLike<
  BaseType<T> | CollectionType<T> | AwaitIterablesTypes<T>
>;

// | Iterable<T>
// | Iterable<SettledRight<T>>
// | Iterable<PromiseFulfilledResult<T>>
// | Iterable<SettledLeft>
// | Iterable<PromiseRejectedResult>;

// | Iterable<PromiseLike<T>>
// | Iterable<PromiseLike<SettledRight<T>>>
// | Iterable<PromiseLike<PromiseFulfilledResult<T>>>
// | Iterable<PromiseLike<SettledLeft>>
// | Iterable<PromiseLike<PromiseRejectedResult>>;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
