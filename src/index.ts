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
/**
 * This is the doc comment for file1.ts
 *
 * Specify this is a module comment and rename it to my-module:
 * @module my-module
 */
/* istanbul ignore file */

import * as constants from './constants';
import * as functions from './functions';
import * as helpers from './helpers';
import * as assertionTools from './helpers/assertions';
import {
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
import * as tools from './helpers/tools';
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
/**
 * @experimental
 *
 * @group experimental
 *
 */
export { Chain } from './classes/chain';
export { awaitedMapping } from './functions/awaitedMapping';
export { generateMapping } from './functions/generateMapping';
export { generateMappingAsync } from './functions/generateMappingAsync';
export { parallelMapping } from './functions/parallelMapping';
export { serialMapping } from './functions/serialMapping';
/**
 * @group Helper Tools
 */
export {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
  getTransformStep,
  toFulfilment,
} from './helpers/tools';
/**
 * @experimental
 *
 * @group experimental
 *
 */
export type { IChain };
export { assertionTools, constants, functions, helpers,tools };
/** @group Assertion Tools */
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
};
// /**
//  * @group Helper Tools
//  */
// export {
//   extractFulfilledValues,
//   extractSettledValues,
//   filterLeft,
//   filterRight,
//   getTransformStep,
//   toFulfilment,
// };
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

/** @public */
export const FULFILLED: typeof constants.FULFILLED = constants.FULFILLED;
/** @public */
export const REJECTED: typeof constants.REJECTED = constants.REJECTED;
/** @public */
export const NULL_SYMBOL: typeof constants.NULL_SYMBOL = constants.NULL_SYMBOL;

// @alpha, @beta, /** @public */, or @internal
// export const assertions: typeof helpers.assertions = helpers.assertions;
// /** @public */
// export const tools: typeof helpers.tools = helpers.tools;
// export const { assertions, tools } = helpers;
/** @public */

/** @public */

// import * as helpers2 from './helpers';
// export default {
//   helpers,
//   constants,
//   functions,
//   ...helpers,
//   ...assertions,
//   ...tools,
//   ...constants,
//   ...functions,
// };

/** @public */
// export {
//   extractFulfilledValues,
//   extractSettledValues,
//   filterLeft,
//   filterRight,
//   getTransformStep,
// };
