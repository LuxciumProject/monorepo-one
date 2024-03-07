export type Mapper<T = any, U = unknown> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => U;
