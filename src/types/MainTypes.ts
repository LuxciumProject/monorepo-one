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

/*
ok thanks, in any case without any exception the single most basic unit of data is the union type Base<TBase> but in the context of the core functions (the 5 tools of the bundle) this is not a collection, this is a single item, so if you have a collection of items it will not be relevant for the moment to think of it alone as we are thinking about the collection as a whole.

we can think of collections as iterables that can contain
Base<B> | Deferred<B>

which are like:
Iterable<Base<B>> | Iterable<Deferred<B>>

and as another concept we can think of this kind of union:
Iterable<Base<B>> | Iterable<Deferred<B>>
union with
Deferred<Iterable<Base<B>> | Iterable<Deferred<B>>>

Using 'Aggregation' for the moment to illustrate the concept:
(Aggregation is a temporary placeholder used only to represent or replace the word Collection temporary)

We should have:
Aggregation<Base<B>> | Aggregation<Deferred<B>>
and we also could have:
Deferred<Aggregation<Base<B>> | Aggregation<Deferred<B>>>

this can be a single item or it can be a collection of many of this single item, then you can never have the single item  so for the moment it means that we can have collections that hold either Base<B> | Deferred<B> but not both this is valid (Iterable<Base<B>> | Iterable<Deferred<B>>) but this is not (Iterable<Base<B> | Deferred<B>>) and you can also have as another concept the union of Iterable<Base<B>> | Iterable<Deferred<B>> | Deferred<Iterable<Base<B>> | Iterable<Deferred<B>>> can you summarise what so-called shapes exist so far and/or if you know of any so-clled shapes that are irrelevant, impossible or prohibited (in the context of the collections or iterables) so far.


 */

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
