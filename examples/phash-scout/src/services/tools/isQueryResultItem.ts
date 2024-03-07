import { QueryResultItem } from '../types';

export function isQueryResultItem(item: unknown): item is QueryResultItem {
  return (
    Array.isArray(item) &&
    item.length === 3 &&
    typeof item[0] === 'string' &&
    typeof item[1] === 'number' &&
    typeof item[2] === 'string'
  );
}
