import { IParallelMappingOptions } from './IParallelMappingOptions';

export interface IParallelMapping {
  <T, U>(parallelMappingOptions: IParallelMappingOptions<T, U>): [
    () => Promise<U[]>,
    () => void
  ];
}
