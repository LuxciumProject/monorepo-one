import { ReplaceInnerType } from './ReplaceInnerType';
import { Unbox } from './Unbox';

export interface IXMap<U> {
  xmap: <Rx>(fn: (value: Unbox<U> | U) => Rx) => IXMap<ReplaceInnerType<U, Rx>>;
}
