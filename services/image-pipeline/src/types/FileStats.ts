// src/types/file-stats.ts
export interface FileStats {
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  accessedAt: Date;
  permissions?: {
    readable: boolean;
    writable: boolean;
  };
}
