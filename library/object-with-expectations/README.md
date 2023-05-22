# 📚💙 object-with-expectations

Let you merge objects with expected asyncronious results and normal properties.

## @luxcium/object-with-expectations@0.2.2

### install with pnpm npm or yarn

    pnpm add @luxcium/object-with-expectations

### All example imply this code

```typescript
import { mixBases, mixExpected } from '@luxcium/object-with-expectations';

// Objects witout an « expected » property.

const onlyFoo = {
  foo: 'machin',
};
const onlyBar = {
  bar: 'bidule',
};

// Objects with an « expected » property that contain
// the async values.

const foo = {
  foo: 'machin',
  expected: { bolo: (async () => 'await bolo')() },
};
const bar = {
  bar: 'bidule',
  expected: { toto: (async () => 'await toto')() },
};
```

### Use mixBases to mix 2 objects without an `expected` property

```typescript
const withBaseOnly = {
  ...mixBases<any, any, { foo: string }, { bar: string }>(onlyFoo, onlyBar),
};
console.log('at withBaseOnly:', withBaseOnly);
// at withBaseOnly: { foo: 'machin', bar: 'bidule' }
```

### Use mixBases to mix 2 objects with an `expected` property

```typescript
const withExpectedProperty = { ...mixBases(foo, bar) };
console.log('at withExpectedProperty:', withExpectedProperty);
// at withExpectedProperty: { foo: 'machin', bar: 'bidule' }
```

### A separate function is required in order to merge the sub-properties from your `expeceted` object

```typescript
/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @example
 *    const mergeExpected: {
 *        expected: {
 *            bolo: Promise<string>;
 *        } & {
 *            toto: Promise<string>;
 *        };
 *    }
 */

const mergeExpected = mixExpected(foo, bar);
console.log('at mergeExpected:', mergeExpected);
// at mergeExpected: {
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }
```

### To have meaningfull type inference it is required to groom your data in order to get the best TypeScript support

Gradually reshaping the output type infered keeping the same value shape as expected.

```typescript
/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @remarks
 * Gradually reshaping the output type infered keeping the same value.
 * @example
 *     const expected: {
 *         bolo: Promise<string>;
 *     } & {
 *         toto: Promise<string>;
 *     }
 */
const expected = mergeExpected.expected;
// or const { expected } = mergeExpected;

console.log('at expected:', expected);
// at expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
```

### To have meaningfull type inference it is required to groom your data in order to get the best TypeScript inference

Giving its final shape (type wise) for the outpput

```typescript
/**
 * Testing the mixExpected keeping expected sub module
 * (property/object) but discaring base properties.
 * @remarks
 * Giving its final shape (type wise) for the outpput
 * @example
 *    const expectedResult: {
 *        expected: {
 *            bolo: Promise<string>;
 *            toto: Promise<string>;
 *        };
 *    }
 */
const expectedResult = { expected: { ...expected } };
console.log('at expectedResult:', expectedResult);
// at expectedResult: {
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }
```

### You can then finalize by merging the 2 objects parts together

```typescript
/**
 * Merging both part into a new single object
 * @example
 *    const mergingAll: {
 *        expected: {
 *            bolo: Promise<string>;
 *            toto: Promise<string>;
 *        };
 *        foo: string;
 *        bar: string;
 *    }
 */

const mergingAll = { ...expectOnly, ...expectedFinal };
console.log('at mergingAll:', mergingAll);
// at mergingAll: {
//    foo: 'machin',
//    bar: 'bidule',
//    expected: { bolo: Promise { 'await bolo' }, toto: Promise { 'await toto' } }
// }
```

† Scientia est lux principium✨ ™

#### MIT © 2022 Luxcium ✨ (Benjamin Vincent)
