'use strict';
import { logError, logHigh } from '../../../constants';
import { commands, Rc } from '.';
import { redisSetK } from './getCachedPhash';
import { getRedisQueryResult } from './getRedisQueryResult';
/**
 *
 * @param {string} imgFileAbsPath
 */
// HACK: -------------------------------------------------------------
const ingestOnly = true;
export async function redisPhashQuery(imgFileAbsPath) {
  try {
    const result = await commands.get_cached_phash(imgFileAbsPath);
    const { processed, value } = result;

    if (!ingestOnly || !processed) {
      const processedResult = getRedisQueryResult(imgFileAbsPath, value);
      const R = await Rc;
      redisSetK(R, imgFileAbsPath, value, true);
      return processedResult;
    }
  } catch (error) {
    logError(error);
    return [];
  }
  logHigh('already processed');
  return [];
}
