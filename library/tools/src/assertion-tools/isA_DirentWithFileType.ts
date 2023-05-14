import type { DirentWithFileType } from '../types/main';

const S = 'string';
const B = 'boolean';

export function isA_DirentWithFileType(item: any): item is DirentWithFileType {
  return (
    typeof item.fileName === S &&
    typeof item.isBlockDevice === B &&
    typeof item.isCharacterDevice === B &&
    typeof item.isDirectory === B &&
    typeof item.isFIFO === B &&
    typeof item.isFile === B &&
    typeof item.isSocket === B &&
    typeof item.isSymbolicLink === B
  );
}
