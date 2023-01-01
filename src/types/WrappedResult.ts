import { Settled } from '.';

export type WrappedResult<U> = <W>(wraper: W) => Settled<U>;

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
