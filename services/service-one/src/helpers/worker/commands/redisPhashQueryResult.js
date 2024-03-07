'use strict';
import { logError } from '../../../constants';
import { commands } from '.';

const VERBOSA = false;
export async function redisPhashQueryResult(imgFileAbsPath) {
  try {
    const result = await commands.redis_phash_query(imgFileAbsPath);

    if (Array.isArray(result)) {
      VERBOSA && console.log(['CACHED']);
      return [];
    }

    if (result && typeof result.queryResult === 'function') {
      let queryResult = [...(await result.queryResult())];

      // if (queryResult.length > 1) {
      //   queryResult = queryResult
      //     .map(reduceQuerryResults)
      //     .sort((a, b) => a.diff - b.diff)
      //     .sort((a, b) => b.radius - a.radius);
      // }

      VERBOSA && queryResult.length > 1
        ? console.log({
            queryResult,
            length: queryResult.length,
          })
        : false && console.log(['SKIPPED']);
      return { ...result, queryResult };
    }
    return [];
  } catch (error) {
    logError(error);
    return [];
  }
}
