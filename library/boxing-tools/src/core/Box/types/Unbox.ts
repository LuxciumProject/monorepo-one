import { IUnbox } from './IUnbox';

/**
 * Conditional type to unbox a boxed value type.
 */
export type Unbox<T> = T extends IUnbox<infer U> ? U : T;
