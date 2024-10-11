#!/usr/bin/env node

import { openaiApi } from '../lib';

async function main() {
  const stream = await openaiApi.chat.completions.create({
    model: 'o1-mini',

    messages: [
      {
        role: 'system',
        content: `You are a gpt-4o-mini helpful assistant, you ahve been developed by a team of engineers at one of the world leading AI compagnies, date of release is october 2023, you are here to help the user with any questions they might have the date today is ${new Date().toDateString()}`,
      },
      {
        role: 'user',
        content:
          'Say this is a test, then present yourself please, give your name and your base model along with the company behind it, the current date and the data set cut off date',
      },
    ],

    stream: true,
  });
  process.stdout.write('\n');
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
  process.stdout.write('\n\n');
}

main();
