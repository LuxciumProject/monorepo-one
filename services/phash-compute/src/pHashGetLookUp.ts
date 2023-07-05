import { RedisClientType } from 'redis';
import { makePhashCacheKey } from './makePhashCacheKey';

export async function pHashGetLookUp(
  R: RedisClientType,
  pathStr: string
): Promise<{
  pHashString: string | false;
  pHashMethod: string;
  cacheKey: string;
}> {
  // Make the Redis key for the pHash cache
  const K = makePhashCacheKey(pathStr);
  // Get the value from Redis
  return R.GET(K).then((lookUP: any) => ({
    // If the value is not null, return it as a string
    pHashString: lookUP !== null ? `${lookUP}` : false,
    pHashMethod: 'lookUp',
    // Return the cache key so we can delete it later
    cacheKey: K,
  }));
}
