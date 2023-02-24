import { BoxedAsyncGenerator, generateFromGen } from '@luxcium/boxed-list';
import { getPhashCompute } from '@luxcium/phash-compute';
import { rConnect } from '@luxcium/redis-services';
import { getDataPath, scanDirsFrom } from '@luxcium/scan-dirs';
import { readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { boxImageFileWithStats } from './tools';
const configs = JSON.parse(
  readFileSync('/home/luxcium/projects/configs/mono-repo.jsonc').toString()
);

void (async function main() {
  //
  // -! Open the connection to the redis cache server
  const R = await rConnect(6383);
  //
  // -! Link the connection with the pHashCompute
  const phashCompute = getPhashCompute(R, false);

  const pathToFolder: string = getDataPath();
  configs['examples-phash-scout'].links.example;
  // -! Initialise the file scaner to scan each folders from the link provided
  const folders = scanDirsFrom(pathToFolder).addValidExt(['.jpg', '.png']);

  // -! Then set the valid files extensions to be used from the file scanner
  phashCompute;
  folders;
  BoxedAsyncGenerator;
  generateFromGen;
  boxImageFileWithStats;

  const results = [...folders.scan()].map(async (x, y) => {
    const result = getPhashCompute(
      R,
      false
    )({ compatibleImagefilePath: x, expected: { stats: stat(x) } });
    console.log(y, await result);
    return [result];
  });

  await Promise.allSettled(
    results.map(async (str, i) => {
      const shifted = await (await str).shift();
      await shifted?.expected.stats;
      return console.log('str :>> ', shifted, '\n', shifted?.expected.stats, i);
    })
  );
  process.exit(0);
})();

// generateFromGen(folders.scan).map(console.log); // map(str => console.log('str :>> ', str));
// console.log('BoxedAsyncGenerator:', BoxedAsyncGenerator);
// console.log('boxImageFileWithStats:', boxImageFileWithStats);
// console.log('phashCompute:', phashCompute);
// console.log('folders:', folders);
// // const none: any = null;

// const result = generateFromGen(folders.scan);
// console.log('result :>> ', result);
// result
//   .map(imagePath => phashCompute(boxImageFileWithStats(imagePath)))
//   .map(pHash => {
//     console.log('loging:', pHash);
//     void pHash;
//   });

// result.spark(); //.then(console.log);

// for await (const imagePath of folders) {
//   const item = await phashCompute(boxImageFileWithStats(imagePath));
//   console.log('item :>> ', item);
// }

// -! Use the pHashCompute on each filesPaths with valid extensions
// const computedResult: AsyncGenerator<
//   WithExpectedStats & ImageFileWithPHashString,
//   boolean,
//   unknown
// > = folders.map(imagePath => phashCompute(boxImageFileWithStats(imagePath)));

// console.log(
//   Object.getPrototypeOf(
//     Object.getPrototypeOf(async function* () {}.prototype)
//   )
// );
// console.log(Object.getPrototypeOf(async function* () {}.prototype));
// console.log(async function* () {}.prototype);
// result;

//   void looping;
// }
// for await (const looping of result.unboxAsyncGen()) {
//   console.log('looping!');
//   void looping;

// -! Spark the scanner (starting it) login the computed or cached
// for await (const looping of result.unboxAsyncGen()) {
//   console.log('looping!');
//   void looping;
// }
