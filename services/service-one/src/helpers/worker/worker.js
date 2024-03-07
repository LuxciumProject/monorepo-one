'use strict';
// #!! Consumed by the RpcWorkerPool class via path to file.

import { parentPort } from 'worker_threads';

import { commands } from './commands';

function asyncOnMessageWrap(fn) {
  return async function (msg) {
    try {
      void parentPort.postMessage(await fn(msg));
    } catch (error) {
      logError(error);
    }
  };
}

void parentPort.on(
  'message',
  asyncOnMessageWrap(async ({ method, params, id }) => {
    const messageRPC = {
      jsonrpc: '2.0',
      id,
      pid: 'worker:' + process.pid,
    };
    try {
      const resultRPC = await commands[method](...params);
      return { ...messageRPC, result: resultRPC };
    } catch (error) {
      const errorRPC = {
        code: -32_603,
        message:
          'Internal error!!! (Internal JSON-RPC error). ' +
          (error.message || ''),
        data: error,
      };
      logMedium(String({ ...messageRPC, error: errorRPC }));
      return { ...messageRPC, error: errorRPC };
    }
  })
);

/* **************************************************************** */
/*                                                                  */
/*  MIT LICENSE                                                     */
/*                                                                  */
/*  Copyright © 2021-2022 Benjamin Vincent Kasapoglu (Luxcium)      */
/*                                                                  */
/*  NOTICE:                                                         */
/*  O’Reilly Online Learning                                        */
/*                                                                  */
/*  Title: “Multithreaded JavaScript”                               */
/*  Author: “by Thomas Hunter II and Bryan English”                 */
/*  Publisher: “O’Reilly”                                           */
/*  Copyright: “© 2022 Thomas Hunter II and Bryan English”          */
/*  ISBN: “978-1-098-10443-6.”                                      */
/*                                                                  */
/*  Using Code Examples                                             */
/*  Supplemental material (code examples, exercises, etc.)          */
/*  is available for download at                                    */
/*  https://github.com/MultithreadedJSBook/code-samples.            */
/*                                                                  */
/*  In general, if example code is offered with this book, you may  */
/*  use it in your programs and documentation. You do not need to   */
/*  contact us for permission unless you’re reproducing a           */
/*  significant portion of the code. For example, writing a         */
/*  program that uses several chunks of code from this book does    */
/*  not require permission. Selling or distributing examples from   */
/*  O’Reilly books does require permission. Answering a question by */
/*  citing this book and quoting example code does not require      */
/*  permission. Incorporating a significant amount of example code  */
/*  from this book into your product’s documentation does require   */
/*  permission.                                                     */
/*                                                                  */
/*  If you feel your use of code examples falls outside fair use or */
/*  the permission given above, feel free to contact us at          */
/*  permissions@oreilly.com.                                        */
/*                                                                  */
/* **************************************************************** */
