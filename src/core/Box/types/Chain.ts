import { Box } from "../Box";

export interface Chain<T> {
  chain: <R>(fn: (value: T) => Box<R>) => Chain<R>;
}
