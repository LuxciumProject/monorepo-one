import type { Collection } from './MainTypes';
import type {
  ErrLookupFn,
  LookupFn,
  TransformFn,
  ValidateFn,
} from './mapper-options';
import type { Settled } from './Settled';

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
export type GenerateMappingFn = Function &
  (<T, R>(
    collection: Collection<T>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => Generator<Promise<Settled<R>>, void, unknown>);

/** @alpha */
export type GenerateMappingAsyncFn = Function &
  (<R, T>(
    collection: Collection<T>,
    transformFn?: TransformFn<T, R> | null,
    lookupFn?: LookupFn<T, R> | null,
    validateFn?: ValidateFn<T, R> | null,
    errLookupFn?: ErrLookupFn | null
  ) => AsyncGenerator<Settled<R>, void, unknown>);

/*
ChatGPT
Each of the five main functions in "mapping-tools" - awaitedMapping, paralellMapping, serialMapping, generateMappingAsync, and generateMapping - can take as arguments one iterable (which we'll refer to as a "collection") and four delegate functions (for a total of five arguments). These delegate functions are the same for each main function and are used to transform, lookup, validate, and handle errors in the mapping process.

The five parameters for these functions are defined as follows:

collection: This is the iterable (collection) that the main function will operate on. It can be of type Collection<T> or PromiseLike<Collection<T>>, where T is the input type.
transformFn: This is an optional delegate function that takes an input of type T and returns a value of type R. It is used to transform each element in the collection as the main function iterates over it.
lookupFn: This is an optional delegate function that takes an input of type T and returns a value of type R. It is used to perform a lookup for each element in the collection as the main function iterates over it.
validateFn: This is an optional delegate function that takes an input of type T and returns a value of type R. It is used to validate each element in the collection as the main function iterates over it.
errLookupFn: This is an optional delegate function that is used to handle errors that may occur during the mapping process. It takes no input and returns a value of type R.


Sure, here is how you can describe the parameters for the main functions in your package:

Each of the main functions in mapping-tools (awaitedMapping, paralellMapping, serialMapping, generateMappingAsync, and generateMapping) takes five parameters:

collection: This is the iterable (or Collection) that you want to transform. It can be of type Collection<T> or PromiseLike<Collection<T>>, where T is the input type.

transformFn (optional): This is the delegate function that is used to transform each element in the collection. It should have the signature TransformFn<T, R>, where T is the input type and R is the return type.

lookupFn (optional): This is the delegate function that is used to perform a lookup on each element in the collection. It should have the signature LookupFn<T, R>, where T is the input type and R is the return type.

validateFn (optional): This is the delegate function that is used to validate each element in the collection. It should have the signature ValidateFn<T, R>, where T is the input type and R is the return type.

errLookupFn (optional): This is the delegate function that is used to perform a lookup on any errors that may occur during the transformation process. It should have the signature ErrLookupFn.

By passing these parameters to the main functions in mapping-tools, you can customize the way the transformations are performed on your collection.


*/

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
