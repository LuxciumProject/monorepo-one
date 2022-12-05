/** @public */
/*

Mapper<T = any, U = unknown, A = T> = ;
= Mapper<T, Promise<U>, T | Settled<T>>;

 */
export interface TransformFn<T, U = unknown> {
  (
    value: T,
    index: number,
    array: readonly (T | PromiseSettledResult<T>)[]
  ): Promise<U>;
}
