import { IApply } from './IApply';
import { IMap } from './IMap';

/** IChain extends [[IMap]] */
export interface IChain<T> extends IMap<T>, IApply<T> {
  chain<R>(fn: (value: T) => IChain<R>): IChain<R>;
}
