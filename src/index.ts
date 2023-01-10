/**
 * A library for mapping tools.
 *
 *
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * - {@link awaitedMapping}
 * - {@link generateMappingAsync}
 * - {@link generateMapping}
 * - {@link parallelMapping}
 * - {@link serialMapping}
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

import * as constants from './constants';
import * as functions from './functions';
// import * as helpers from './helpers';
import * as assertionTools from './helpers/assertions';
// import * as tools from './helpers/tools';

export { Chain } from './classes/chain';
export { awaitedMapping } from './functions/awaitedMapping';
export { generateMapping } from './functions/generateMapping';
export { generateMappingAsync } from './functions/generateMappingAsync';
export { parallelMapping } from './functions/parallelMapping';
export { serialMapping } from './functions/serialMapping';
/** @public */
// export {
//   extractFulfilledValues,
//   extractSettledValues,
//   filterLeft,
//   filterRight,
//   getTransformStep,
// };
export { constants, functions, assertionTools };
export type {
  Collection,
  Deferred,
  DeferredCollection,
  BaseOrDeferred,
  NullSymbol,
  SettledArray,
  SettledValue,
  SettledValues,
};
export type {
  Base,
  Settled,
  SettledLeft,
  SettledRight,
  TransformStep,
  CollectionOfDeferred,
};
export type { ErrLookupFn, LookupFn, TransformFn, ValidateFn, OnlySideEffect };
export type {
  AwaitedMappingFn,
  GenerateMappingAsyncFn,
  GenerateMappingFn,
  ParallelMappingFn,
  SerialMappingFn,
};
/** @public */
import {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
  getTransformStep,
} from './helpers/tools';

import type {
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

// /** @public */
export const tools = {
  extractFulfilledValues,
  extractSettledValues,
  filterLeft,
  filterRight,
  getTransformStep,
};
// /** @public */
// export const assertions = {
//   isPromise,
//   isPromiseLike,
//   isPromiseFulfilledResult,
//   isPromiseRejectedResult,
//   isPromiseSettledResult,
//   hasTransformStep,
//   isSettled,
//   isSettledLeft,
//   isSettledRight,
// };
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
