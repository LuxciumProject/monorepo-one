#!/usr/bin/env -S npm run tsn -T

import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { MODEL } from '../models';

// gets API Key from environment variable ANTHROPIC_API_KEY
config();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * This script demonstrates two ways of cancelling a stream,
 * by racing to see whether some Rust code prints "unwrap"
 * before 1.5 seconds or not.
 *
 * The most common is simply to `break` from the loop,
 * but you can also call `stream.controller.abort()` from outside the loop
 * if you need to.
 */
async function main() {
  const question =
    'Hey Claude! How can I recursively list all files in a directory in Rust?';

  const stream = await client.messages.create({
    model: MODEL.claudeHaiku,
    stream: true,
    max_tokens: 500,
    messages: [{ role: 'user', content: question }],
  });

  // If you need to, you can cancel a stream from outside the iterator
  // by calling "stream.controller.abort()"
  const timeout = setTimeout(() => {
    console.log('\nCancelling after 1.25 seconds.');
    stream.controller.abort();
  }, 1250);

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      process.stdout.write(event.delta.text);

      // Most typically, you can cancel the stream by using "break"
      if (event.delta.text.includes('unwrap')) {
        console.log('\nCancelling after seeing "unwrap".');
        clearTimeout(timeout);
        break;
      }
    }
  }
}

main();

/*
  MIT License

  Copyright 2023 Anthropic, PBC.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
