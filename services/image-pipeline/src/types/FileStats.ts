// src/types/file-stats.ts
/**
 * Represents file system statistics for a file.
 */
export interface FileStats {
  /** Size of the file in bytes */
  size: number;

  /** Creation date of the file */
  createdAt: Date;

  /** Last modification date of the file */
  modifiedAt: Date;

  /** Last access date of the file */
  accessedAt: Date;

  /** File permission details */
  permissions?: {
    /** Indicates if the file is readable */
    readable: boolean;
    /** Indicates if the file is writable */
    writable: boolean;
  };
}
