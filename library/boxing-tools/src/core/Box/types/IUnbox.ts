import { Unbox } from "./Unbox";

export interface IUnbox<T> {
  unbox(): Unbox<T> | T;
}
