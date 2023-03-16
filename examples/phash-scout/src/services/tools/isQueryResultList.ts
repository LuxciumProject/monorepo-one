import { QueryResultItem } from '../types';
import { isQueryResultItem } from './isQueryResultItem';

export function isQueryResultList(
  contender: unknown
): contender is Array<QueryResultItem> {
  return Array.isArray(contender) && contender.every(isQueryResultItem);
}
