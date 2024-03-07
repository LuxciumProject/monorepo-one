import { Mapper } from './Mapper';

export type MapperPromise<T, U> = Mapper<T, Promise<U>>;
