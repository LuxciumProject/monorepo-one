/**
 * A library for mapping tools.
 *
 * @remarks
 * The `@luxcium/mapping-tools` library defines 5 core functions used to map on iterables with diferent outcomes in mind
 * {@link awaitedMapping}, {@link generateMappingAsync}, {@link generateMapping},
 * {@link paralellMapping} and {@link serialMapping}
 *
 * @packageDocumentation
 */
import * as core from './core';

import * as constants from './constants';
import * as helpers from './helpers';

export type {
  ErrLookupFn,
  IMappable,
  LookupFn,
  Mapper,
  MapperOptions,
  OnlySideEffect,
  Settled,
  SettledIso,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn
} from './types';
export { constants, helpers, core };

/**  @public */
export const awaitedMapping = core.awaitedMapping_α;
/**  @public */
export const generateMapping = core.generateMapping_ς;
/**  @public */
export const generateMappingAsync = core.generateMappingAsync_α;
/**  @public */
export const paralellMapping = core.paralellMapping_ς;
/**  @public */
export const serialMapping = core.serialMapping_α;
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
