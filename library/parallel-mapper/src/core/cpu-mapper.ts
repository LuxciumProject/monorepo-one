import { cpus } from 'os';
import * as worker_threads from 'worker_threads';
import type { CPU_MapperRetunType /* , MapperArgs */, Mapper /* , MapperArgs */ } from './types';
import { processMapper } from './worker-thread-mapper-factories/parallel-mapping';

const cpuCount = (): number => cpus().length;

export interface ICpu_mapper {
  cpu_mapper<T, R>(
    mapperListOrObj: MapperArgs<T, R>
  ): {
    mapper: () => Promise<PromiseSettledResult<R>[]>;
    thread: () => void;
  };
}

export type MapperArgs<T, U> = {
  list: T[];
  mapFn: Mapper<T, U>;
  limit?: number | undefined;
};
export function default_Mapper<T, R>(mapperListOrObj: MapperArgs<T, R>): any;
export function default_Mapper<T, R>(mapperListOrObj: T[], mapFn: Mapper<T, R>, limit?: number): any;
export function default_Mapper<T, R>(
  mapperListOrObj: T[] | MapperArgs<T, R>,
  mapFn?: Mapper<T, R> | null,
  limit: number | null = 0
): any {
  //

  if (Array.isArray(mapperListOrObj)) {
    const returnValue: MapperArgs<T, R> = {
      list: mapperListOrObj || [],
      mapFn: mapFn || (x => x as any as R & T),
      limit: limit || 1,
    };
    return returnValue;
  }
  return mapperListOrObj;
}

// ~&-----------------------------------------------------------------&~
// ~#----- CPU_Mapper Function Declaration ---------------------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function CPU_Mapper(filename: string): {
  <T, R>(mapperListOrObj: MapperArgs<T, R>): CPU_MapperRetunType<R>;
  <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number): CPU_MapperRetunType<R>;
} {
  // ~#---------------------------------------------------------------#~
  // ~*----- CPU_Mapper ----------------------------------------------*~
  function cpu_mapper<T, R>(mapperListOrObj: MapperArgs<T, R>): CPU_MapperRetunType<R>;
  function cpu_mapper<T, R>(mapperListOrObj: T[], mapFn: Mapper<T, R>, limit?: number): CPU_MapperRetunType<R>;
  function cpu_mapper<T, R>(
    mapperListOrObj: T[] | MapperArgs<T, R>,
    mapFn?: Mapper<T, R> | null,
    limit?: number | null
  ): CPU_MapperRetunType<R> {
    const args = mapperArgs(mapperListOrObj, mapFn, limit);
    const [mapper, thread] = processMapper<T, R>({
      filename,
      workerThreads: worker_threads,
      list: args.list,
      mapFn: args.mapFn,
      limit: args.limit || cpuCount(),
    });

    return { mapper, thread };
  }
  return cpu_mapper;
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
// ~#----- processMapping Function Declaration -----------------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function processMapping(
  filename: string
): <T, R>(
  list: T[],
  mapFn: Mapper<T, R>,
  limit?: number | undefined
) => [() => Promise<PromiseSettledResult<R>[]>, () => void] {
  // ~#---------------------------------------------------------------#~
  // ~*----- processMapping ------------------------------------------*~
  return <T, R>(list: T[], mapFn: Mapper<T, R>, limit?: number | undefined) =>
    processMapper<T, R>({
      filename,
      workerThreads: worker_threads,
      list,
      mapFn,
      limit,
    });
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
// ~#----- processMapperFactory Function Declaration -----------------#~
/**
 * The path to the Worker's main script or module.
 * @arg string filename
 * @see https://nodejs.org/dist/latest/docs/api/worker_threads.html#worker_threads_new_worker_filename_options
 */
export function processMapperFactory<T, U>(
  mapFn: Mapper<T, U>
): (
  list: T[],
  limit?: number | undefined
) => (filename: string) => [() => Promise<PromiseSettledResult<U>[]>, () => void] {
  // ~#---------------------------------------------------------------#~
  // ~*----- processMapperFactory ------------------------------------*~
  return (list: T[], limit?: number): ((filename: string) => [() => Promise<PromiseSettledResult<U>[]>, () => void]) =>
    filename =>
      processMapper<T, U>({
        filename,
        workerThreads: worker_threads,
        list,
        mapFn,
        limit,
      });
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~
// ~#----- mapperArgs Function Declaration ---------------------------#~
function mapperArgs<T, R>(
  listOrObj: T[] | MapperArgs<T, R>,
  mapFn?: Mapper<T, R> | null,
  limit?: number | null
): MapperArgs<T, R> {
  // ~#---------------------------------------------------------------#~
  // ~*----- mapperArgs ----------------------------------------------*~
  let list: T[] = [];
  let mapFn_: Mapper<T, R>;
  let limit_: number | undefined = 0;
  if (!Array.isArray(listOrObj) && typeof listOrObj === 'object') {
    list = listOrObj.list;
    mapFn_ = listOrObj.mapFn;
    limit_ = listOrObj.limit;
    return { list, mapFn: mapFn_, limit: limit_ };
  }
  list = listOrObj;
  if (mapFn != null) return { list, mapFn, limit: limit ? limit : undefined };

  // When mapFn is null or undefined throw TypeError.
  const errMsg = 'Error: mapFn must be a function of type Mapper<A, B>';
  throw new TypeError(errMsg);
}
// ~*-----------------------------------------------------------------*~
// ~&-----------------------------------------------------------------&~

/*
list of 25, 50, 75 or 100
limit of 5
5 per worker or 10, 15, 20 ...

 */
