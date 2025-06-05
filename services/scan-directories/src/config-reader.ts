import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The interface that describes a folder object in the configuration file.
 */
interface FolderConfig {
  /**
   * The relative path to the folder on the computer.
   */
  path: string;
  /**
   * Any additional metadata about the folder.
   */
  metadata?: any;
}

/**
 * The interface that describes the overall configuration object.
 */
interface Config {
  /**
   * A mapping of folder names to their corresponding folder objects.
   */
  folderRoots: { [pathAlias: string]: FolderConfig };
}

/**
 * Reads the configuration file and returns the configuration object.
 *
 * @param configPath The path to the configuration file.
 * @returns The configuration object.
 * @throws If the configuration file cannot be read or parsed.
 */
export const getConfig = (configPath: string): Config => {
  const configFileContent = readFileSync(configPath, 'utf-8');
  const config: Config = JSON.parse(configFileContent);
  return config;
};

/**
 * Retrieves the full path to a folder on the computer from the configuration object.
 *
 * @param pathAlias The name of the folder to retrieve the path for.
 * @param config The configuration object.
 * @returns The full path to the folder on the computer, or undefined if the folder name is not found in the configuration object.
 */
export const getFolderPath = (
  pathAlias: string,
  config: Config,
  rootPath: string
): string | undefined => {
  const folderConfig = config.folderRoots[pathAlias];
  if (folderConfig) {
    return join(rootPath, folderConfig.path);
  } else {
    return undefined;
  }
};

export function getDataPath(
  pathAlias = 'data',
  configPath = '/projects/configs/config.json',
  rootPath = '/'
): string {
  const config = getConfig(configPath);
  const folderPath = getFolderPath(pathAlias, config, rootPath);
  console.log(`folderPath: ${folderPath}`);
  return folderPath || '';
}
