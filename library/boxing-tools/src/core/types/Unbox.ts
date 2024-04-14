import { IUnbox } from './IUnbox';

/**
 * Represents the unboxed type of the provided type `U`.
 *
 * If `U` is an `IUnbox<infer Ux>`, then `Unbox<U>` is `Unbox<Ux>`.
 * Otherwise, `Unbox<U>` is `U`.
 *
 * @template U - The type to unbox.
 * @public
 */

export type Unbox<U> = U extends IUnbox<infer Ux> ? Unbox<Ux> : U;
