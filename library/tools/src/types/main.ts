export type QueryResultItem = [path: string, id: number, radius: string];
export type QueryResult = QueryResultItem[];

export enum FileType {
  Directory = 'Directory',
  File = 'File',
  BlockDevice = 'BlockDevice',
  CharacterDevice = 'CharacterDevice',
  FIFO = 'FIFO',
  Socket = 'Socket',
  SymbolicLink = 'SymbolicLink',
  Unknown = 'Unknown',
  Error = 'Error',
}
export type ValidPHash<T extends boolean> = T extends true
  ? IsValidPHash
  : IsNotValidPHash;
export type IsValidPHash = {
  pHash: string;
};
export type IsNotValidPHash = {
  pHash: null;
};

export type IsExcluded = {
  exclude: true;
};
export type NotExcluded = {
  exclude: false;
};

export type WithExclude = IsExcluded | NotExcluded;

export type Excluded<T extends false | true> = T extends true
  ? IsExcluded
  : NotExcluded;

export type ParsedWithTypeAndExcludeFlag = ParsedWithFlag & ParsedWithType;
export type ParsedWithType = MyParsedPath & WithType;
export type ParsedWithFlag = MyParsedPath & WithExcludeFlag;
export type CurrentPath = WithBaseName &
  WithDir &
  WithExclude &
  WithExt &
  WithExtname &
  WithFileExtname &
  WithFileName &
  WithFileType &
  WithFullPath;

export type WithRoot = {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;
};
export type WithDir = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithBaseName = {
  baseName: string;
};
export type WithFileName = {
  fileName: string;
};

/** @deprecated use {@link WithDir} instead */
export type WithPathToFile = {
  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;
};
export type WithFullPath = {
  fullPath: string;
};
export type WithFileExtname = {
  extname: string;
};

export type WithExtname = {
  extname: string;
};
export type WithExt = {
  ext: string;
};

export type WithExtention = WithExt & WithExtname;

export type WithFileType = {
  type: FileType;
};
export type WithType = {
  type: FileType;
};
export type WithPHash = IsNotValidPHash | IsValidPHash;

export type WithCount = {
  count: number;
};

export type WithIndex = {
  index: number;
};
export type WithExcludeFlag = {
  exclude: boolean;
};
export type MyParsedPath = WithBaseName &
  WithDir &
  WithExt &
  WithExtname &
  WithFileName &
  WithFullPath &
  WithRoot;

export interface ParsedPath {
  /**
   * The root of the path such as '/' or 'c:\'
   */
  root: string;

  /**
   * The full directory path such as '/home/user/dir' or 'c:\path\dir'
   */
  dir: string;

  /**
   * The file name including extension (if any) such as 'index.html'
   */
  base: string;

  /**
   * The file extension (if any) such as '.html'
   */
  ext: string;

  /**
   * The file name without extension (if any) such as 'index'
   */
  name: string;
}

export interface ParsedRoot {
  ParsedPath: { root: string };
}
export interface ParsedDir {
  ParsedPath: { dir: string };
}
export interface ParsedBase {
  ParsedPath: { base: string };
}
export interface ParsedExt {
  ParsedPath: { ext: string };
}
export interface ParsedName {
  ParsedPath: { name: string };
}

export interface BaseRoot {
  root: string;
}
export interface BasedDir {
  dir: string;
}
export interface BaseBase {
  base: string;
}
export interface BasedExt {
  ext: string;
}
export interface BaseName {
  name: string;
}

export type DirentWithFileType = {
  fileName: string;
  isBlockDevice: boolean;
  isCharacterDevice: boolean;
  isDirectory: boolean;
  isFIFO: boolean;
  isFile: boolean;
  isSocket: boolean;
  isSymbolicLink: boolean;
};
