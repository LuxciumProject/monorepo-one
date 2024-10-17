import { BlockDeviceInfo } from './BlockDeviceInfo';
import { CharacterDeviceInfo } from './CharacterDeviceInfo';
import { FIFOInfo } from './FIFOInfo';
import { FileInfo } from './FileInfo';
import { FolderInfo } from './FolderInfo';
import { SocketInfo } from './SocketInfo';
import { SymbolicLinkInfo } from './SymbolicLinkInfo';
import { UnknownInfo } from './UnknownInfo';

/**
 * Mapping from item types to their corresponding info interfaces.
 */
export interface ItemTypeMap {
  file: FileInfo;
  folder: FolderInfo;
  blockDevice: BlockDeviceInfo;
  characterDevice: CharacterDeviceInfo;
  symbolicLink: SymbolicLinkInfo;
  fifo: FIFOInfo;
  socket: SocketInfo;
  unknown: UnknownInfo;
}
