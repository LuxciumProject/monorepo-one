import { phSetKey, phTitleKey } from '../keys';
import { zaddPhash } from './zaddPhash';

const PH_SET_KEY = 'SADD' as const;
const PH_SET_CARD = 'SCARD' as const;
const IMG_SCOUT_ADD = 'IMGSCOUT.ADD' as const;
const SET = 'SET' as const;

export async function addPhash(
  redis: any,
  key: string,
  pHash: string,
  title: string
): Promise<number> {
  const result = await Promise.all([
    redis.sendCommand([PH_SET_KEY, phSetKey(pHash), title]),
    redis.sendCommand([PH_SET_CARD, phSetKey(pHash)]),
    redis.sendCommand([IMG_SCOUT_ADD, key, pHash, title]),
  ]);

  await redis.sendCommand([SET, phTitleKey(title), String(result[2])]);

  const cardinality = Number(result[1]);
  if (cardinality > 1) {
    await zaddPhash(cardinality, pHash, redis);
  }

  return result[2];
}
