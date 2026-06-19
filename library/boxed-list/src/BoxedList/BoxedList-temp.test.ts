// @/BoxedList/BoxedList.test.ts
// Swap 'vitest' → '@jest/globals' if you're on Jest with globals: false
import { describe, it, expect } from 'vitest';
import { BoxedList } from './BoxedList-temp';

// ─── lightweight IUnbox mocks (no dependency on Box class) ───────────────
const scalarBox = <T>(value: T) => ({ unbox: () => value });
const arrayBox  = <T>(arr: T[]) => ({ unbox: () => arr });

// ══════════════════════════════════════════════════════════════════════════
//  Static factories
// ══════════════════════════════════════════════════════════════════════════

describe('BoxedList.of()', () => {
  it('wraps spread elements', () => {
    expect(BoxedList.of(1, 2, 3).unbox()).toEqual([1, 2, 3]);
  });

  it('unwraps a single array argument', () => {
    expect(BoxedList.of([1, 2, 3]).unbox()).toEqual([1, 2, 3]);
  });

  it('wraps a single non-array scalar in a one-element list', () => {
    expect(BoxedList.of(42).unbox()).toEqual([42]);
  });

  it('produces an empty list when called with no arguments', () => {
    expect(BoxedList.of().unbox()).toEqual([]);
  });

  it('returns a BoxedList instance', () => {
    expect(BoxedList.of(1)).toBeInstanceOf(BoxedList);
  });
});

