# Mapping Tools

![npm type definitions](https://img.shields.io/npm/types/mapping-tools?label=Powered%20by) ![npm](https://img.shields.io/npm/dt/mapping-tools) ![npm](https://img.shields.io/npm/v/mapping-tools)

"mapping-tools" is a powerful package for mapping over lists and iterables in JavaScript and TypeScript. With our package, you can easily apply transformations to each element in a list, all while enjoying advanced error handling and support for asynchronous code.

This package offers five main tools for mapping, each based on a different technique:

1. **awaitedMapping**, is based on Promise.all($)
2. **parallelMapping**, is based on Array.prototype.map($)
3. **serialMapping**, is based on a forOf loop
4. **generateMappingAsync**, is based on the AsyncGenerator protocol
5. **generateMapping**, is based on the Generator protocol

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

## Getting Started

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
import { awaitedMapping } from 'mapping-tools';

async function main() {
  const array = [1, 2, 3];
  const mappedArray = await awaitedMapping(array, async element => {
    // Sync or Async operation on each element
    return element * 2;
  });
  console.log(mappedArray);

  /*
    [
      { status: 'fulfilled', value: 2, index: 0, transformStep: 1 },
      { status: 'fulfilled', value: 4, index: 1, transformStep: 1 },
      { status: 'fulfilled', value: 6, index: 2, transformStep: 1 }
    ]
  */
}

main();
```

## Main (core) functions

 <p align="center">
      <a href="images/v0.0.0/main-types.png">
        <img src="images/v0.0.0/main-types.png" width="70%" title="Click to enlarge the image!" alt="main-types function type signature">
      </a>
    </p>

The project currently have 5 main flavours for its core functions

the last 4 arguments are called delegates they are explained later (below) they all can be null or undefined and would be repleced by a default value:

```typescript
const transform: TransformFn<T, R> =
  transformFn == null ? async value => value as any as R : transformFn;

const lookup: LookupFn<T, R> = lookupFn == null ? v => void v : lookupFn;

const validate: ValidateFn<T, R> =
  validateFn == null ? async v => void v : validateFn;

const errLookup: ErrLookupFn = errLookupFn == null ? v => void v : errLookupFn;
```

They can be grouped in diferrent manner and have complex signature taht are easy to understand when we break them down in ther main coponents.

```typescript
/** Type alias either Promise or not */
// Base<B> type is described below...
type AwaitAndBase<B> = Base<B> | PromiseLike<Base<B>>;

type Collection<B> = Iterable<Base<B>>;
```

- **awaitedMapping**

  - Based on `Promise.all($)`
  - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
  - Returns: `Promise<Array<Settled<R>>>`

    <p align="center">
      <a href="images/v0.0.0/AwaitedMappingFn.png">
        <img src="images/v0.0.0/AwaitedMappingFn.png" width="70%" title="Click to enlarge the image!" alt="AwaitedMappingFn function type signature">
      </a>
    </p>

- **paralellMapping**

  - Based on an `Array.prototype.map($)`
  - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
  - Returns: `Array<Promise<Settled<R>>>`

      <p align="center">
        <a href="images/v0.0.0/ParalellMappingFn.png">
          <img src="images/v0.0.0/ParalellMappingFn.png" width="70%" title="Click to enlarge the image!" alt="ParalellMappingFn function type signature">
        </a>
      </p>

- **serialMapping**

  - Based on `forOf` _loop_
  - Takes as its main input: `Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>>>`
  - Returns: `Promise<Array<Settled<R>>>`

      <p align="center">
        <a href="images/v0.0.0/SerialMappingFn.png">
          <img src="images/v0.0.0/SerialMappingFn.png" width="70%" title="Click to enlarge the image!" alt="SerialMappingFn function type signature">
        </a>
      </p>

- **generateMappingAsync**

  - Based on the `AsyncGenerator` _Protocol_
  - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
  - Returns: `AsyncGenerator<Settled<R>, void, unknown>`

      <p align="center">
        <a href="images/v0.0.0/GenerateMappingFn.png">
          <img src="images/v0.0.0/GenerateMappingFn.png" width="70%" title="Click to enlarge the image!" alt="GenerateMappingFn function type signature">
        </a>
      </p>

- **generateMapping**

  - Based on the `Generator` _Protocol_
  - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` only
  - Returns: `Generator<Promise<Settled<R>>, void, unknown>`

      <p align="center">
        <a href="images/v0.0.0/GenerateMappingAsyncFn.png">
          <img src="images/v0.0.0/GenerateMappingAsyncFn.png" width="70%" title="Click to enlarge the image!" alt="GenerateMappingAsyncFn function type signature">
        </a>
      </p>

- **serialMapping**

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

- **awaitedMapping**

  - Based on `Promise.all($)`
  - Takes as its main input: `Iterable<Base<T> | PromiseLike<Base<T>>>` or `PromiseLike<Iterable<Base<T>> | Iterable<PromiseLike<Base<T>>>>`
  - Returns: `Promise<Array<Settled<R>>>`

- ```typescript
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

- **paralellMapping**

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

- **generateMappingAsync**

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

- **generateMapping**

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

## Delegates functions

**You can provide 4 main types of _delegates functions_ as arguments to
the main functions of the package.**

In this context delegating just means the act of giving another
_function_ the responsibility of carrying out the performance agreed
upon in by the folowing _interface_ contracts.

- `TransformFn<T,U>`

  The `TransformFn<T,U>` delegate is where the actual mapping takes
  place it is similar to the call back you would provide to an
  `Array.prototype.map($)` it expect that you will morph from input
  type `T` to returned type `U`, Proper type anotation would be
  required if you would return unchanged value as `U` and `T` must
  be different to be infered.

  The `TransformFn<T,U>` delegate function is responsible for carrying out the actual mapping process. It works similarly to the callback function provided to an `Array.prototype.map($)`, and expects that you will transform from input type `T` to returned type `U`. Proper type annotations are required if you return an unchanged value, as `U` and `T` must be different in order to be inferred. The `TransformFn<T,U>` delegate function has the following interface:

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

- `LookupFn<S,U>`

  The `LookupFn<S,U>` delegate is where you can aknowledge the
  morphed value`U` in an asycronous manner as the return value of
  this delegate **must be** `void` and canot have side effects which
  overflows in the function where this delegate is executed, like
  throwing an exception or such, you can however have external side
  effect like a `console.log($)` or anything that will arise
  independendly from the internal flow of the function where thish
  delgate is executed. In this context `OnlySideEffect` is an alias
  for `void`.

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

- `ValidateFn<S,U>`

  The `ValidateFn<S,U>` delegate is similar to the `LookupFn<S,U>`
  delegate both are optional and should be used only if you have a
  specific usecase. The main difference is that the execution of this
  delagate is awaited in the function where it will be executed the
  return value of the delegate must be a `Promise<void>` and the only
  mechanism to comunicate with the function would be to throw a value
  or an exception that will be catched in the function and returned
  as a SettledLeft (described below). In this context
  `Promise<OnlySideEffect>` is an alias for `Promise<void>`.

The `ValidateFn<S,U>` delegate function is similar to the `LookupFn<S,U>` delegate, both of which are optional and should be used only if necessary. The main difference is that the execution of the `ValidateFn<S,U>` delegate is awaited within the function where it is used, and the return value must be a `Promise<void>`. The only way to communicate with the function is to throw a value or exception, which will be caught in the function and returned as a SettledLeft (described elsewhere). In this context, `Promise<OnlySideEffect>` is an alias for `Promise<void>`.

```typescript
export interface ValidateFn<S, U = unknown> {
  (
    value: U,
    index: number,
    array: readonly (S | PromiseSettledResult<S>)[]
  ): Promise<OnlySideEffect>;
}
```

- `ErrLookupFn`

  The `ErrLookupFn` delegate takes provide a `currentRejection` flag
  as its third argument and is used to tell if the error hapenned
  from the curent iteration or a previous iteration you should act
  only on `true` `currentRejection`s as they are not the result of a
  previous `transformStep` similar to the `LookupFn<S,U>` but for
  rejections. In case you need to tap in previous rejection it is
  available also if the actual step is dealing with a previous
  rejection from a previous tranformation step.

The `ErrLookupFn` delegate function is used to handle errors, and is similar to the `LookupFn<S,U>` delegate, but for rejections. It takes a `currentRejection` flag as its third argument, which indicates whether the error occurred during the current iteration or a previous iteration. You should only act on `currentRejection`s that are `true`, as they are not the result of a previous `transformStep`. If you need to access previous rejections, they are also available if the current step is dealing with a previous rejection from a previous transformation step.

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

## Main types

- `Base<TBase>`

  The `Base<TVal>` type is the center piece of the type system for
  the mapping-tools package and is described in the section folowing
  this one... You can see here an summary.
  <p align="center">
        <a href="../../images/v0.0.0/base-type.png">
          <img src="../../images/v0.0.0/base-type.png" width="70%" title="Click to enlarge the image!" alt="type Base<TVal> =
      | TVal
      | Settled<TVal>
      | PromiseSettledResult<TVal>
      | SettledRight<TVal>
      | PromiseFulfilledResult<TVal>
      | SettledLeft
      | PromiseRejectedResult;
    ">
        </a>
      </p>

    <!-- ```typescript
    type Base<TVal> =
      | TVal
      | Settled<TVal>
      | PromiseSettledResult<TVal>
      | SettledRight<TVal>
      | PromiseFulfilledResult<TVal>
      | SettledLeft
      | PromiseRejectedResult;
    ``` -->

- `Collection<Base>`

  The principal functions of the package takes a `Collection<B>` as
  their fist arguments in some cases it can even be a
  `PromiseLike<Collection<B>>`.

  ```typescript
  export type Collection<B> = Iterable<Base<B>>;
  ```

- `Await<Base>`

  To make it shorter to write we created the alias `Await<B>`
  for the `PromiseLike<Base<B>>` type.

  ```typescript
  export type Await<B> = PromiseLike<Base<B>>;
  ```

- `CollectionOfAwait<Base>`

  To make it shorter to write we created the alias
  `CollectionOfAwait<Base>` for the `Collection<Await<B>>` type. It could be converted to a `PromiseLike<Collection<B>>` using `Promise.all($)`

  ```typescript
  export type CollectionOfAwait<B> = Collection<Await<B>>;
  ```

- `PromiseLike<$>`

  The three types above also have their `PromiseLike<$>` equivalent:

  ```typescript
  PromiseLike<Collection<Base>>;
  PromiseLike<Await<Base>>;
  PromiseLike<CollectionOfAwait<Base>>;
  ```

- `AwaitAndBase<Base>`

  In some cases the base type can be combined to be either `Base<B>`
  or `Await<B>` and would be the type of a parameter to a function
  that can take the compounded object type.

  ```typescript
  export type AwaitAndBase<B> = Base<B> | PromiseLike<Base<B>>;
  ```

  ## Base types

- `Base<TBase>`

  ```typescript
  type Base<TVal> =
    | TVal
    | Settled<TVal>
    | PromiseSettledResult<TVal>
    | SettledRight<TVal>
    | PromiseFulfilledResult<TVal>
    | SettledLeft
    | PromiseRejectedResult;
  ```

- `Settled<TVal>`

  ```typescript
  type Settled<T> = SettledLeft | SettledRight<T>;

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

  /** From typescript lib */
  interface PromiseFulfilledResult<T> {
    status: 'fulfilled';
    value: T;
  }

  /** From typescript lib */
  interface PromiseRejectedResult {
    status: 'rejected';
    reason: any;
  }

  /** From typescript lib */
  type PromiseSettledResult<T> =
    | PromiseFulfilledResult<T>
    | PromiseRejectedResult;
  ```

  ## Contributing

We welcome contributions to Mapping Tools! If you have an idea for a new feature or have found a bug, please open an issue on GitHub. If you'd like to contribute code, please follow these guidelines:

- All code should be tested using the provided test suite.
- Please include documentation for any new functions or types you add.

**† Scientia est lux principium✨ ™**

## Luxcium License: NO PERMISSION GRANTED - PROVIDED "AS IS" - WITHOUT WARRANTY

THESE FILES ARE _NOT_ FIT FOR ANY PARTICULAR PURPOSE IN IT'S CURRENT FORM
THESE FILES HAVE NOT BEEN TESTED OR RUN YET IN ALL ENVIRONMENTS! _DO NOT_
RUN THESE FILES UNLESS YOU HAVE REVIEWED THE FULL CONTENT AND TAKE FULL
RESPONSIBILITY OF ANY PROBLEME IT MAY CAUSE TO YOU (or anyone) OR YOUR
MACHINE (or any machine).

### NO PERMISSION ARE GRANTED FOR THIS SOFTWARE:

1. NOT TO PUBLISH;
2. NOT TO DISTRIBUTE;
3. NOT TO SUBLICENSE;
4. NOT TO SELL COPIES OF;

#### NOTICE:

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL OR ANY KIND,
> EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS WILL BE LIABLE FOR ALL
> OR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
> OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Copyright © 2022 LUXCIUM

### EXCEPTIONS:

#### YOU HAVE THE RIGHT TO:

```
A) USE IT FOR YOURSELF;
B) DISTRIBUTE IT TO YOUR FRIENDS;
C) DISTRIBUTE IT TO YOUR STUDENTS;
D) DISTRIBUTE IT TO YOUR COWORKER;
(FOR PERSONAL USE: AT HOME, AT SCHOOL OR AT WORK)
```

IN ALL OR ANY CASES THE COPYRIGHT AND NOTICE ABOVE MUST BE INCLUDED.

### Copyright © 2022 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com

###### † Scientia est lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu

† Scientia est lux principium✨ ™

<sup>Text generated by an [AI language model](https://openai.com/) has been used in this work.</sup>
