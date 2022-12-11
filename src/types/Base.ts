import { Settled, SettledLeft, SettledRight } from '.';

type Await<PType> = PromiseLike<PType> | Promise<PType>;
type CollectionBase<CType> = Iterable<CType> | Array<CType>;
export type AwaitTVal<TVal> = TVal | Await<TVal>;
export type AwaitBase<B> = AwaitTVal<Base<B>>;
export type Collection<B> = CollectionBase<Base<B>>;
export type AwaitCollectionBase<B> = AwaitTVal<CollectionBase<Base<B>>>;
export type CollectionAwaitBase<B> = CollectionBase<AwaitTVal<Base<B>>>;
export type AwaitCollectionAwaitBase<B> = AwaitTVal<
  CollectionBase<AwaitTVal<Base<B>>>
>;

export type Base<TBase> =
  | TBase
  | Settled<TBase>
  | PromiseSettledResult<TBase>
  | SettledRight<TBase>
  | PromiseFulfilledResult<TBase>
  | SettledLeft
  | PromiseRejectedResult;
