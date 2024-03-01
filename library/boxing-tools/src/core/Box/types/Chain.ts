import { Box } from "../template/Box";

export interface Chain<T> {
  chain: <R>(fn: (value: T) => Box<R>) => Chain<R>;
}
