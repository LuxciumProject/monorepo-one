import { FileExtension } from 'file-type';
import { ValidMimeType } from './ValidMimeType';

export type ImageFileTypeResult = {
  ext: FileExtension;
  mime: ValidMimeType;
};
