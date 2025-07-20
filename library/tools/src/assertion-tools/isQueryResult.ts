import type { QueryResult } from '../types/main';

export function isQueryResult(contender: unknown): contender is QueryResult {
  if (Array.isArray(contender) && contender.length > 0) {
    return contender.every(item => {
      return (
        Array.isArray(item) &&
        3 === item.length &&
        'string' === typeof item[0] &&
        'number' === typeof item[1] &&
        'string' === typeof item[2]
      );
    });
  }

  return false;
}
