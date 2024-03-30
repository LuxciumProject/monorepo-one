#!/usr/bin/env -S npm run tsn -T

import Anthropic from '@anthropic-ai/sdk';
import { Stream } from '@anthropic-ai/sdk/streaming';
import { config } from 'dotenv';
import { MODEL } from '../constants/models';

// gets API Key from environment variable ANTHROPIC_API_KEY
config();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const messages = [
    {
      role: 'user',
      content: `Hey Claude! How can I recursively list all files in a directory in Rust?`,
    } as const,
  ];
  const usage = { output_tokens: 0, input_tokens: 0 };
  const stream = await client.messages.create({
    model: MODEL.claudeHaiku,
    stream: true,
    max_tokens: 500,
    messages,
  });

  console.log('Usage:', await streamer(stream, usage));
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function streamer(
  stream: Stream<Anthropic.Messages.MessageStreamEvent>,
  usage: { output_tokens: number; input_tokens: number }
) {
  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      process.stdout.write(event.delta.text);
    } else if (event.type === 'message_delta') {
      usage.output_tokens += event.usage.output_tokens;
    } else if (event.type === 'message_start' && event.message.usage) {
      usage.output_tokens += event.message.usage.output_tokens;
    } else {
      process.stdout.write('\n');
    }
  }
  return usage;
}
/*
  MIT License

  Copyright 2023 Anthropic, PBC.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
