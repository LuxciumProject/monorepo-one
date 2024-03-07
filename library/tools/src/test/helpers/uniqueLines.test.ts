import {
  uniqueByKeepFirst,
  uniqueByKeepLast,
  uniqueLines,
} from '../../helpers';

describe('Sort unique objects.', () => {
  const data = [
    { a: 1, u: 1 },
    { a: 2, u: 2 },
    { a: 3, u: 3 },
    { a: 4, u: 1 },
    { a: 5, u: 2 },
    { a: 6, u: 3 },
  ];

  it('should have a function to uniqByKeepFirst.', () => {
    expect(uniqueByKeepFirst(data, it => it.u)).toStrictEqual([
      { a: 1, u: 1 },
      { a: 2, u: 2 },
      { a: 3, u: 3 },
    ]);
  });

  it('should have a function to uniqByKeepLast', () => {
    expect(uniqueByKeepLast(data, it => it.u)).toStrictEqual([
      { a: 4, u: 1 },
      { a: 5, u: 2 },
      { a: 6, u: 3 },
    ]);
  });
});

describe('Sort unique lines.', () => {
  const data2 = [
    'Unique data !!!',
    'Unique data ???',
    'Unique data ???',
    'Unique data ???',
    'Unique data ???',
  ];

  it('should have a function to uniqueLines.', () => {
    expect(uniqueLines(data2)).toStrictEqual([
      'Unique data !!!',
      'Unique data ???',
    ]);
  });
});

/*
// https://stackoverflow.com/a/9229821/10269298
by georg
Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
This is a human-readable summary of (and not a substitute for) the license. Disclaimer.


You are free to:

Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material

for any purpose, even commercially.

This license is acceptable for Free Cultural Works.

The licensor cannot revoke these freedoms as long as you follow the license terms.

Under the following terms:
Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

No additional restrictions — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
 */
