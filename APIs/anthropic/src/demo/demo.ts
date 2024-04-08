#!/usr/bin/env -S npm run tsn -T

import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { MODEL } from '../models';

// gets API Key from environment variable ANTHROPIC_API_KEY
config();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const messages = [
  {
    role: 'user',
    content: 'Hey Claude!?',
  } as const,
];
async function main() {
  const result = await client.messages.create({
    messages,
    model: MODEL.claudeHaiku,
    max_tokens: 1024,
  });
  console.dir(result);
}

main();
// ❯ ts-node "/projects/monorepo-one/APIs/anthropic/src/demo/demo.ts"
// {
//   id: 'msg_01B3Jj1Ut4rzh1uZ8wBJFLhJ',
//   type: 'message',
//   role: 'assistant',
//   content: [ { type: 'text', text: 'Hello! How can I assist you today?' } ],
//   model: 'claude-3-opus-20240229',
//   stop_reason: 'end_turn',
//   stop_sequence: null,
//   usage: { input_tokens: 11, output_tokens: 12 }
// }

/*
  MIT License

  Copyright 2023 Anthropic, PBC.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
