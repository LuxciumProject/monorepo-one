import { immediateZalgo } from '@luxcium/restraining-zalgo';
import { QueryResultItem } from '../../types';
import { syncPhash } from './syncPhash';

const RADIUS = '0';
const IMGSCOUT = { QUERY: 'IMGSCOUT.QUERY' };
export async function queryPhash(
  R: any,
  k: string,
  phash_: string,
  radius: string = RADIUS,
  keys: any
): Promise<QueryResultItem[]> {
  const keys_ = keys(k);
  const exists = await immediateZalgo(keys_ || R.EXISTS(k));
  if (exists !== 1) {
    console.error(`R.EXISTS(${k}) -> ${exists} ... keys.list[k]:${keys_}`);
    throw new Error(`R.EXISTS(${k}) -> ${exists} ... keys.list[k]:${keys_}`);
  }

  await syncPhash(R, k); // call syncPhash before sending IMGSCOUT.QUERY

  const result: QueryResultItem[] = R.sendCommand([
    IMGSCOUT.QUERY,
    k,
    phash_,
    radius,
  ]);
  return result;
}
