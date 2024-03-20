import { ExtractableBox } from './ExtractableBox';

// Utility type to extract the innermost type
// Utility type to extract the innermost type
export type ExtractInnermost<T> =
  T extends ExtractableBox<infer U> ? ExtractInnermost<U> : T;
