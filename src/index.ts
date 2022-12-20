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
import * as constants from './constants';
import * as functions from './functions';
import * as helpers from './helpers';
import type {
  Await,
  AwaitCollection,
  AwaitedMappingFn,
  Base,
  Collection,
  ErrLookupFn,
  GenerateMappingAsyncFn,
  GenerateMappingFn,
  LookupFn,
  ParalellMappingFn,
  SerialMappingFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  TransformStep,
  ValidateFn,
} from './types';

export { awaitedMapping } from './functions/awaitedMapping';
export { generateMapping } from './functions/generateMapping';
export { generateMappingAsync } from './functions/generateMappingAsync';
export { paralellMapping } from './functions/paralellMapping';
export { serialMapping } from './functions/serialMapping';
export { constants, helpers, functions };
export type { Collection, Await, AwaitCollection };
export type { Base, Settled, SettledLeft, SettledRight, TransformStep };
export type { ErrLookupFn, LookupFn, TransformFn, ValidateFn };
export type {
  AwaitedMappingFn,
  GenerateMappingAsyncFn,
  GenerateMappingFn,
  ParalellMappingFn,
  SerialMappingFn,
};
