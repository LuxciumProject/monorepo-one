import { Chain, NULL_SYMBOL } from '..';
import {
  BaseOrDeferred,
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '.';
/** @beta */
export interface IChain<B> {
  collection: Collection<B> | PromiseLike<Collection<B>>;
  // of<BType>(
  //   collection: Collection<BType> | PromiseLike<Collection<BType>>
  // ): Chain<BType>;
  serialMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R>;
  awaitedMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R>;
  parallelMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>>;
  generateMapping<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<Promise<Settled<R>>>;
  generator<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Promise<Generator<Promise<Settled<R>>, void, unknown>>;
  generateMappingAsync<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): Chain<R>;
  asyncGeneretor<R>(
    transformFn?: TransformFn<B, R> | null,
    lookupFn?: LookupFn<B, R> | null,
    validateFn?: ValidateFn<B, R> | null,
    errLookupFn?: ErrLookupFn | null
  ): AsyncGenerator<Settled<R>, void, unknown>;
  filterRight(): Promise<SettledRight<B>[]>;
  filterLeft(): Promise<SettledLeft[]>;
  extractFulfilledValues(): Promise<B[]>;
  extractSettledValues(): Promise<(B | typeof NULL_SYMBOL)[]>;
  get list(): Promise<BaseOrDeferred<B>[]>;
}
