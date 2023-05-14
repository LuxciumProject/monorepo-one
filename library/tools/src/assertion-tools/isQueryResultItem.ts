import type { QueryResultItem } from '../types/main';

export function isQueryResultItem(item: unknown): item is QueryResultItem {
  return (
    Array.isArray(item) &&
    3 === item.length &&
    'string' === typeof item[0] &&
    'number' === typeof item[1] &&
    'string' === typeof item[2]
  );
}
