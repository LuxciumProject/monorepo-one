/**
 * A library for mapping tools.
 *
 *
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * - {@link awaitedMapping}
 * - {@link generateMappingAsync}
 * - {@link generateMapping}
 * - {@link paralellMapping}
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
import * as core from './core';

import * as constants from './constants';
import * as helpers from './helpers';

import type {
  ErrLookupFn,
  FulfilledResult,
  LookupFn,
  Mapper,
  RejectedResult,
  Settled,
  SettledIso,
  SettledLeft,
  SettledResult,
  SettledRight,
  TransformFn,
  ValidateFn,
} from './types';

export {
  awaitedMapping,
  generateMapping,
  generateMappingAsync,
  paralellMapping,
  serialMapping,
} from './core';
export type { ErrLookupFn, LookupFn, Mapper };
export type {
  Settled,
  SettledIso,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
  SettledResult,
  FulfilledResult,
  RejectedResult,
};
export { constants, helpers, core };
