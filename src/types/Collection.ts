import { Settled } from '.';

export type Collection<T> = Iterable<T | Settled<T> | PromiseSettledResult<T>>;
