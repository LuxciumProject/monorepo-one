import { getDataPath } from './config-reader';
import { scanDirsFrom } from './ScanDirs';

const dataScenner = scanDirsFrom(getDataPath());
dataScenner
  .addValidExt('.jpg')
  .addValidExt('.png')
  .map(x => x);
void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  // let num = 0;
  for await (const x of dataScenner) {
    // num++;num,
    console.log(x);
  }
  return void 0;
})();
