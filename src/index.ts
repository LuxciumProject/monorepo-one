/**
 * A library for mapping tools.
 *
 *
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * {@link awaitedMapping}, {@link generateMappingAsync}, {@link generateMapping},
 * {@link paralellMapping} and {@link serialMapping}
 *
 * @remarks
 *
 *
 * @packageDocumentation
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

// export { awaitedMapping_α as awaitedMapping };

// export { converToIsometricSettledResult };
// export { isometricSettledResult };
// export { getFulfilledResults };
// export { listFulfilledResults };
// export { getRejectedResults };
// export { settledLengts };

// /** @internal */

// export const helpersTools = {
//   converToIsometricSettledResult,
//   isometricSettledResult,
//   getFulfilledResults,
//   listFulfilledResults,
//   getRejectedResults,
//   settledLengts,
// };
// /** @internal */

// export const constants = {
//   FULFILLED,
//   REJECTED,
// };

// /** @internal */

// export const mappingTools = {
//   helpersTools,
//   constants,
//   awaitedMapping_α,
//   generateMapping_ς,
//   generateMappingAsync_α,
//   paralellMapping_ς,
//   serialMapping_α,
// };

// /** @internal */
// export default mappingTools;
