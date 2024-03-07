/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { immediateZalgo } from './immediateZalgo';
import { nextTickZalgo } from './nextTickZalgo';
import { nullOrDefined } from './nullOrDefined';
import { timeoutZalgo } from './timeoutZalgo';

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
      timeoutZalgo(0, nullOrDefined(value));
  }

  return async (value: T | undefined): Promise<T | null> =>
    timeoutZalgo(delay, nullOrDefined(value));
}

// prettier-ignore
export const zalgo = <T>(value:T | undefined, delay?:TimeoutDelayType ): Promise<T | null> => zalgo_<T>(delay)(value);
// prettier-ignore
export const zalgo1 = (delay?:TimeoutDelayType) => <T>(value?:T | undefined): Promise<T | null> => zalgo_<T>(delay)(value);
// prettier-ignore
export const zalgo2 = <T>(value?:T | undefined) => (delay?:TimeoutDelayType ): Promise<T | null> => zalgo_<T>(delay)(value);

// prettier-ignore
export const zalgo3 = <T>(delay:TimeoutDelayType, value?:T | undefined): Promise<T | null> => zalgo_<T>(delay)(value);

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
WITHOUT PERMISSION ― NOT UNDER MIT LICENSE

[…] not to release Zalgo, possibly by using synthetic deferrals (say what?) so that you don’t make your API’s users unhappy. In the world of “lean” and MEAN MVPs, who has time to learn about leaky abstractions […]
― HissainMay 6, 2015 at 1:15 pm (https://blog.ometer.com/2011/07/24/callbacks-synchronous-and-asynchronous/)

Copyright © 2020 Packt Publishing All rights reserved.

Node.js Design Patterns [Third Edition]
― Mario Casciaro
― Luciano Mammino

3. Callbacks and Events
↓ Synchronous or asynchronous?
## § Unleashing Zalgo

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

 */
