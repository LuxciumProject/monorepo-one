export type CPU_MapperRetunType<R> = {
  mapper: () => Promise<PromiseSettledResult<R>[]>;
  thread: () => void;
};
