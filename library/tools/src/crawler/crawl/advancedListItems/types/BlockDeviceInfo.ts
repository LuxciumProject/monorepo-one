import { BaseItemInfo } from './BaseItemInfo';

/**
 * Information specific to block devices.
 */
export interface BlockDeviceInfo extends BaseItemInfo {
  type: 'blockDevice';
}
