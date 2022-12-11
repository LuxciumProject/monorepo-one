# mapping-tools

0.0.0-PRE_ALPHA-UNRELEASED-UNDOCUMENTED-UNSAFE-v3.0.0x

## Main types

- `Collection<Base>`

  ```typescript
  type Collection<B> = Iterable<Base<B>>;
  ```

- `Await<Base>`

  ```typescript
  type Await<B> = PromiseLike<Base<B>>;
  ```

- `CollectionOfAwait<Base>`

  ```typescript
  type CollectionOfAwait<B> = Collection<Await<B>>;
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

```

**† Scientia es lux principium✨ ™**

## Luxcium License: NO PERMISSION GRANTED - PROVIDED "AS IS" - WITHOUT WARRANTY

  THESE FILES ARE *NOT* FIT FOR ANY PARTICULAR PURPOSE IN IT'S CURRENT FORM
  THESE FILES HAVE NOT BEEN TESTED OR RUN YET IN ALL ENVIRONMENTS! *DO NOT*
  RUN THESE FILES UNLESS YOU HAVE REVIEWED THE FULL CONTENT AND TAKE FULL
  RESPONSIBILITY OF ANY PROBLEME IT MAY CAUSE TO YOU (or anyone) OR YOUR
  MACHINE (or any machine).

### NO PERMISSION ARE GRANTED FOR THIS SOFTWARE:

  1) NOT TO PUBLISH;
  2) NOT TO DISTRIBUTE;
  3) NOT TO SUBLICENSE;
  4) NOT TO SELL COPIES OF;

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

  A) USE IT FOR YOURSELF;
  B) DISTRIBUTE IT TO YOUR FRIENDS;
  C) DISTRIBUTE IT TO YOUR STUDENTS;
  D) DISTRIBUTE IT TO YOUR COWORKER;
  (FOR PERSONAL USE; AT HOME, AT SCHOOL OR AT WORK)

  IN ALL OR ANY CASES THE COPYRIGHT AND NOTICE ABOVE MUST BE INCLUDED.

### Copyright © 2022 · LUXCIUM · (Benjamin Vincent Kasapoglu) · luxcium﹫neb401.com

###### † Scientia es lux principium✨ is a Trade Mark of Benjamin Vincent Kasapoglu

† Scientia es lux principium✨ ™

```

```

```
