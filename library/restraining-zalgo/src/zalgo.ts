/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { immediateZalgo } from './immediateZalgo';
import { nextTickZalgo } from './nextTickZalgo';
import { timeoutZalgo } from './timeoutZalgo';
import { nullOrDefined } from './tools';

type TimeoutDelayType = undefined | null | number | boolean;

const identiqueZalgo = <T>(id: T) => id;
identiqueZalgo;

export function zalgo_<T>(delay?: TimeoutDelayType) {
  if (delay == null) {
    return async (value: T | undefined): Promise<T | null> =>
      immediateZalgo(nullOrDefined(value));
  }

  // if (delay === null) {
  //   return async (value: T | undefined): Promise<T | null> =>
  //     nullOrDefined(value);
  // }

  if (delay === false) {
    return async (value: T | undefined): Promise<T | null> =>
      identiqueZalgo(nullOrDefined(value));
  }

  if (delay === true) {
    return async (value: T | undefined): Promise<T | null> =>
      nextTickZalgo(nullOrDefined(value));
  }

  if (delay <= 0) {
    return async (value: T | undefined): Promise<T | null> =>
      timeoutZalgo(nullOrDefined(value), 0);
  }

  return async (value: T | undefined): Promise<T | null> =>
    timeoutZalgo(nullOrDefined(value), delay);
}

// prettier-ignore
export const zalgo = <T>(value: T | undefined, delay?: TimeoutDelayType): Promise<T | null> => zalgo_<T>(delay)(value);
// prettier-ignore
export const zalgo1 = (delay?: TimeoutDelayType) => <T>(value?: T | undefined): Promise<T | null> => zalgo_<T>(delay)(value);
// prettier-ignore
export const zalgo2 = <T>(value?: T | undefined) => (delay?: TimeoutDelayType): Promise<T | null> => zalgo_<T>(delay)(value);

// prettier-ignore
export const zalgo3 = <T>(delay: TimeoutDelayType, value?: T | undefined): Promise<T | null> => zalgo_<T>(delay)(value);

/*

  const nullOrValue = nullOrDefined(value);
: Promise<T | null>
  if (delay === undefined) return async (value:T|undefined): Promise<T | null> =>immediateZalgo(nullOrDefined(value))
  if (delay === null) return async (value:T|undefined): Promise<T | null> =>nullOrDefined(value)
  if (delay != null && delay <= 0) return async (value:T|undefined): Promise<T | null> =>timeoutZalgo(0,nullOrDefined(value))
  if (delay != null && delay > 0) return async (value:T|undefined): Promise<T | null> =>timeoutZalgo(delay, nullOrDefined(value))
  if (delay != null && delay === true) return async (value:T|undefined): Promise<T | null> =>nextTickZalgo(nullOrDefined(value))
  if (delay != null && delay === false) return async (value:T|undefined): Promise<T | null> => identiqueZalgo(nullOrDefined(value))

timeoutZalgo // 0
timeoutZalgo // number

immediateZalgo // undefined
identiqueZalgo // false
nextTickZalgo // true

nullOrDefined(value) // null

undefined | null | number | treue | false
 */
// export function zalgo<T>(
//   value?: T | undefined,
//   delay: undefined | null | number | boolean = false
// ): (value?: T | undefined) => Promise<T | null> {
//   const nullOrDefinedValue = nullOrDefined(value);
//   nullOrDefinedValue;
//   let zalgo_ = <T>(id: T) => id;
//   if (delay === undefined) zalgo_ = <T>(id: T) => id;
//   if (delay === null) zalgo_ = <T>(id: T) => id;
//   if (delay != null && delay <= 0) zalgo_ = <T>(id: T) => id;
//   if (delay != null && delay > 0) zalgo_ = <T>(id: T) => id;
//   if (delay != null && delay === true) zalgo_ = <T>(id: T) => id;
//   if (delay != null && delay === false) zalgo_ = <T>(id: T) => id;

//   zalgo_;

//   if (delay === null) {
//     return async (value?: T | undefined): Promise<T | null> =>
//       nextTickZalgo(nullOrDefined(value));
//   }

