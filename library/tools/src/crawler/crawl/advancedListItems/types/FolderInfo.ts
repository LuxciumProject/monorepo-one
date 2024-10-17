import { BaseItemInfo } from './BaseItemInfo';

/**
 * Information specific to folders.
 */
export interface FolderInfo extends BaseItemInfo {
  type: 'folder';
  /** The size is always null for folders. */
  size: null;
  /** The extension is always null for folders. */
  extension: null;
}
