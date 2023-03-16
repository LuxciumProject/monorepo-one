export interface KeyMake {
  (keyName?: string | undefined | null): KeyMake;
  (keyName: string | undefined | null, idValue_0: null): string;
  (
    keyName: string | undefined | null,
    idValue_0: string,
    ...idValue_1: string[]
  ): string;
}

export function keyMake(keyName?: string | undefined | null): KeyMake;
export function keyMake(
  keyName: string | undefined | null,
  ...idValue: [string, ...string[]]
): string;
export function keyMake(
  keyName: string | undefined | null,
  ...idValue: [null]
): string;
export function keyMake(
  keyName?: string | undefined | null,
  ...idValue: any[]
): any {
  const key = keyName ? `${keyName}:` : ''; // .replace('::', ':');
  const jusID = idValue ? idValue.join(':') : null;
  const id = jusID ? `#${jusID}` : '';

  if (!key && !id) {
    return keyMake;
  }
  if (key && !id) {
    if (idValue === null || idValue[0] === null) {
      return `R:@${keyName}`.replace('::', ':') as string;
    }

    return (keyName_ = '', ...idValue_: [string, ...string[]]) => {
      const keyName__ = keyName_ ? `${keyName_}` : '';
      return keyMake(`${key}${keyName__}`, ...idValue_);
    };
  }
  return `R:${key}${id}`.replace(':#', '#').replace('::', ':') as string;
}

const stringKey: KeyMake = keyMake('KEY');
const listKey: KeyMake = keyMake('LIST');
const setKey: KeyMake = keyMake('SET');
const hashesKey: KeyMake = keyMake('HASH');
const pHashKey: KeyMake = keyMake('P_HASH');
const sortedKey: KeyMake = keyMake('SORTED');
const streamKey: KeyMake = keyMake('STREAM');
const geospatialKey: KeyMake = keyMake('GEOSPATIAL');
const hyperloglogKey: KeyMake = keyMake('HYPERLOGLOG');
const bitmapKey: KeyMake = keyMake('BITMAP');
const bitfieldKey: KeyMake = keyMake('BITFIELD');

export const makeRedisKeys = {
  stringKey,
  listKey,
  setKey,
  hashesKey,
  sortedKey,
  streamKey,
  geospatialKey,
  hyperloglogKey,
  bitmapKey,
  bitfieldKey,
  pHashKey,
};
