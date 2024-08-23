import { LocalPath } from './types/LocalPath.mjs';

export function getLocalPath<
  L extends string = string,
  D extends string = string,
  F extends string = string,
>(config: { localBasePath: L; directoryPath: D; fileName: F }): LocalPath<L, D, F> {
  return `${config.localBasePath}/${config.directoryPath}/${config.fileName}`;
}
