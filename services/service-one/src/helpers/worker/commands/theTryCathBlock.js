'use strict';
export async function theTryCathBlock({ fnct, errMsg, errVal }, ...args) {
  try {
    return fnct(...args);
  } catch (error) {
    logError(error, `at: ${errMsg}`);
    return errVal;
  }
}
