import bigString from '@luxcium/bigintstring';
import { promises } from 'fs';
import sharpPhash from 'sharp-phash';

// This function takes a path to an image file and returns a Promise
// that resolves to a string. It can be used with await.
export async function getBigStrPhashFromFile(
  imgFilePath: string
): Promise<string> {
  // Read the image file into a Buffer.
  const thisImage = await tryCatch(
    [imgFilePath],
    promises.readFile,
    `Could not read file: ${imgFilePath}`
  );
  // Use sharp to compute the phash value for the image.
  const sharpPhashValue = await tryCatch(
    thisImage,
    sharpPhash,
    `Could not compute phash for file: ${imgFilePath}`
  );
  // Convert the phash value to a big string.
  const returnValue = await tryCatch(
    sharpPhashValue,
    bigString,
    `Could not convert phash to string for file: ${imgFilePath}`
  );
  // Return the big string.
  return returnValue;
}

type IsArray<T> = T extends (infer U)[] ? U[] : never;
async function tryCatch<
  F extends (value: IsArray<Parameters<F>[0]>) => ReturnType<F>
>(value: [Parameters<F>[0]], fn: F, message?: string): Promise<ReturnType<F>>;
async function tryCatch<F extends (...values: Parameters<F>) => ReturnType<F>>(
  values: Parameters<F>,
  fn: F,
  message?: string
): Promise<ReturnType<F>>;

async function tryCatch<F extends (value: Parameters<F>[0]) => ReturnType<F>>(
  value: Parameters<F>[0],
  fn: F,
  message?: string
): Promise<ReturnType<F>>;
async function tryCatch<F extends (...args: unknown[]) => any>(
  values: Parameters<F> | Parameters<F>[0],
  fn: F,
  message: string = ''
): Promise<ReturnType<typeof fn>> {
  // 1. Try to run the function
  try {
    // 2. If the function is successful, return the result
    const argsArray = Array.isArray(values) ? values : [values];
    return await fn(...argsArray);
  } catch (error: any) {
    // 3. If the function fails, throw a new error
    throw new Error(
      `Something bad happened!${message ? `\n${message}` : message},${
        error?.message ? `\n${error.message}` : ''
      }`
    );
  }
}
// export async function XtryCatch<
//   F extends (...values: Parameters<F>) => ReturnType<F>
// >(values: Parameters<F>, fn: F, message?: string): Promise<ReturnType<F>>;
// export async function XtryCatch<
//   F extends (value: Parameters<F>[0]) => ReturnType<F>
// >(value: Parameters<F>[0], fn: F, message?: string): Promise<ReturnType<F>>;
// export async function XtryCatch<F extends (...args: any[]) => any>(
//   values: Parameters<F> | Parameters<F>[0],
//   fn: F,
//   message: string = ''
// ): Promise<ReturnType<F>> {
//   // 1. Try to run the function
//   try {
//     // 2. If the function is successful, return the result
//     const argsArray = Array.isArray(values) ? values : [values];
//     return await fn(...argsArray);
//   } catch (error: any) {
//     // 3. If the function fails, throw a new error
//     throw new Error(
//       `Something bad happened!${message ? `\n${message}` : message},${
//         error?.message ? `\n${error.message}` : ''
//       }`
//     );
//   }
// }

// function dummy(
//   value: ['good', 'bad', 'neutral'],
//   oneMore?: 'good',
//   oneOptional?: 'neutral'
// ) {
//   const [good, bad, neutral] = value;
//   console.log('value', value);
//   console.log('good', good);
//   console.log('bad', bad);
//   console.log('neutral', neutral);
//   console.log('oneMore', oneMore);
//   console.log('oneOptional', oneOptional);
//   return [value, oneMore, oneOptional, good, bad];
// }

// const madeToFail = tryCatch(['good', 'bad', 'neutral'], dummy, '');

// console.log();
// madeToFail.then(value => console.log(value));

// async function tryCatch<F extends (...args: any[]) => any>(
//   value: Parameters<F>[0],
//   fn: F,
//   message: string
// ): Promise<ReturnType<F>> {
//   try {
//     return await fn(value);
//   } catch (error: any) {
//     throw new Error(`Something bad happened! \n${message}, \n${error.message}`);
//   }
// }
// export async function tryCatch_<
//   R = unknown,
//   F extends (...args: any[]) => R = any
// >(value: Parameters<F>[0], fn: F, message: string): Promise<R> {
//   // 1. Try to execute the function
//   try {
//     // 2. If successful, return the result
//     return await fn(value);
//   } catch (error: any) {
//     // 3. If not, throw a new error
//     throw new Error(`Something bad happened! \n${message}, \n${error.message}`);
//   }
// }

// the difference betwen the word versatile and polyvalent (in the larger sens) is that the first is used for things and the second for people (but can be used for things too)
