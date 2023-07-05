import { stat } from 'node:fs/promises';
import { ImageFilePathWithExpectedStats } from '../types/ImageFilePath';

export function boxImageFileWithStats(
  compatibleImagefilePath: string
): ImageFilePathWithExpectedStats {
  return {
    compatibleImagefilePath,
    expected: {
      stats: () => stat(compatibleImagefilePath),
    },
  };
}

// export function mixExpected<
//   A extends Object,
//   B extends Object,
//   T extends WithExpected<A>,
//   U extends WithExpected<B>
// >(
//   a: T,
//   b: U
// ): T &
//   U & {
//     expected: A & B;
//   } {
//   const expectedA = a.expected;
//   const expectedB = b.expected;

//   return { ...a, ...b, expected: { ...expectedA, ...expectedB } };
// }

// const dummyImageFileWithStats = boxImageFileWithStats('');
// const dummyImageWithExpected = {
//   dummy: 'value',
//   expected: { statDummy: (async () => 'Dummy await')() },
// };

// const dommyImageWithExpected = {
//   dommy: 'value',
//   expected: { statDommy: (async () => 'Dummy await')() },
// };
// dummyImageFileWithStats;
// dummyImageWithExpected;

// export const resultDummy = mixExpected(
//   dummyImageWithExpected,
//   dommyImageWithExpected
// );
// export const resultDummy2 = mixExpected(resultDummy, dummyImageFileWithStats);

// const foo1 = {
//   foo: 'machin',
//   expected: { bolo: (async () => 'await bolo')() },
// };

// const bar1 = {
//   bar: 'bidule',
//   expected: { toto: (async () => 'await toto')() },
// };

// export const resultDummy3 = mixExpected(foo1, bar1);
