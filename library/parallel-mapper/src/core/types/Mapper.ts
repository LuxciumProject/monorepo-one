export type Mapper<T, U> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => U;
