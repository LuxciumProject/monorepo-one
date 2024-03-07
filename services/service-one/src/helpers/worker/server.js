#!/usr/bin/env node
'use strict';
import chalk from 'chalk';
import { createServer as createHTTP_Server } from 'http';
import { createServer as createTCP_Server } from 'net';
import { normalize } from 'node:path';

import { RpcWorkerPool } from './rpc-worker';

// import { RpcWorkerPool } from './rpc-worker_2';
// import { RpcWorkerPool } from './rpc-worker_3';

const [, , web_host, actor_host, threads] = process.argv;
const [web_hostname, web_port] = web_host.split(':');
const [actor_hostname, actor_port] = actor_host.split(':');

let message_id = 0;
let actors = new Set(); // collection of actor handlers
let messages = new Map(); // message ID -> HTTP response

const VERBOSE1 = false;
const VERBOSE2 = false;
// const controller = new AbortController();
// const { signal } = controller;
// dgram.createSocket({ type: 'udp4', signal }).on('message', (msg, rinfo) => {
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// ++ ----------------------------------------------------------------

createTCP_Server(client => {
  const handler = data => client.write(JSON.stringify(data) + '\0\n\0'); // <1>
  actors.add(handler);
  console.info('actor pool connected', actors.size, message_id);
  client
    .on('end', () => {
      actors.delete(handler); // <2>
      console.info('actor pool disconnected', actors.size);
    })
    .on('data', raw_data => {
      String(raw_data)
        .split('\0\n\0')
        .slice(0, -1)
        .forEach(chunk => {
          const data = JSON.parse(chunk);
          const res = messages.get(data.id);
          res.end(JSON.stringify(data) + '\0\n\0');
          messages.delete(data.id);
        });

      // const chunks = String(raw_data).split('\0\n\0'); // <3>
      // chunks.pop(); // <4>
      // for (let chunk of chunks) {
      //   const data = JSON.parse(chunk);
      //   const res = messages.get(data.id);
      //   res.end(JSON.stringify(data) + '\0\n\0');
      //   messages.delete(data.id);
      // }
    });
}).listen(Number(actor_port), actor_hostname, () => {
  console.info(
    '\n\n> ' +
      chalk.green('actor: ') +
      chalk.yellow(`tcp:\/\/${actor_hostname}`) +
      ':' +
      chalk.magenta(`${actor_port}`)
  );
});

// ++ ----------------------------------------------------------------

createHTTP_Server(async (req, res) => {
  message_id++;

  if (actors.size === 0) return res.end('ERROR: EMPTY ACTOR POOL');

  const actor = randomActor();

  messages.set(message_id, res);

  VERBOSE2 &&
    console.log(
      req.url.split('/').slice(1, 2).pop(),
      req.url.split('/').slice(2, 3).pop(),
      '\n',
      decodeURI(req.url.split('/').slice(3).join('/'))
    );

  actor({
    id: message_id,
    method: req.url.split('/').slice(1, 2).pop(),
    args: [
      normalize('/' + decodeURI(req.url.split('/').slice(3).join('/'))),
      Number(req.url.split('/').slice(2, 3).pop()) + 1,
    ],
  });
  chalk.yellow;
}).listen(Number(web_port), web_hostname, () => {
  console.info(
    '> ' +
      chalk.green('web:  ') +
      chalk.yellow(`http:\/\/${web_hostname}`) +
      ':' +
      chalk.magenta(`${web_port}`)
  );
});
// ++ ----------------------------------------------------------------

function randomActor() {
  const pool = [...actors];
  return pool[Math.floor(Math.random() * pool.length)];
}

// ++ ---- PART TWO BEGINS BELOW -------------------------------------
// HACK:------ Hard coded path will cause problems MUST FIX ----------
const worker = new RpcWorkerPool(
  '/home/luxcium/projects/phash-scout/out/API/worker/worker.js',
  Number(threads || 0),
  'roundrobin'
);

actors.add(async data => {
  VERBOSE1 && console.log('actors.add', data);
  const value = await worker.exec(data.method, data.id, ...data.args);
  const reply =
    JSON.stringify({
      jsonrpc: '2.0',
      id: data.id,
      value,
      pid: 'server:' + process.pid + ' (' + data.id + ')',
    }) + '\0\n\0';

  messages.get(data.id).end(reply);
  messages.delete(data.id);
});

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
