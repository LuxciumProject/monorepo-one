export type Mags = '' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';
export type HUnits = `${Mags}B`;
export type HSize = `${string}${Mags}B`;
