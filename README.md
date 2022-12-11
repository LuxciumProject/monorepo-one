# mapping-tools

0.0.0-PRE_ALPHA-UNRELEASED-UNDOCUMENTED-UNSAFE-v3.0.0x

## Delegates functions

You can provide 4 main types of _delegates functions_ as arguments to
the main functions of the package.

- `TransformFn<T,U>`

  The `TransformFn<T,U>` delegate is where the actual mapping takes
  place it is similar to the call back you would provide to an
  `Array.prototype.map($)` it expect that you will morph from input
  type `T` to returned type `U`, Proper type anotation would be
  required if you would return unchanged value as `U` and `T` must
  be different to be infered.

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

  ```typescript
  export interface ErrLookupFn {
    (reason: any, index: number, currentRejection: boolean): OnlySideEffect;
  }
  ```

## Main types

- `Base<TBase>`

  The `Base<TVal>` type is the center piece of the type system for
  the mapping-tools package and is described in the section folowing
  this one... You can see here an summary.

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
    currentRejection: true | false | undefined;
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

**† Scientia es lux principium✨ ™**

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
(FOR PERSONAL USE; AT HOME, AT SCHOOL OR AT WORK)
```

IN ALL OR ANY CASES THE COPYRIGHT AND NOTICE ABOVE MUST BE INCLUDED.

### Copyright © 2022 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com

###### † Scientia es lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu

† Scientia es lux principium✨ ™
