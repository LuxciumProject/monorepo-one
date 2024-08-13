import { getLocalPath } from './getLocalPath';

// For: /projects/monorepo-one/frontend/home/src/utils/main.ts
const localPath = getLocalPath({
  localBasePath: '/projects/monorepo-one',
  directoryPath: 'frontend/home',
  fileName: 'src/utils/main.ts',
});
console.log('localPath', localPath); // Output: Local Path
