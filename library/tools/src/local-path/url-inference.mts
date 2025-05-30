import { getLocalPath } from './getLocalPath.mjs';

interface GitHubConfig {
  domain: string;
  blob: string;
  protocol?: 'https://';
}

interface RawGitHubContentConfig {
  domain: string;
  protocol?: 'https://';
}

interface BaseConfig {
  username: string;
  repository: string;
  branchName: string;
  directoryPath: string;
  fileName: string;
  localBasePath: string;
}

interface Config extends BaseConfig {
  github: GitHubConfig;
  rawGithubContent: RawGitHubContentConfig;
  protocol: 'https://';
}

// Example configuration for a public GitHub repository
const configBlob = {
  username: 'LuxciumProject',
  repository: 'monorepo-one',
  branchName: 'principal',
  directoryPath: 'frontend/home',
  fileName: 'package.json',
  localBasePath: '/projects/monorepo-one',
  github: {
    domain: 'github.com',
    blob: 'blob',
  },
  rawGithubContent: {
    domain: 'raw.githubusercontent.com',
  },
  protocol: 'https://',
} as const;

const github = {
  domain: 'github.com',
  blob: 'blob',
};

const rawGithubContent = {
  domain: 'raw.githubusercontent.com',
};

const GitHubConfig = {
  github,
  rawGithubContent,
  protocol: 'https://',
};

function makeConfigBlob<
  Username extends string,
  Repository extends string,
  BranchName extends string,
  DirectoryPath extends string,
  FileName extends string,
  LocalBasePath extends string,
>(
  username: Username,
  repository: Repository,
  branchName: BranchName,
  directoryPath: DirectoryPath,
  fileName: FileName,
  localBasePath: LocalBasePath,
) {
  return {
    username: username as Username,
    repository: repository as Repository,
    branchName: branchName as BranchName,
    directoryPath: directoryPath as DirectoryPath,
    fileName: fileName as FileName,
    localBasePath: localBasePath as LocalBasePath,
    github,
    rawGithubContent,
    protocol: 'https://' as const,
  } as const;
}

export function createConfigFromBlob(config: BaseConfig) {
  const configBlob = makeConfigBlob<
    typeof config.username,
    typeof config.repository,
    typeof config.branchName,
    typeof config.directoryPath,
    typeof config.fileName,
    typeof config.localBasePath
  >(
    config.username,
    config.repository,
    config.branchName,
    config.directoryPath,
    config.fileName,
    config.localBasePath,
  );
  return { ...configBlob, ...GitHubConfig };
}
const configFromBlob = createConfigFromBlob(configBlob);
void configFromBlob;
export type GitHubBlobURL<
  Username extends string,
  Repository extends string,
  BranchName extends string,
  DirectoryPath extends string,
  FileName extends string,
> = `${typeof config.protocol}${typeof config.github.domain}/${Username}/${Repository}/${typeof config.github.blob}/${BranchName}/${DirectoryPath}/${FileName}`;

export type RawGitHubContentURL<
  Username extends string,
  Repository extends string,
  BranchName extends string,
  DirectoryPath extends string,
  FileName extends string,
> = `${typeof config.protocol}${typeof config.rawGithubContent.domain}/${Username}/${Repository}/${BranchName}/${DirectoryPath}/${FileName}`;

function getGitHubBlobURL(
  config: Config & typeof configBlob,
): `${typeof config.protocol}${typeof config.github.domain}/${typeof config.username}/${typeof config.repository}/${typeof config.github.blob}/${typeof config.branchName}/${typeof config.directoryPath}/${typeof config.fileName}` {
  return `${config.protocol}${config.github.domain}/${config.username}/${config.repository}/${config.github.blob}/${config.branchName}/${config.directoryPath}/${config.fileName}`;
}

function getRawGitHubContentURL(
  config: Config,
): `${typeof config.protocol}${typeof config.rawGithubContent.domain}/${typeof config.username}/${typeof config.repository}/${typeof config.branchName}/${typeof config.directoryPath}/${typeof config.fileName}` {
  return `${config.protocol}${config.rawGithubContent.domain}/${config.username}/${config.repository}/${config.branchName}/${config.directoryPath}/${config.fileName}`;
}

// <
// U extends string = string,
// R extends string = string,
// B extends string = string,
// D extends string = string,
// F extends string = string,
// >
// {username: Username,
// repository: Repository,
// branchName: BranchName,
// directoryPath: DirectoryPath,
// fileName: FileName}

const gitHubBlobURL = getGitHubBlobURL(configBlob);
const rawGitHubContentURL = getRawGitHubContentURL(configBlob);
const localPath = getLocalPath(configBlob);

console.log('gitHubBlobURL', gitHubBlobURL); // Output: GitHub Blob URL
console.log('rawGitHubContentURL', rawGitHubContentURL); // Output: Raw GitHub Content URL
console.log('localPath', localPath); // Output: Local Path

const config = makeConfigBlob(
  'LuxciumProject',
  'monorepo-one',
  'principal',
  'frontend/home',
  'package.json',
  '/projects/monorepo-one',
);
void config;
