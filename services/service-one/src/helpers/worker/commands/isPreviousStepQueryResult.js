'use strict';

export async function isPreviousStepQueryResult(previousStepResult) {
  try {
    if (Array.isArray(previousStepResult)) {
      if (previousStepResult.length > 0) {
        logWarn(
          'TypeError: previousStepResult is an array of length ' +
            previousStepResult.length,
          'at: 001 redis_phash_query_result([])↓'
        );
      } else {
        logWarn(
          'TypeError: previousStepResult is an empty array for ' +
            'messageId: ',
          'at: 001 redis_phash_query_result([])↓'
        );
      }
      return false;
    }
    if (
      previousStepResult &&
      typeof previousStepResult.queryResult === 'function'
    ) {
      return true;
    } else {
      logWarn(
        `TypeError: previousStepResult${
          !previousStepResult
            ? ' is ' + undefined
            : !previousStepResult.queryResult
            ? '.queryResult is undefined' + previousStepResult
            : typeof previousStepResult.queryResult !== 'function'
            ? '.queryResult is not a function'
            : ' is' + null + 'will return [](`never`)↓'
        }`,
        'at: 002 redis_phash_query_result([])↓'
      );
    }
    return false;
  } catch (error) {
    logError(error, 'isPreviousStepQueryResult');
  }
}
