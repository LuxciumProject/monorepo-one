import { QueryResultItem } from '../../types';

export function shiftTitle(title: string, level = '-1500') {
  return (i: QueryResultItem) => {
    if (i[0] === title) {
      i[2] = level;
    }

    return i;
  };
}
