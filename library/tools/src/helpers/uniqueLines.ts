// Attribution-ShareAlike 4.0 International
export function uniqueByKeepFirst<U extends Object>(
  list: U[],
  byKey: (arg0: U) => U | U[keyof U]
) {
  const seen = new Set();
  return list.filter(item => {
    const k = byKey(item);
    return seen.has(k) ? false : seen.add(k);
  });
}

export function uniqueByKeepLast<U>(
  list: U[],
  byKey: (arg0: U) => U | U[keyof U]
) {
  return [...new Map(list.map(x => [byKey(x), x])).values()];
}
export const uniqueLines = <U>(list: U[]) =>
  uniqueByKeepLast(list, (it: U) => it);

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
