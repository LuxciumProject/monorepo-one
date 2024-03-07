import { pHsCardKey, phSetKey } from '../keys';

export async function zaddPhash(
  cardinality: number,
  pHash: string,
  redis: any
): Promise<number> {
  const ZADD = 'ZADD';
  const KEY = pHsCardKey();
  const SCORE = String(cardinality || -1);
  const MEMBER = phSetKey(pHash);
  return Number(await redis.sendCommand([ZADD, KEY, SCORE, MEMBER]));
}