//   if (delay <= 0) {
//     return async (value?: T | undefined): Promise<T | null> => {
//       await immediateZalgo();
//       return nullOrDefined(value);
//     }

//   }

//   return async (value?: T | undefined): Promise<T | null> =>
//     timeoutZalgo(delay, nullOrDefined(value));
// }

/*

    let zalgo_ = <T>(id: T) => id;
    if (delay === null) zalgo_ = <T>(id: T) => id;
    if (delay != null && delay <= 0) zalgo_ = <T>(id: T) => id;
    if (delay != null && delay > 0) zalgo_ = <T>(id: T) => id;
    if (delay != null && delay === true) zalgo_ = <T>(id: T) => id;
    if (delay != null && delay === false) zalgo_ = <T>(id: T) => id;

    zalgo_;
 */
/*
WITHOUT PERMISSION ― NOT UNDER MIT LICENSE ↓

[…] not to release Zalgo, possibly by using synthetic deferrals (say what?) so that you don’t make your API’s users unhappy. In the world of “lean” and MEAN MVPs, who has time to learn about leaky abstractions […]
― HissainMay 6, 2015 at 1:15 pm (https://blog.ometer.com/2011/07/24/callbacks-synchronous-and-asynchronous/)

Copyright © 2020 Packt Publishing All rights reserved:

Node.js Design Patterns [Third Edition]
― Mario Casciaro
― Luciano Mammino

3. Callbacks and Events
↓ Synchronous or asynchronous?
## § Unleashing Zalgo


Synchronous or asynchronous?
You have seen how the execution order of the instructions changes radically depending on the nature of a function—synchronous or asynchronous. This has strong repercussions on the flow of the entire application, both in terms of correctness and efficiency. The following is an analysis of these two paradigms and their pitfalls. In general, what must be avoided is creating inconsistency and confusion around the nature of an API, as doing so can lead to a set of problems that might be very hard to detect and reproduce. To drive our analysis, we will take, as an example, the case of an inconsistently asynchronous function.

An unpredictable function
One of the most dangerous situations is to have an API that behaves synchronously under certain conditions and asynchronously under others. Let's take the following code as an example:

```JavaScript
import { readFile } from 'fs'
const cache = new Map()
function inconsistentRead (filename, cb) {
  if (cache.has(filename)) {
    // invoked synchronously
    cb(cache.get(filename))
  } else {
    // asynchronous function
    readFile(filename, 'utf8', (err, data) => {
      cache.set(filename, data)
      cb(data)
    })
  }
}
```

The preceding function uses the cache map to store the results of different file read operations. Bear in mind that this is just an example; it does not have error management, and the caching logic itself is suboptimal (in Chapter 11, Advanced Recipes, you'll learn how to handle asynchronous caching properly). But besides all this, the preceding function is dangerous because it behaves asynchronously until the file is read for the first time and the cache is set, but it is synchronous for all the subsequent requests once the file's content is already in the cache.

Unleashing Zalgo
Now, let's discuss how the use of an unpredictable function, such as the one that we just defined, can easily break an application. Consider the following code:

```JavaScript
function createFileReader (filename) {
  const listeners = []
  inconsistentRead(filename, value => {
    listeners.forEach(listener => listener(value))
  })
  return {
    onDataReady: listener => listeners.push(listener)
  }
}
```

When the preceding function is invoked, it creates a new object that acts as a notifier, allowing us to set multiple listeners for a file read operation. All the listeners will be invoked at once when the read operation completes and the data is available. The preceding function uses our inconsistentRead() function to implement this functionality. Let's see how to use the createFileReader() function:

```JavaScript
const reader1 = createFileReader('data.txt')
reader1.onDataReady(data => {
  console.log(`First call data: ${data}`)
  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader('data.txt')
  reader2.onDataReady(data => {
    console.log(`Second call data: ${data}`)
  })
})
```
The preceding code will print the following:

```text
    First call data: some data
```
As you can see, the callback of the second reader is never invoked. Let's see why:

During the creation of reader1, our inconsistentRead() function behaves asynchronously because there is no cached result available. This means that any onDataReady listener will be invoked later in another cycle of the event loop, so we have all the time we need to register our listener.
Then, reader2 is created in a cycle of the event loop in which the cache for the requested file already exists. In this case, the inner call to inconsistentRead() will be synchronous. So, its callback will be invoked immediately, which means that all the listeners of reader2 will be invoked synchronously as well. However, we are registering the listener after the creation of reader2, so it will never be invoked.
The callback behavior of our inconsistentRead() function is really unpredictable as it depends on many factors, such as the frequency of its invocation, the filename passed as an argument, and the amount of time taken to load the file.

The bug that you've just seen can be extremely complicated to identify and reproduce in a real application. Imagine using a similar function in a web server, where there can be multiple concurrent requests. Imagine seeing some of those requests hanging, without any apparent reason and without any error being logged. This can definitely be considered a nasty defect.

Isaac Z. Schlueter, the creator of npm and former Node.js project lead, in one of his blog posts, compared the use of this type of unpredictable function to unleashing Zalgo.

Zalgo is an internet legend about an ominous entity believed to cause insanity, death, and the destruction of the world. If you're not familiar with Zalgo, you are invited to find out what it is.


[...]
Isaac Z. Schlueter, the creator of npm and former Node.js project lead, in one of his blog posts, compared the use of
unpredictable function to unleashing Zalgo.

[https://blog.izs.me/2013/08/designing-apis-for-asynchrony/] ― 2013-08-23

Zalgo is an internet legend about an ominous entity believed to cause insanity, death, and the destruction of the world. If you're not familiar with Zalgo, you are invited to find out what it is.
[...]

## § Guaranteeing asynchronicity with deferred execution

### process.nextTick()
... [Another alternative] ... is to make it purely asynchronous. The trick here is to schedule the synchronous callback invocation to be executed "in the future" instead of it being run immediately in the same event loop cycle. In Node.js, this is possible with process.nextTick(), which defers the execution of a function after the currently running operation completes. Its functionality is very simple: it takes a callback as an argument and pushes it to the top of the event queue, in front of any pending I/O event, and returns immediately. The callback will then be invoked as soon as the currently running operation yields control back to the event loop.

### setImmediate()
Another API for deferring the execution of code is setImmediate(). While its purpose is very similar to that of process.nextTick(), its semantics are quite different. Callbacks deferred with process.nextTick() are called microtasks and they are executed just after the current operation completes, even before any other I/O event is fired. With setImmediate(), on the other hand, the execution is queued in an event loop phase that comes after all I/O events have been processed. Since process.nextTick() runs before any already scheduled I/O, it will be executed faster, but under certain circumstances, it might also delay the running of any I/O callback indefinitely (also known as I/O starvation), such as in the presence of a recursive invocation. This can never happen with setImmediate().

### setTimeout(callback, 0)
Using setTimeout(callback, 0) has a behavior comparable to that of setImmediate(), but in typical circumstances, callbacks scheduled with setImmediate() are executed faster than those scheduled with setTimeout(callback, 0). To see why, we have to consider that the event loop executes all the callbacks in different phases; for the type of events we are considering, we have timers (setTimeout()) that are executed before I/O callbacks, which are, in turn, executed before setImmediate() callbacks. This means that if we queue a task with setImmediate() in a setTimeout() callback, in an I/O callback, or in a microtask queued after these two phases, then the callback will be executed in a phase that comes right after the phase we are currently in. setTimeout() callbacks have to wait for the next cycle of the event loop.
[...]

--//
Node.js Design Patterns [Third Edition]
Design and implement production-grade Node.js applications using proven patterns and techniques
― Mario Casciaro
― Luciano Mammino

Copyright © 2020 Packt Publishing All rights reserved.
ISBN 978-1-83921-411-0

First published: December 2014
Second Edition: July 2016
Third Edition: July 2020
--//

WITHOUT PERMISSION ― NOT UNDER MIT LICENSE ↑
 */
