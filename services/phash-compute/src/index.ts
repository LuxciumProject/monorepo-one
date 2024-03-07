import { rConnect } from '@luxcium/redis-services';

export type { RedisClientType as PhashRedisClientType } from 'redis';
export { getBigStrPhashFromFile } from './getBigStrPHashFromFile';
export {
  getCachedPhashString_core as default,
  getCachedPhashString_core,
  getCachedPhashString_core as getPhashCompute,
} from './getCachedPhashString_core';
export * as types from './types';
export { rConnect };
