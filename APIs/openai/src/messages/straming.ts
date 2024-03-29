#!/usr/bin/env node

import { config } from 'dotenv';
import openai from 'openai';
// import    { Configuration, OpenAIApi } from 'openai';
// import { Configuration, OpenAIApi } from 'openai';

config();

// const configuration = new Configuration({
//   apiKey: process.env['OPENAI_API_KEY'] || '',
//   organization: process.env['OPENAI_ORG_ID'],
// });

const openaiApi = new openai({
  apiKey: process.env['OPENAI_API_KEY'] || '',
  organization: process.env['OPENAI_ORG_ID'],
});

async function main() {
  const stream = await openaiApi.chat.completions.create({
    model: 'gpt-4',

    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant',
      },
      {
        role: 'user',
        content: 'Say this is a test, then present yourself please',
      },
    ],

    stream: true,
  });
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
