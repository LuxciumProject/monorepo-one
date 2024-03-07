'use strict';
import { redisQuery } from '../../../tools';
import { Rc } from '.';

export async function getRedisQueryResult(imgFileAbsPath, cachedPhash) {
  try {
    const RC = await Rc;
    const redisQueryResult = redisQuery(RC, 'key', imgFileAbsPath, cachedPhash);
    return redisQueryResult;
  } catch (error) {
    logError('error:', error);
  }
}
