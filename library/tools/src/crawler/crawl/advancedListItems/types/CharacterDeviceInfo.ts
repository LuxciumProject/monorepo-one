import { BaseItemInfo } from './BaseItemInfo';

/**
 * Information specific to character devices.
 */
export interface CharacterDeviceInfo extends BaseItemInfo {
  type: 'characterDevice';
}
