import { IUnbox } from './IUnbox';

export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;
