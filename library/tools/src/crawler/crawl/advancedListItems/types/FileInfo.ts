import { BaseItemInfo } from './BaseItemInfo';

/**
 * Information specific to files.
 */
export interface FileInfo extends BaseItemInfo {
  type: 'file';
  /** The size of the file in bytes. */
  size: number;
  /** The extension of the file, undefined if none. */
  extension: string | undefined;
}
