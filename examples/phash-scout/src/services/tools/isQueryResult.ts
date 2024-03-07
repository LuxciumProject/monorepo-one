import { QueryResult } from '../types';

export function isQueryResult(contender: unknown): contender is QueryResult {
  if (Array.isArray(contender)) {
    return contender.every(item => {
      return (
        Array.isArray(item) &&
        item.length === 3 &&
        typeof item[0] === 'string' &&
        typeof item[1] === 'number' &&
        typeof item[2] === 'string'
      );
    });
  }

  return false;
}
