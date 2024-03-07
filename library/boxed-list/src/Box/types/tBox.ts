import { IApply, IBox, IChain, IMap, IUnbox } from '../../types';

export type tBox<T> = IUnbox<T> & IMap<T> & IApply<T> & IChain<T> & IBox<T>;