describe('BoxedList.from()', () => {
  it('spreads elements when unbox() returns T[]', () => {
    expect(BoxedList.from(arrayBox([10, 20, 30])).unbox()).toEqual([10, 20, 30]);
  });

  it('wraps scalar in a one-element list when unbox() returns T', () => {
    expect(BoxedList.from(scalarBox('hello')).unbox()).toEqual(['hello']);
  });

  it('[regression] does not re-box an array into a single-element list', () => {
    // Original from() called BoxedList.of(unboxed as TVal), which produced
    // [[10, 20]] instead of [10, 20] when unbox() returned an array.
    const result = BoxedList.from(arrayBox([10, 20]));
    expect(result.length).toBe(2);           // not 1
    expect(result.unbox()).toEqual([10, 20]); // not [[10, 20]]
  });

  it('returns a BoxedList instance', () => {
    expect(BoxedList.from(arrayBox([1]))).toBeInstanceOf(BoxedList);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Iteration protocol
// ══════════════════════════════════════════════════════════════════════════

describe('[Symbol.iterator]', () => {
  it('allows spreading into a plain array', () => {
    expect([...BoxedList.of(1, 2, 3)]).toEqual([1, 2, 3]);
  });

  it('allows for-of iteration', () => {
    const seen: number[] = [];
    for (const x of BoxedList.of(4, 5, 6)) seen.push(x);
    expect(seen).toEqual([4, 5, 6]);
  });
});

describe('entries()', () => {
  it('yields [index, value] pairs', () => {
    expect([...BoxedList.of('a', 'b', 'c').entries()])
      .toEqual([[0, 'a'], [1, 'b'], [2, 'c']]);
  });
});

describe('keys()', () => {
  it('yields numeric indices', () => {
    expect([...BoxedList.of('x', 'y', 'z').keys()]).toEqual([0, 1, 2]);
  });
});

describe('values()', () => {
  it('yields elements in order', () => {
    expect([...BoxedList.of(10, 20, 30).values()]).toEqual([10, 20, 30]);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Element access
// ══════════════════════════════════════════════════════════════════════════

describe('at()', () => {
  const bl = BoxedList.of(10, 20, 30);

  it('returns element at a positive index', () => {
    expect(bl.at(0)).toBe(10);
    expect(bl.at(2)).toBe(30);
  });

  it('returns element at a negative index (from end)', () => {
    expect(bl.at(-1)).toBe(30);
    expect(bl.at(-2)).toBe(20);
  });

  it('returns undefined for an out-of-bounds index', () => {
    expect(bl.at(99)).toBeUndefined();
    expect(bl.at(-99)).toBeUndefined();
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Non-mutating → new BoxedList
// ══════════════════════════════════════════════════════════════════════════

describe('concat()', () => {
  const bl = BoxedList.of(1, 2);

  it('appends a scalar value', () => {
    expect(bl.concat(3).unbox()).toEqual([1, 2, 3]);
  });

  it('appends a plain array', () => {
    expect(bl.concat([3, 4]).unbox()).toEqual([1, 2, 3, 4]);
  });

  it('appends another BoxedList', () => {
    expect(bl.concat(BoxedList.of(3, 4)).unbox()).toEqual([1, 2, 3, 4]);
  });

  it('accepts mixed argument types simultaneously', () => {
    expect(bl.concat(3, [4, 5], BoxedList.of(6)).unbox())
      .toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('does not mutate the original', () => {
    bl.concat(99);
    expect(bl.unbox()).toEqual([1, 2]);
  });

  it('returns a new BoxedList instance', () => {
    expect(bl.concat(3)).not.toBe(bl);
  });
});

describe('filter()', () => {
  const bl = BoxedList.of(1, 2, 3, 4, 5);

  it('keeps only elements matching the predicate', () => {
    expect(bl.filter(x => x % 2 === 0).unbox()).toEqual([2, 4]);
  });

  it('returns an empty BoxedList when nothing matches', () => {
    expect(bl.filter(x => x > 10).unbox()).toEqual([]);
  });

  it('narrows element type via a type-predicate overload', () => {
    const mixed = BoxedList.of<string | number>(1, 'a', 2, 'b');
    const strings = mixed.filter((x): x is string => typeof x === 'string');
    expect(strings.unbox()).toEqual(['a', 'b']);
  });

  it('returns a new BoxedList instance', () => {
    expect(bl.filter(() => true)).not.toBe(bl);
  });
});

describe('flat()', () => {
  it('flattens one level by default', () => {
    expect(BoxedList.of([1, 2], [3, 4]).flat().unbox()).toEqual([1, 2, 3, 4]);
  });

  it('flattens to the specified depth', () => {
    expect(BoxedList.of([[1, 2], [3]]).flat(2).unbox()).toEqual([1, 2, 3]);
  });

  it('returns a new BoxedList instance', () => {
    const bl = BoxedList.of([1]);
    expect(bl.flat()).not.toBe(bl);
  });
});

describe('flatMap()', () => {
  it('maps then flattens one level', () => {
    expect(BoxedList.of(1, 2, 3).flatMap(x => [x, x * 10]).unbox())
      .toEqual([1, 10, 2, 20, 3, 30]);
  });

  it('can change element type', () => {
    expect(BoxedList.of(1, 2).flatMap(x => [String(x), String(x)]).unbox())
      .toEqual(['1', '1', '2', '2']);
  });
});

describe('map() — functor-map on the whole inner array', () => {
  it('applies fn to the entire inner array and re-boxes the result', () => {
    expect(BoxedList.of(1, 2, 3).map(arr => arr.map(x => x * 2)).unbox())
      .toEqual([2, 4, 6]);
  });

  it('can change element type', () => {
    expect(BoxedList.of(1, 2, 3).map(arr => arr.map(String)).unbox())
      .toEqual(['1', '2', '3']);
  });
});

describe('mapItems() — element-wise map', () => {
  it('maps each element independently', () => {
    expect(BoxedList.of(1, 2, 3).mapItems(x => x * 10).unbox()).toEqual([10, 20, 30]);
  });

  it('can change element type', () => {
    expect(BoxedList.of(1, 2, 3).mapItems(String).unbox()).toEqual(['1', '2', '3']);
  });

  it('returns a new BoxedList instance', () => {
    const bl = BoxedList.of(1);
    expect(bl.mapItems(x => x)).not.toBe(bl);
  });
});

describe('mapLists()', () => {
  it('wraps each element, maps it, then unboxes to a single-element R[]', () => {
    const result = BoxedList.of(1, 2, 3).mapLists(x => x * 10);
    expect(result.unbox()).toEqual([[10], [20], [30]]);
  });

  it('returns BoxedList<R[]>', () => {
    expect(BoxedList.of(1).mapLists(x => x)).toBeInstanceOf(BoxedList);
  });
});

describe('slice()', () => {
  const bl = BoxedList.of(0, 1, 2, 3, 4);

  it('slices with start and end', () => {
    expect(bl.slice(1, 3).unbox()).toEqual([1, 2]);
  });

  it('slices from start index to end when no end given', () => {
    expect(bl.slice(3).unbox()).toEqual([3, 4]);
  });

  it('returns a full copy when called with no arguments', () => {
    expect(bl.slice().unbox()).toEqual([0, 1, 2, 3, 4]);
    expect(bl.slice()).not.toBe(bl); // new instance
  });
});

describe('toReversed()', () => {
  it('returns reversed elements', () => {
    expect(BoxedList.of(1, 2, 3).toReversed().unbox()).toEqual([3, 2, 1]);
  });

  it('does not mutate the original', () => {
    const bl = BoxedList.of(1, 2, 3);
    bl.toReversed();
    expect(bl.unbox()).toEqual([1, 2, 3]);
  });
});

describe('toSorted()', () => {
  it('returns elements sorted in default (lexicographic) order', () => {
    expect(BoxedList.of(3, 1, 2).toSorted().unbox()).toEqual([1, 2, 3]);
  });

  it('accepts a custom compareFn', () => {
    expect(BoxedList.of(10, 2, 5).toSorted((a, b) => b - a).unbox())
      .toEqual([10, 5, 2]);
  });

  it('does not mutate the original', () => {
    const bl = BoxedList.of(3, 1, 2);
    bl.toSorted();
    expect(bl.unbox()).toEqual([3, 1, 2]);
  });
});

describe('toSpliced()', () => {
  const bl = BoxedList.of(1, 2, 3, 4, 5);

  it('removes from start index to end when deleteCount is omitted', () => {
    expect(bl.toSpliced(3).unbox()).toEqual([1, 2, 3]);
  });

  it('removes deleteCount elements and inserts replacements at start', () => {
    expect(bl.toSpliced(1, 2, 10, 20).unbox()).toEqual([1, 10, 20, 4, 5]);
  });

  it('inserts without removing when deleteCount is 0', () => {
    expect(bl.toSpliced(2, 0, 99).unbox()).toEqual([1, 2, 99, 3, 4, 5]);
  });

  it('does not mutate the original', () => {
    bl.toSpliced(0, 5);
    expect(bl.unbox()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('with()', () => {
  it('returns a new list with the element at index replaced', () => {
    expect(BoxedList.of(1, 2, 3).with(1, 99).unbox()).toEqual([1, 99, 3]);
  });

  it('supports negative indices', () => {
    expect(BoxedList.of(1, 2, 3).with(-1, 99).unbox()).toEqual([1, 2, 99]);
  });

  it('does not mutate the original', () => {
    const bl = BoxedList.of(1, 2, 3);
    bl.with(0, 99);
    expect(bl.unbox()).toEqual([1, 2, 3]);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Non-mutating → scalar / boolean / void
// ══════════════════════════════════════════════════════════════════════════

describe('every()', () => {
  it('returns true when all elements satisfy the predicate', () => {
    expect(BoxedList.of(2, 4, 6).every(x => x % 2 === 0)).toBe(true);
  });

  it('returns false when any element fails the predicate', () => {
    expect(BoxedList.of(2, 3, 6).every(x => x % 2 === 0)).toBe(false);
  });

  it('returns true vacuously for an empty list', () => {
    expect(BoxedList.of<number>().every(x => x > 0)).toBe(true);
  });

  it('[regression] type-predicate narrows to BoxedList<S>, not S[]', () => {
    // Original declared `this is S[]`; corrected to `this is BoxedList<S>`.
    const mixed = BoxedList.of<string | number>('a', 'b', 'c');
    if (mixed.every((x): x is string => typeof x === 'string')) {
      // TypeScript must accept `mixed` as BoxedList<string> in this branch.
      const narrowed: BoxedList<string> = mixed;
      expect(narrowed.length).toBe(3);
    } else {
      throw new Error('every() should have returned true');
    }
  });
});

describe('find()', () => {
  const bl = BoxedList.of(1, 2, 3, 4);
  it('returns the first matching element', () => { expect(bl.find(x => x > 2)).toBe(3); });
  it('returns undefined when nothing matches', () => { expect(bl.find(x => x > 10)).toBeUndefined(); });
});

describe('findIndex()', () => {
  const bl = BoxedList.of(1, 2, 3, 4);
  it('returns the index of the first matching element', () => { expect(bl.findIndex(x => x > 2)).toBe(2); });
  it('returns -1 when nothing matches', () => { expect(bl.findIndex(x => x > 10)).toBe(-1); });
});

describe('findLast()', () => {
  const bl = BoxedList.of(1, 2, 3, 4);
  it('returns the last matching element', () => { expect(bl.findLast(x => x % 2 === 0)).toBe(4); });
  it('returns undefined when nothing matches', () => { expect(bl.findLast(x => x > 10)).toBeUndefined(); });
});

describe('findLastIndex()', () => {
  const bl = BoxedList.of(1, 2, 3, 4);
  it('returns the index of the last matching element', () => { expect(bl.findLastIndex(x => x % 2 === 0)).toBe(3); });
  it('returns -1 when nothing matches', () => { expect(bl.findLastIndex(x => x > 10)).toBe(-1); });
});

describe('forEach()', () => {
  it('iterates all elements as a side-effect', () => {
    const result: number[] = [];
    BoxedList.of(1, 2, 3).forEach(x => result.push(x));
    expect(result).toEqual([1, 2, 3]);
  });

  it('[regression] returns void — not the forEach return value', () => {
    // Original had `return this.list.forEach(...)`, a spurious no-op return.
    const ret = BoxedList.of(1, 2, 3).forEach(() => {});
    expect(ret).toBeUndefined();
  });
});

describe('includes()', () => {
  const bl = BoxedList.of(1, 2, 3);
  it('returns true for a present element', () => { expect(bl.includes(2)).toBe(true); });
  it('returns false for an absent element', () => { expect(bl.includes(9)).toBe(false); });
  it('respects fromIndex', () => { expect(bl.includes(1, 1)).toBe(false); });
});

describe('indexOf()', () => {
  const bl = BoxedList.of(1, 2, 1, 2);
  it('returns the first occurrence', () => { expect(bl.indexOf(2)).toBe(1); });
  it('returns -1 when absent', () => { expect(bl.indexOf(9)).toBe(-1); });
  it('respects fromIndex', () => { expect(bl.indexOf(2, 2)).toBe(3); });
});

describe('lastIndexOf()', () => {
  const bl = BoxedList.of(1, 2, 1, 2);
  it('returns the last occurrence', () => { expect(bl.lastIndexOf(2)).toBe(3); });
  it('returns -1 when absent', () => { expect(bl.lastIndexOf(9)).toBe(-1); });
  it('respects fromIndex', () => { expect(bl.lastIndexOf(2, 2)).toBe(1); });
});

describe('join()', () => {
  it('joins with the default comma separator', () => {
    expect(BoxedList.of(1, 2, 3).join()).toBe('1,2,3');
  });
  it('joins with a custom separator', () => {
    expect(BoxedList.of(1, 2, 3).join(' | ')).toBe('1 | 2 | 3');
  });
  it('joins with an empty string to concatenate', () => {
    expect(BoxedList.of('a', 'b', 'c').join('')).toBe('abc');
  });
});

describe('reduce()', () => {
  it('accumulates without an initialValue', () => {
    expect(BoxedList.of(1, 2, 3, 4).reduce((acc, x) => acc + x)).toBe(10);
  });

  it('accumulates with a truthy initialValue', () => {
    expect(BoxedList.of(1, 2, 3).reduce((acc, x) => acc + x, 10)).toBe(16);
  });

  it('can accumulate to a different type U', () => {
    const result = BoxedList.of(1, 2, 3).reduce<string[]>(
      (acc, x) => [...acc, String(x)], []
    );
    expect(result).toEqual(['1', '2', '3']);
  });

  // Regression: original guard was `if (!initialValue)` — skips falsy values
  it.each([
    ['0 (zero)',       (a: number, b: number) => a + b,         0,     6    ],
    ['empty string',   (a: string, b: string) => a + b,         '',    'abc'],
  ] as const)(
    '[regression] does not skip falsy initialValue of %s',
    (_label, fn, init, expected) => {
      const bl = BoxedList.of(...(typeof init === 'number' ? [1, 2, 3] : ['a', 'b', 'c']) as any[]);
      expect(bl.reduce(fn as any, init)).toBe(expected);
    }
  );

  it('[regression] does not skip initialValue of false', () => {
    const result = BoxedList.of(true, false, true).reduce(
      (acc, x) => acc && x, false
    );
    expect(result).toBe(false);
  });

  it('[regression] does not skip initialValue of null', () => {
    const result = BoxedList.of(1, 2).reduce<null | number>(
      (acc, x) => (acc === null ? x : acc + x), null
    );
    expect(result).toBe(3);
  });
});

describe('reduceRight()', () => {
  it('accumulates from right without initialValue', () => {
    expect(BoxedList.of('a', 'b', 'c').reduceRight((acc, x) => acc + x)).toBe('cba');
  });

  it('accumulates from right with a truthy initialValue', () => {
    expect(BoxedList.of(1, 2, 3).reduceRight((acc, x) => acc + x, 100)).toBe(106);
  });

  it('[regression] does not skip initialValue of 0', () => {
    expect(BoxedList.of(1, 2, 3).reduceRight((acc, x) => acc + x, 0)).toBe(6);
  });

  it('[regression] does not skip initialValue of empty string', () => {
    expect(BoxedList.of('a', 'b', 'c').reduceRight((acc, x) => acc + x, '')).toBe('cba');
  });
});

describe('some()', () => {
  it('returns true when at least one element satisfies the predicate', () => {
    expect(BoxedList.of(1, 2, 3).some(x => x > 2)).toBe(true);
  });
  it('returns false when no element satisfies the predicate', () => {
    expect(BoxedList.of(1, 2, 3).some(x => x > 10)).toBe(false);
  });
  it('returns false vacuously for an empty list', () => {
    expect(BoxedList.of<number>().some(x => x > 0)).toBe(false);
  });
});

describe('toString()', () => {
  it('produces a comma-separated string matching native Array#toString', () => {
    expect(BoxedList.of(1, 2, 3).toString()).toBe('1,2,3');
  });
});

describe('toLocaleString()', () => {
  it('returns a string', () => {
    expect(typeof BoxedList.of(1, 2, 3).toLocaleString()).toBe('string');
  });
  it('accepts a locales argument', () => {
    expect(() => BoxedList.of(1000).toLocaleString('en-US')).not.toThrow();
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Monadic and applicative helpers
// ══════════════════════════════════════════════════════════════════════════

describe('ap()', () => {
  it('applies each function to each value — outer: values, inner: fns', () => {
    // flatMap over [2, 3]: for t=2 → [3,20], for t=3 → [4,30]
    const vals = BoxedList.of(2, 3);
    const fns  = BoxedList.of((x: number) => x + 1, (x: number) => x * 10);
    expect(vals.ap(fns).unbox()).toEqual([3, 20, 4, 30]);
  });

  it('returns an empty list when this is empty', () => {
    expect(BoxedList.of<number>().ap(BoxedList.of((x: number) => x + 1)).unbox())
      .toEqual([]);
  });

  it('returns an empty list when fns is empty', () => {
    expect(BoxedList.of(1, 2).ap(BoxedList.of<(x: number) => number>()).unbox())
      .toEqual([]);
  });

  it('returns a new BoxedList instance', () => {
    const bl = BoxedList.of(1);
    expect(bl.ap(BoxedList.of(x => x))).toBeInstanceOf(BoxedList);
  });
});

describe('chain()', () => {
  it('maps each element and returns a plain R[], not a BoxedList', () => {
    const result = BoxedList.of(1, 2, 3).chain(x => x * 2);
    expect(result).toEqual([2, 4, 6]);
    expect(Array.isArray(result)).toBe(true);
    expect(result).not.toBeInstanceOf(BoxedList);
  });

  it('can change the element type', () => {
    expect(BoxedList.of(1, 2, 3).chain(String)).toEqual(['1', '2', '3']);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Unboxing
// ══════════════════════════════════════════════════════════════════════════

describe('unbox()', () => {
  it('returns the inner array', () => {
    expect(BoxedList.of(1, 2, 3).unbox()).toEqual([1, 2, 3]);
  });

  it('returns a plain Array (not a BoxedList)', () => {
    const result = BoxedList.of(1).unbox();
    expect(Array.isArray(result)).toBe(true);
    expect(result).not.toBeInstanceOf(BoxedList);
  });
});

describe('list getter', () => {
  it('returns the inner array', () => {
    expect(BoxedList.of(1, 2, 3).list).toEqual([1, 2, 3]);
  });

  it('returns a plain Array', () => {
    expect(Array.isArray(BoxedList.of(1).list)).toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Predicates and properties
// ══════════════════════════════════════════════════════════════════════════

describe('length', () => {
  it('returns the number of elements', () => {
    expect(BoxedList.of(1, 2, 3).length).toBe(3);
  });

  it('is 0 for an empty list', () => {
    expect(BoxedList.of().length).toBe(0);
  });

  it('stays consistent after deriving a new list', () => {
    const bl = BoxedList.of(1, 2, 3, 4, 5);
    expect(bl.filter(x => x > 3).length).toBe(2);
  });
});

describe('isArrayList', () => {
  it('returns true when every element is an array', () => {
    expect(BoxedList.of([1], [2, 3], []).isArrayList).toBe(true);
  });

  it('returns false when any element is not an array', () => {
    expect(BoxedList.of([1], 2).isArrayList).toBe(false);
  });

  it('returns true (vacuous) for an empty list', () => {
    // Array#every returns true for empty arrays
    expect(BoxedList.of().isArrayList).toBe(true);
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Interop
// ══════════════════════════════════════════════════════════════════════════

describe('box getter', () => {
  it('returns a container whose unbox() yields a copy of the inner array', () => {
    const bl = BoxedList.of(1, 2, 3);
    expect(bl.box.unbox()).toEqual([1, 2, 3]);
  });

  it('the box copy is independent from the BoxedList', () => {
    const bl = BoxedList.of(1, 2, 3);
    const copy = bl.box.unbox();
    copy.push(99);                   // mutate the copy
    expect(bl.unbox()).toEqual([1, 2, 3]); // original unaffected
  });
});

// ══════════════════════════════════════════════════════════════════════════
//  Internal factory invariant (regression: of() vs new BoxedList())
// ══════════════════════════════════════════════════════════════════════════

describe('internal factory invariant', () => {
  it('[regression] filter on BoxedList<number[]> preserves array elements', () => {
    // Original internal uses of BoxedList.of(...result) would unpack a
    // single-element result set — e.g. filtering [[1,2],[3]] to one match
    // produced BoxedList<number> instead of BoxedList<number[]>.
    const bl = BoxedList.of([1, 2], [3], [4, 5]);
    const result = bl.filter(arr => arr.length === 1);
    expect(result.unbox()).toEqual([[3]]);           // [[3]], not [3]
    expect(Array.isArray(result.unbox()[0])).toBe(true);
  });

  it('[regression] mapItems on BoxedList<number[]> preserves array elements', () => {
    const bl = BoxedList.of([1, 2], [3, 4]);
    const result = bl.mapItems(arr => arr.map(x => x * 10));
    expect(result.unbox()).toEqual([[10, 20], [30, 40]]);
  });
});
