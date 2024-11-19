// src/types/file-stats.ts
export type FileStats = {
  readonly size: number;
  readonly created: Date;
  readonly modified: Date;
  readonly accessed: Date;
};
