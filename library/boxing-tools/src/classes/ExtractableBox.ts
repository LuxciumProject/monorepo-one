import { ExtractBoxStructure } from './ExtractBoxStructure';
import { ExtractInnermost } from './ExtractInnermost';
import { Unbox } from './types';

// Interface for boxes with extractable values
// interface ExtractableBox<T> {
//   xmap<Rx>(
//     fn: (value: ExtractInnermost<T>) => Rx
//   ): ExtractableBox<BoxStructure<T, Rx>>;
//   unbox(): Unbox<T>;
// }
// Recursive type alias for extractable boxes
export type ExtractableBox<T> = {
  xmap<Rx>(fn: (value: ExtractInnermost<T>) => Rx): ExtractBoxStructure<T, Rx>;
  unbox(): Unbox<T>;
};
