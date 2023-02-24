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
  folderRoots: { [folderName: string]: FolderConfig };
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
 * @param folderName The name of the folder to retrieve the path for.
 * @param config The configuration object.
 * @returns The full path to the folder on the computer, or undefined if the folder name is not found in the configuration object.
 */
export const getFolderPath = (
  folderName: string,
  config: Config,
  rootPath: string
): string | undefined => {
  const folderConfig = config.folderRoots[folderName];
  if (folderConfig) {
    return join(rootPath, folderConfig.path);
  } else {
    return undefined;
  }
};

// const configPath = '/run/media/luxcium/x250Mio/config.json'; // Replace with the actual path to your config file
// const rootPath = '/'; // Replace with the path to the root directory of the folders in the configuration object
// const config = getConfig(configPath);

// const dataFolderPath = getFolderPath('data', config, rootPath);
// if (dataFolderPath) {
//   console.log(`The full path to the data folder is: ${dataFolderPath}`);
// } else {
//   console.log(`The data folder was not found in the configuration file.`);
// }

export function getDataPath(
  configPath = '/run/media/luxcium/x250Mio/config.json',
  rootPath = '/'
): string {
  // const configPath = '/run/media/luxcium/x250Mio/config.json'; // Replace with the actual path to your config file
  // const rootPath = '/'; // Replace with the path to the root directory of the folders in the configuration object
  const config = getConfig(configPath);
  const folderPath = getFolderPath('data', config, rootPath);
  console.log(`folderPath: ${folderPath}`);
  return getFolderPath('data', config, rootPath) || '';
}
