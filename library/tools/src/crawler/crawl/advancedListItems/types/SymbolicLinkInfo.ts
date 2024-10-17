import { BaseItemInfo } from './BaseItemInfo';

/**
 * Information specific to symbolic links.
 */
export interface SymbolicLinkInfo extends BaseItemInfo {
  type: 'symbolicLink';
}
