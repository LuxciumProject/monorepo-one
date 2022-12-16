import type { Collection } from './MainTypes';
import type { Settled } from './Settled';
import type {
  ErrLookupFn,
  LookupFn,
  TransformFn,
  ValidateFn,
} from './mapper-options';

/** @alpha */
export type SerialMappingFn = Function &
  (<T, R>(
    collection: Collection<T> | PromiseLike<Collection<T>>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Promise<Settled<R>[]>);

/** @alpha */
export type AwaitedMappingFn = Function &
  (<T, R>(
    collection: Collection<T> | PromiseLike<Collection<T>>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Promise<Settled<R>[]>);

/** @alpha */
export type ParalellMappingFn = Function &
  (<T, R>(
    collection: Collection<T>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Promise<Settled<R>>[]);

/** @alpha */
export type GenerateMappingAsyncFn = Function &
  (<R, T>(
    collection: Collection<T>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => AsyncGenerator<Settled<R>, void, unknown>);

/** @alpha */
export type GenerateMappingFn = Function &
  (<T, R>(
    collection: Collection<T>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Generator<Promise<Settled<R>>, void, unknown>);
