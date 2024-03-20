import { ExtractableBox } from './ExtractableBox';

// Utility type to extract the boxing structure
export type ExtractBoxStructure<T, Rx> =
  T extends ExtractableBox<infer U> ? ExtractableBox<U> : Rx;
