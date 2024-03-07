import { makeRedisKeys } from '../redisKeyMake';

export const phSetKey = (pHash: string) => makeRedisKeys.setKey('pHs', pHash);
export const phTitleKey = (title: string) =>
  makeRedisKeys.setKey('pHs:ids:t', title);
export const pHsCardKey = () => makeRedisKeys.setKey('pHs')('cards', null);

export { makeRedisKeys };
