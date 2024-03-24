import { ValidMimeType } from './ValidMimeType';

export type GetMediaType = [
  fromBuffer: (file: Buffer) => Promise<ValidMimeType | ''>,
  fromPath: (file: string) => ValidMimeType | '',
];
