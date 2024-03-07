// import { rConnect } from '../../../tools/redis';

// export const Rc = rConnect(null, REDIS_DB_NUMBER, null);
// export async function allInOne(imgFileAbsPath) {
//   const R = await Rc;

//   const returnedValue = await getK(R, imgFileAbsPath);
//   if (returnedValue) {
//     return getBigstr(returnedValue);
//   }

//   return getBigstr(
//     await commands.bigstr_phash_from_file(imgFileAbsPath),
//     false
//   );
// }

// function getK(R, imgFileAbsPath) {
//   const K = cachedPhash_K(imgFileAbsPath);
//   return R.GET(K);
// }

// function cachedPhash_K(imgFileAbsPath) {
//   return `'cachedPhash:${imgFileAbsPath}'`;
// }

// function getBigstr(bigstr) {
//   if (bigstr.includes(':')) {
//     const [processed, value] = bigstr.split(':');
//     return setBigstr(value, processed);
//   }
//   return setBigstr(bigstr, false);
// }
// function setBigstr(value, processed) {
//   return {
//     processed,
//     value,
//     toString() {
//       return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
//     },
//   };
// }

// export function setCachedPhash(R, imgFileAbsPath, value, processed) {
//   const K = cachedPhash_K(imgFileAbsPath);

//   const bigstr = setBigstr(value, processed);
//   SET(R, K, bigstr.toString());
//   return bigstr;
// }
export {};
