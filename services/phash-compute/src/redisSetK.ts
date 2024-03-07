import { RedisClientType } from 'redis';

import { makePhashCacheKey } from './makePhashCacheKey';

export async function redisSetK(
  R: RedisClientType,
  imgFileAbsPath: string,
  value: string
) {
  const K = makePhashCacheKey(imgFileAbsPath);
  return R.SET(K, value).then((value: any) => value === 'OK');
}
