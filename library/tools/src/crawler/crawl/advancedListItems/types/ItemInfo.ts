import { BlockDeviceInfo } from './BlockDeviceInfo';
import { CharacterDeviceInfo } from './CharacterDeviceInfo';
import { FIFOInfo } from './FIFOInfo';
import { FileInfo } from './FileInfo';
import { FolderInfo } from './FolderInfo';
import { SocketInfo } from './SocketInfo';
import { SymbolicLinkInfo } from './SymbolicLinkInfo';
import { UnknownInfo } from './UnknownInfo';

/**
 * Union type representing all possible item info types.
 */
export type ItemInfo =
  | FileInfo
  | FolderInfo
  | BlockDeviceInfo
  | CharacterDeviceInfo
  | SymbolicLinkInfo
  | FIFOInfo
  | SocketInfo
  | UnknownInfo;
