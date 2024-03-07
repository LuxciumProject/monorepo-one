import { QueryResults } from '../../types';

export function hasSameTitleInclude(title: string, queryResults: QueryResults) {
  return queryResults.some(i => i[0] === title);
}
