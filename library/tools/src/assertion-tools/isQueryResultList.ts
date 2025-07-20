import type { QueryResultItem } from '../types/main';
import { isQueryResultItem } from './isQueryResultItem';

export function isQueryResultList(
  contender: unknown
): contender is QueryResultItem[] {
  return (
    Array.isArray(contender) &&
    contender.length > 0 &&
    contender.every(isQueryResultItem)
  );
}
