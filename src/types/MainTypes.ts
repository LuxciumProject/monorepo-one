// Collection<Base>

import { Base } from './Base';

/** @public */
export type Collection<B> = Iterable<Base<B>>;
// Await<Base>

/** @public */
export type Await<B> = PromiseLike<Base<B>>;
// CollectionOfAwait<Base>

/** @public */
export type CollectionOfAwait<B> = Collection<Await<B>>;

// AwaitAndBase<Base>
/** @public */
export type AwaitAndBase<B> = Base<B> | PromiseLike<Base<B>>;

// type Await__<PType> = PromiseLike<PType> | Promise<PType>;
// type CollectionBase<CType> = Iterable<CType> | Array<CType>;
// export type AwaitTVal<TVal> = TVal | Await__<TVal>;
// export type AwaitBase_<B> = AwaitTVal<Base<B>>;
// export type Collection__<B> = CollectionBase<Base<B>>;
// export type AwaitCollectionBase<B> = AwaitTVal<CollectionBase<Base<B>>>;
// export type CollectionAwaitBase<B> = CollectionBase<AwaitTVal<Base<B>>>;
// export type AwaitCollectionAwaitBase<B> = AwaitTVal<
//   CollectionBase<AwaitTVal<Base<B>>>
// >;
