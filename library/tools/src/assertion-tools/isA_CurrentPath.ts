import type { CurrentPath } from '../types/main';

const S = 'string';

export function isA_CurrentPath(item: any): item is CurrentPath {
  if (!item) return false; // Handle null or undefined inputs

  return (
    typeof item.type === S &&
    typeof item.fileName === S &&
    typeof item.dir === S &&
    typeof item.fullPath !== 'undefined'
  );
}
