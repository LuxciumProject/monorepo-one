#!/usr/bin/env -S npm run tsn -T

import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { MODEL } from '../models';

// gets API Key from environment variable ANTHROPIC_API_KEY
config();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
const messageRecieved = {
  type: 'message',
  role: 'assistant',
  content: [] as Anthropic.Messages.ContentBlock[],
};
async function main() {
  const messages = [
    {
      role: 'user',
      content: `Hey Claude! How can I recursively list all files in a directory in Rust?`,
    } as const,
  ];

  const stream = client.messages
    .stream({
      messages,
      model: MODEL.claudeHaiku,
      max_tokens: 500,
    })
    // Once a content block is fully streamed, this event will fire
    .on('contentBlock', (content: Anthropic.Messages.ContentBlock) => {
      console.log('contentBlock', content);
      messageRecieved.content = [content];
    })
    // Once a message is fully streamed, this  event will fire
    .on('message', message => {
      // console.log('message', message)
      return message;
    })
    .on('streamEvent', (event: Anthropic.Messages.MessageStreamEvent) => {
      // console.log('streamEvent', event)
      return event;
    });
  stream;
  for await (const event of stream) {
    // console.log('event', event);
  }

  const finalText = await stream.finalText();
  const message = await stream.finalMessage();
  // console.log('finalMessage', message);
  // console.log('finalText', finalText);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

// | MessageStartEvent
// | MessageDeltaEvent
// | MessageStopEvent
// | ContentBlockStartEvent
// | ContentBlockDeltaEvent
// | ContentBlockStopEvent;

/*
  MIT License

  Copyright 2023 Anthropic, PBC.

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
