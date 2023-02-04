/* istanbul ignore file */
/**
 * A library for mapping tools.
 *
 *
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * - {@link functions.awaitedMapping}
 * - {@link generateMappingAsync}
 * - {@link generateMapping}
 * - {@link functions.parallelMapping}
 * - {@link functions.serialMapping}
 *
 * @remarks
 * Each function takes a collection as its first argument which can
 * be any iterable and can take on of 4 optional life cycle hooks:
 * - {@link TransformFn}
 * - {@link LookupFn}
 * - {@link ValidateFn}
 * - {@link ErrLookupFn}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol | The Iterable Protocol}
 * @packageDocumentation
 */

import * as constants from './constants';
import {
  AwaitedMappingFn,
  Base,
  BaseOrDeferred,
  Collection,
  CollectionOfDeferred,
  Deferred,
  DeferredCollection,
  ErrLookupFn,
  GenerateMappingAsyncFn,
  GenerateMappingFn,
  IChain,
  LookupFn,
  NullSymbol,
  OnlySideEffect,
  ParallelMappingFn,
  SerialMappingFn,
  Settled,
  SettledArray,
  SettledLeft,
  SettledRight,
  SettledValue,
  SettledValues,
  TransformFn,
  TransformStep,
  ValidateFn,
} from './types';

export { Chain } from './classes/Chain';
export { awaitedMapping } from './functions/awaitedMapping';
export { generateMapping } from './functions/generateMapping';
export { generateMappingAsync } from './functions/generateMappingAsync';
export { parallelMapping } from './functions/parallelMapping';
export { serialMapping } from './functions/serialMapping';
export {
  hasTransformStep,
  isPromise,
  isPromiseFulfilledResult,
  isPromiseLike,
  isPromiseRejectedResult,
  isPromiseSettledResult,
  isSettled,
  isSettledLeft,
  isSettledRight,
} from './helpers/assertions';
export {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
  getTransformStep,
  toFulfilment,
} from './helpers/tools';
export type {
  AwaitedMappingFn,
  Base,
  BaseOrDeferred,
  Collection,
  CollectionOfDeferred,
  Deferred,
  DeferredCollection,
  GenerateMappingAsyncFn,
  GenerateMappingFn,
  IChain,
  NullSymbol,
  OnlySideEffect,
  ParallelMappingFn,
  SerialMappingFn,
  Settled,
  SettledArray,
  SettledLeft,
  SettledRight,
  SettledValue,
  SettledValues,
  TransformStep,
};
/**
 * @category Delegates Functions
 *
 * @group Delegates
 *
 */
export type { ErrLookupFn, LookupFn, TransformFn, ValidateFn };

/**
 * Constant `FULFILLED` is used in place of the string `'fulfilled'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const FULFILLED: typeof constants.FULFILLED = constants.FULFILLED;
// export const FULFILLED: 'fulfilled' = 'fulfilled' as const;

/**
 * Constant `REJECTED` is used in place of the string `'rejected'` to
 * ensure the type system will properly infer the "flag nature" of this
 * string rather than the more generic `string` type.
 * @public
 */
export const REJECTED: typeof constants.REJECTED = constants.REJECTED;
// export const REJECTED: 'rejected' = 'rejected' as const;

/**
 * Constant `NULL_SYMBOL` is a unique symbol that represents `null` or a union type that includes `null`.
 * @public
 */
export const NULL_SYMBOL: typeof constants.NULL_SYMBOL = constants.NULL_SYMBOL;
// export const NULL_SYMBOL: unique symbol = Symbol.for('NULL_SYMBOL');
