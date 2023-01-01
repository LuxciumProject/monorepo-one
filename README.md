# Mapping Tools

![npm type definitions](https://img.shields.io/npm/types/mapping-tools?label=Powered%20by)[![Latest Version](https://img.shields.io/npm/v/mapping-tools)](https://www.npmjs.com/package/mapping-tools?activeTab=readme) ![npm](https://img.shields.io/npm/dt/mapping-tools)

![Version Badge](https://img.shields.io/static/v1?label=version&message=0.0.0-ALPHA-RELEASE-UNSAFE-v4.1.0x&color=blue)

Mapping Tools is a powerful package for mapping over lists and iterables in JavaScript and TypeScript.

The Mapping Tools package is designed to be user-friendly and easy to use, with clear documentation and examples. It is suitable for use in a wide range of applications, including data processing, data validation, and more.

Provides a set of utility functions for working with collections of data. These functions allow you to apply a transformations or validations to each item in a collection, either in serial or parallel, and generate new collections or iterators and async iterators based on the results. All while enjoying advanced error handling and advanced support for asynchronous code.

## Table of Contents

1. [Table of Contents](#table-of-contents)
1. [Installation](#installation)
1. [Usage Overview](#usage-overview)
1. [Quick Start](#quick-start)
1. [Base types](#base-types)
1. [Main Functions](#main-functions)
   - [Arguments](#arguments)
   - [Return Types](#return-types)
   - [Functions Signatures](#return-types)
     - [parallelMapping Signature](#parallelmapping)
     - [serialMapping Signature](#serialmapping)
     - [awaitedMapping Signature](#awaitedmapping)
     - [generateMapping Signature](#generatemapping)
     - [generateMappingAsync Signature](#generatemappingasync)
1. [Delegates Functions](#delegates-functions)
   - [transformFn](#transformfn)
   - [lookupFn](#lookupfn)
   - [validateFn](#validatefn)
   - [errLookupFn](#errlookupfn)
1. [Base Types](#base-types)
   - [`Base<TVal>`](#basetval)
   - [`Settled<TVal>`](#settledtval)
   - [`SettledRight<TVal>`](#settledrighttval)
   - [`SettledLeft`](#settledleft)
   - [`PromiseFulfilledResult<TVal>`](#promisefulfilledresulttval)
   - [`PromiseSettledResult<TVal>`](#promisesettledresulttval)
   - [`PromiseRejectedResult`](#promiserejectedresult)
1. [Aliases Types](#aliases-types)
   - [`Deferred<Base>`](#deferredbase)
   - [`BaseOrDeferred<Base>`](#baseordeferredbase)
   - [`Collection<Base>`](#collectionbase)
   - [`DeferredCollection<Base>`](#deferredcollectionbase)
   - [`SettledArray<Result>`](#settledarrayresult)
   - [`NullSymbol`](#nullsymbol)
   - [`SettledValue<Result>`](#settledvalueresult)
   - [`SettledValues<Result>`](#settledvaluesresult)
   - [`OnlySideEffect`](#onlysideeffect)

## Installation

To install Mapping Tools, you can use npm, yarn, or pnpm:

```bash
# npm
npm install mapping-tools
# yarn
yarn add mapping-tools
# pnpm
pnpm add mapping-tools
```

## Usage Overview

The package includes 5 main functions:

1. **[awaitedMapping](#awaitedmapping)**, is based on Promise.all($)
2. **[paralellMapping](#parallelmapping)**, is based on Array.prototype.map($)
3. **[serialMapping](#serialmapping)**, is based on a forOf loop
4. **[generateMappingAsync](#generatemappingasync)**, is based on the AsyncGenerator protocol
5. **[generateMapping](#generatemapping)**, is based on the Generator protocol

These functions all take a collection of items as their main input, along with 4 delegate functions: [transformFn](#transformfn), [lookupFn](#lookupfn), [validateFn](#validatefn) and [errLookupFn](#errlookupfn).

The transformFn is applied to each item in the collection and is used to transform the item into a new value. The lookupFn and validateFn are applied to each item in the collection and can be used to perform additional lookup or validation operations on the transformed items. The errLookupFn is used to handle any errors that may occur during the processing of the collection or during previous steps of processing. Each are optionals but not providing any would result in no transformation of the values.

## Quick Start

To get started with Mapping Tools, you'll first need to import the
library in your code:

```typescript
const mappingTools = require('mapping-tools');
// or
import * as mappingTools from 'mapping-tools';
```

Then, you can use the various functions provided by the library to
generate, transform, and iterate over maps, as well as to perform
asynchronous map generation.

```typescript
import { awaitedMapping, helpers } from 'mapping-tools';

const { extractFulfilledValues, extractSettledValues } = helpers;

async function main() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const mappedArray = await awaitedMapping(array, async element => {
    // Async operation on each element
    if (element % 4 === 2) {
      throw new Error('Error');
    }
    return element * 2;
  });
```

Using extractFulfilledValues will return only fulfilledValues
changing the length of the array and the position of the
elements if necessary

```typescript
const fulfilledValues = extractFulfilledValues(mappedArray);
console.log('fulfilledValues :>> ', fulfilledValues);
console.log('fulfilledValues.length :>> ', fulfilledValues.length);
```

- output:

```typescript
/*
  fulfilledValues :>>  [
    2,  6,  8, 10, 14,
    16, 18, 22, 24
  ]
  fulfilledValues.length :>>  9
*/
```

Using extractFulfilledValues will return only settledValues
(for which the SettledLeft has no value and will be returning
`NULL_SYMBOL` instead) keeping the length of the array and the
position of its elements.

```typescript
  const settledValues = extractSettledValues(mappedArray);
  console.log('settledValues :>> ', settledValues);
  console.log('settledValues.length :>> ', settledValues.length);
  }
main();
```

- output:

```typescript
/*
  settledValues :>>  [
    2,  Symbol(null),
    6,  8,
    10, Symbol(null),
    14, 16,
    18, Symbol(null),
    22, 24
  ]
  settledValues.length :>>  12
*/
```

## Main Functions

The project currently have 5 main flavours for its core functions they have complex signatures taht are [easy to understand](#arguments), and they can be grouped in diferrent manner:

1. Functions that can accept either `Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>>>` and which return promises that resolve to arrays: [serialMapping](#serialmapping), [awaitedMapping](#awaitedmapping)

2. Functions that can accept only `Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>` and return arrays of promises or generators: [parallelMapping returns](#parallelmapping), [generateMapping returns](#generatemapping), [generateMappingAsync returns](#generatemappingasync)

### parallelMapping

`parallelMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Array<Promise<Settled<R>>>`

Applies the provided callback functions to each item in the collection in parallel, and returns an array of promises that resolve to the transformed and validated items, represented as `Settled<R>` objects.

- Based on an `Array.prototype.map($)`
- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
- Returns: `Array<Promise<Settled<R>>>`

  ```typescript
  export function paralellMapping<T, R>(
    collection: Iterable<AwaitAndBase<T>>,
    transform: TransformFn<T, R> = async value => value as any as R,
    lookup: LookupFn<T, R> = v => void v,
    validate: ValidateFn<T, R> = async v => void v,
    errLookup: ErrLookupFn = v => void v
  ): Array<Promise<Settled<R>>>;
  ```

### serialMapping

`serialMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Promise<Array<Settled<R>>>`

Applies the provided callback functions to each item in the collection in series, and returns a promise that resolves to an array of the transformed and validated items, represented as `Settled<R>` objects.

- Based on `forOf` _loop_
- Takes as its main input: `Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>>>`
- Returns: `Promise<Array<Settled<R>>>`

  ```typescript
  export async function serialMapping<T, R>(
    collection:
      | Iterable<AwaitAndBase<T>>
      | PromiseLike<Iterable<AwaitAndBase<T>>>,
    transformFn: TransformFn<T, R> = async value => value as any as R,
    lookupFn: LookupFn<T, R> = v => void v,
    validateFn: ValidateFn<T, R> = async v => void v,
    errLookupFn: ErrLookupFn = v => void v
  ): Promise<Array<Settled<R>>>;
  ```

### awaitedMapping

`awaitedMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Promise<Array<Settled<R>>>`

Applies the provided callback functions to each item in the collection, and returns a promise that resolves to an array of the transformed and validated items, represented as `Settled<R>` objects.

- Based on `Promise.all($)`
- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
- Returns: `Promise<Array<Settled<R>>>`

  ```typescript
  export async function awaitedMapping<T, R>(
    collection:
      | Iterable<AwaitAndBase<T>>
      | PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>,
    transform: TransformFn<T, R> = async value => value as any as R,
    lookup: LookupFn<T, R> = v => void v,
    validate: ValidateFn<T, R> = async v => void v,
    errLookup: ErrLookupFn = v => void v
  ): Promise<Settled<R>[]>;
  ```

### generateMapping

`generateMapping(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): Generator<Promise<Settled<R>>, void, unknown>`

Applies the provided callback functions to each item in the collection, and returns a generator that yields promises that resolve to the transformed and validated items, represented as `Settled<R>` objects.

- Based on the `Generator` _Protocol_
- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
- Returns: `Generator<Promise<Settled<R>>, void, unknown>`

  ```typescript
  export function* generateMapping<T, R>(
    collection: Iterable<AwaitAndBase<T>>,
    transform: TransformFn<T, R> = async value => value as any as R,
    lookup: LookupFn<T, R> = v => void v,
    validate: ValidateFn<T, R> = async v => void v,
    errLookup: ErrLookupFn = v => void v
  ): Generator<Promise<Settled<R>>, void, unknown>;
  ```

### generateMappingAsync

`generateMappingAsync(collection, TransformFn, LookupFn, ValidateFn, ErrLookupFn): AsyncGenerator<Settled<R>, void, unknown>`

Applies the provided callback functions to each item in the collection, and returns an async generator that yields the transformed and validated items, represented as `Settled<R>` objects.

- Based on the `AsyncGenerator` _Protocol_
- Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
- Returns: `AsyncGenerator<Settled<R>, void, unknown>`

  ```typescript
  export async function* generateMappingAsync<R, T>(
    collection: Iterable<AwaitAndBase<T>>,
    transform: TransformFn<T, R> = async value => value as any as R,
    lookup: LookupFn<T, R> = v => void v,
    validate: ValidateFn<T, R> = async v => void v,
    errLookup: ErrLookupFn = v => void v
  ): AsyncGenerator<Settled<R>, void, unknown>;
  ```

### Return Types

The list of the 5 core function return types is as follows:

- **Functions that return arrays**
  - [parallelMapping returns](#parallelmapping): `Array<Promise<Settled<R>>>`
- **Functions that return promises that resolve to arrays**
  - [serialMapping returns](#serialmapping): `Promise<Array<Settled<R>>>`
  - [awaitedMapping returns](#awaitedmapping): `Promise<Array<Settled<R>>>`
- **Functions that return generators**
  - [generateMapping returns](#generatemapping): `Generator<Promise<Settled<R>>, void, unknown>`
  - [generateMappingAsync returns](#generatemappingasync): `AsyncGenerator<Settled<R>, void, unknown>`

### Arguments

Our functions have complex signature which are easier to understand when we break them down in ther main coponents:

- `collection: Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>> | PromiseLike<Iterable<Base<T>>>`: The collection of items to be iterated or mapped over. The collection can be either an iterable or a combination of an iterable and a promise of an iterable.
  The `Base<T>` type represents a resolved or rejected promise, or a value. It can be one of the following:

  - `TBase`: The resolved value of a promise.
  - `Settled<TBase>`: An object representing a resolved or rejected promise, with a `status` field indicating the status of the promise and a `value` or `reason` field containing the resolved value or rejection reason, respectively.
  - `PromiseSettledResult<TBase>`: An object representing a resolved or rejected promise, with a `status` field indicating the status of the promise and a `value` or `reason` field containing the resolved value or rejection reason, respectively.
  - `SettledRight<TBase>`: An object representing a resolved promise, with a `status` field equal to `'fulfilled'` and a `value` field containing the resolved value.
  - `PromiseFulfilledResult<TBase>`: An object representing a resolved promise, with a `status` field equal to `'fulfilled'` and a `value` field containing the resolved value.
  - `SettledLeft`: An object representing a rejected promise, with a `status` field equal to `'rejected'` and a `reason` field containing the rejection reason.
  - `PromiseRejectedResult`: An object representing a rejected promise, with a `status` field equal to `'rejected'` and a `reason` field containing the rejection reason.

- `TransformFn<T, R> = async value => value as any as R`: A callback function that is applied to each item in the collection. It takes an item of type `T` as input and returns a value of type `R`.
- `LookupFn<T, R> = v => void v`: A callback function that is applied to each item in the collection. It takes an item of type `T` as input and returns a value of type `R`.
- `ValidateFn<T, R> = async v => void v`: A callback function that is applied to each item in the collection. It takes an item of type `T` as input and returns a value of type `R`.
- `ErrLookupFn = v => void v`: A callback function that is applied to each item in the collection. It takes an item of type `T` as input and returns a value of type `R`.

```typescript
/** Type alias either Promise or not */
// Base<B> type is described below...
type AwaitAndBase<B> = Base<B> | PromiseLike<Base<B>>;

type Collection<B> = Iterable<Base<B>>;
```

## Delegates functions

**You can provide 4 main types of _delegates functions_ as arguments to
the main functions of the package.**

In this context delegating just means the act of giving another
_function_ the responsibility of carrying out the performance agreed
upon in by the folowing _interface_ contracts.

Each delegates can take null or undefined that are repleced by a default value:

```typescript
const transform: TransformFn<T, R> =
  transformFn == null ? async value => value as any as R : transformFn;

const lookup: LookupFn<T, R> = lookupFn == null ? v => void v : lookupFn;

const validate: ValidateFn<T, R> =
  validateFn == null ? async v => void v : validateFn;

const errLookup: ErrLookupFn = errLookupFn == null ? v => void v : errLookupFn;
```

### transformFn

**`TransformFn<T,U>`**

The `TransformFn<T,U>` delegate function is responsible for carrying
out the actual mapping process.

It works similarly to the callback function provided to an
`Array.prototype.map($)`, and expects that you will transform from
input type `T` to returned type `U`.

Proper type annotations are required if you return an unchanged
value, as `U` and `T` must be different in order to be inferred.

```typescript
export interface TransformFn<T, U = unknown> {
  (
    value: T,
    index: number,
    array: readonly (T | PromiseSettledResult<T>)[]
  ): Promise<U>;
}
```

### lookupFn

**`LookupFn<S,U>`**

The `LookupFn<S,U>` delegate function is used to acknowledge the transformed value `U` in an asynchronous manner. The return value of this delegate must be `void` and must not have any internal side effects within the function where it is executed. However, external side effects, such as a `console.log($)`, are allowed. In this context, `OnlySideEffect` is an alias for `void`.

```typescript
export interface LookupFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | Settled<S> | PromiseSettledResult<S>)[]
  ): OnlySideEffect;
}
```

### validateFn

**`ValidateFn<S,U>`**

The `ValidateFn<S,U>` delegate function is similar to the `LookupFn<S,U>` delegate, both of which are optional and should be used only if necessary. The main difference is that the execution of the `ValidateFn<S,U>` delegate is awaited within the function where it is executed. The return value must be a `Promise<void>`. The only way to communicate with the main function is to throw a value or exception, which will be caught in the function and returned as a SettledLeft. In this context, `Promise<OnlySideEffect>` is an alias for `Promise<void>`. If your fuinction is not returning a promise you can use the async keword as a shortcut to convert to a promise.

```typescript
export interface ValidateFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ): Promise<OnlySideEffect>;
}
```

### errLookupFn

**`ErrLookupFn`**

The `ErrLookupFn` delegate function is used to handle errors, and is similar to the `LookupFn<S,U>` delegate, but for rejections. It takes a `currentRejection` flag as its third argument, which indicates whether the error occurred during the current iteration or a previous iteration. You should only act on `currentRejection`s that are `true`, as they are not the result of a previous `transformStep` or `ValidationStep`. If you need to access previous rejections, they are also available when the current step is dealing with a previous rejection it will skip the `transformFn`, `lookupFn` and `validationFn` but would be available to the `ErrLookupFn` even if from a previous transformation step with a `currentRejection` value of false.

```typescript
export interface ErrLookupFn {
  (reason: any, index: number, currentRejection: boolean): OnlySideEffect;
}
```

Internally the delegate is linked via parameter that you
can acess from the outside by providing a function (the delegate) of
a certain type (specified via an interface) as an argument.

The tranformations, validation and lookup of the resulting operation
is mandated to 4 diferet function that let you alter the workflow in
5 diferent areas inside the specific mapping operation over each
elements.

Since everything is based only on functions this definition may be
different than the usual concept in JavaScript which is related often
related to [Object composition and inheritance](https://en.wikipedia.org/wiki/JavaScript#Delegative).

## Base Types

### `Base<TVal>`

Basic input type, represents the agregation of a naked value of type `TBase` (i.e `T` or `TVal` ), a resolved value wraped in either `SettledRight<TBase> | PromiseFulfilledResult<TBase>` or a rejection reason wraped in eiter `SettledLeft | PromiseRejectedResult` or the equivalent unions types `Settled<TBase> | PromiseSettledResult<TBase>`.

```typescript
type Base<TBase> =
  | TBase
  | Settled<TBase>
  | PromiseSettledResult<TBase>
  | SettledRight<TBase>
  | PromiseFulfilledResult<TBase>
  | SettledLeft
  | PromiseRejectedResult;
```

### `Settled<TVal>`

```typescript
type Settled<T> = SettledLeft | SettledRight<T>;
```

### `SettledRight<TVal>`

```typescript
type SettledRight<T> = PromiseFulfilledResult<T> & {
  status: 'fulfilled';
  value: T;

  /* The null value of the transformStep and the index is -1 */
  /* When value is -1 the folowing properties a not enumerated */
  transformStep: number;
  index: number;

  /* Folowing properties a not enumerated (enumerable: false) */
  currentRejection: null;
  fulfilled: T;
  rejected: null;
  reason?: undefined;
};
```

### `SettledLeft`

```typescript
type SettledLeft = PromiseRejectedResult & {
  status: 'rejected';
  reason: any;

  /*
    the currentRejection can be undefined but the property itself
    can not be undefined
   */
  currentRejection: true | false | undefined;

  /* The null value of the transformStep and the index is -1 */
  /* When value is -1 the folowing properties a not enumerated */
  transformStep: number;
  index: number;

  /* Folowing properties a not enumerated (enumerable: false) */
  rejected: any;
  fulfilled: null;
  value?: undefined;
};
```

### `PromiseFulfilledResult<TVal>`

```typescript
/** From typescript lib */
interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}
```

### `PromiseSettledResult<TVal>`

```typescript
/** From typescript lib */
type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;
```

### `PromiseRejectedResult`

```typescript
/** From typescript lib */
interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}
```

## Aliases Types

### `Deferred<Base>`

The `Deferred<B>` type is an alias for `PromiseLike<Base<B>>`, which represents a promise-like object that wraps a value of type `Base<B>`. It is used to simplify the documentation and does not need to be used directly by the end user of the package.

```typescript
type Deferred<B> = PromiseLike<Base<B>>;
```

### `BaseOrDeferred<Base>`

`BaseOrDeferred<B>` is an alias type that represents either a
promise-like `Deferred<B>` type or a `Base<B>` type.

In some cases the base type can be combined to be either `Base<B>`
or `Deferred<B>` and would be the type of a parameter to a function
that can take such compounded object type.

```typescript
type BaseOrDeferred<B> = Base<B> | Deferred<B>;
```

### `Collection<Base>`

Basic Iterable input type, and Iterable version of `BaseOrDeferred<Base>` the union type of eiter an `Iterable<Base<B>>` with all its values being of type `Base<B>` or an `Iterable<Deferred<B>>` with all its values being of type `Deferred<B>` pleae not that it is not the same as `Iterable<Base<B> | Deferred<B>>` as the Iterable canot contain mixed types similar to `BaseOrDeferred<Base>`;

```typescript
type Collection<B> = Iterable<Base<B>> | Iterable<Deferred<B>>;
```

### `DeferredCollection<Base>`

Extended version of basic Iterable input type, may be eiter `Collection<B>` or a PromiseLike of the same kind `PromiseLike<Collection<B>>`

```typescript
type DeferredCollection<B> = Collection<B> | PromiseLike<Collection<B>>;
```

### `SettledArray<Result>`

```typescript
type SettledArray<R> = Settled<R>[];
```

### `NullSymbol`

```typescript
type NullSymbol = typeof NULL_SYMBOL;
```

### `SettledValue<Result>`

```typescript
type SettledValue<R> = R | NullSymbol;
```

### `SettledValues<Result>`

```typescript
type SettledValues<R> = SettledValue<R>[];
```

### `OnlySideEffect`

```typescript
type OnlySideEffect = void | undefined;
```

## Contributing

We welcome contributions to Mapping Tools! If you have an idea for a new feature or have found a bug, please open an issue on GitHub. If you'd like to contribute code, please follow these guidelines:

- All code should be tested using the provided test suite.
- Please include documentation for any new functions or types you add.

## NO PERMISSION GRANTED - PROVIDED "AS IS" - WITHOUT WARRANTY

† **Scientia est lux principium✨** ™

THESE FILES ARE _NOT_ FIT FOR ANY PARTICULAR PURPOSE IN IT'S CURRENT FORM
THESE FILES HAVE NOT BEEN TESTED OR RUN YET IN ALL ENVIRONMENTS! _DO NOT_
RUN THESE FILES UNLESS YOU HAVE REVIEWED THE FULL CONTENT AND TAKE FULL
RESPONSIBILITY OF ANY PROBLEME IT MAY CAUSE TO YOU (or anyone) OR YOUR
MACHINE (or any machine).

### NO PERMISSION ARE GRANTED FOR THIS SOFTWARE

1. NOT TO PUBLISH;
2. NOT TO DISTRIBUTE;
3. NOT TO SUBLICENSE;
4. NOT TO SELL COPIES OF;

#### NOTICE

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL OR ANY KIND,
> EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS WILL BE LIABLE FOR ALL
> OR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
> OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright © 2022 LUXCIUM

### EXCEPTIONS

#### YOU HAVE THE RIGHT TO

```text
A) USE IT FOR YOURSELF;
B) DISTRIBUTE IT TO YOUR FRIENDS;
C) DISTRIBUTE IT TO YOUR STUDENTS;
D) DISTRIBUTE IT TO YOUR COWORKER;
(FOR PERSONAL USE: AT HOME, AT SCHOOL OR AT WORK)
```

IN ALL OR ANY CASES THE COPYRIGHT AND NOTICE ABOVE MUST BE INCLUDED.

### Copyright © 2022 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com

<!--
1. [Usage](#usage)
1. [Features](#features)
1. [Documentation](#documentation)

##
##
##
##
##
### Arguments
## Return Types
### parallelMapping signature
### serialMapping signature
### awaitedMapping signature
### generateMapping signature
### generateMappingAsync signature
## Delegates functions
###
###
###
###

## Main types
## Base types
## Contributing
## Luxcium License: NO PERMISSION GRANTED - PROVIDED "AS IS" - WITHOUT WARRANTY
### NO PERMISSION ARE GRANTED FOR THIS SOFTWARE
#### NOTICE
### EXCEPTIONS
#### YOU HAVE THE RIGHT TO
### Copyright © 2022 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com
###### † Scientia est lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu

 -->

###### † Scientia est lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu<!-- markdownlint-disable-line -->

<sup>Text generated by an [AI language model](https://openai.com/) has been used in this work.</sup><!-- markdownlint-disable-line -->
