import { IUnbox } from "./IUnbox";

/**
 * Unbox type guard
 */
export type Unbox<T> = T extends IUnbox<infer U> ? U : T;
