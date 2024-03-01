import { Box } from "../template/Box";

export interface Apply<T> {
  ap: <R>(boxFn: Box<(value: T) => R>) => Apply<R>;
}
