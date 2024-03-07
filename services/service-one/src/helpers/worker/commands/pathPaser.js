'use strict';
import { parse } from 'node:path';

export function pathPaser(imgFileAbsPath) {
  const path = parse(imgFileAbsPath);
  return {
    pathInfos: {
      ...path,
      fullPath: imgFileAbsPath,
      extname: path.ext.toLowerCase(),
      baseName: path.base,
    },
  };
}
