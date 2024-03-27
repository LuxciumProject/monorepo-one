import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
config();

const key = {
  apiKey: process.env['monorepo-one_000x'],
};
const client = new Anthropic(key);
void async function main() {
  const stream = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    stream: true,
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: 'Hey Claude!',
      },
    ],
  });

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      process.stdout.write(event.delta.text);
    }
  }
  process.stdout.write('\n');
};

async function main() {
  const stream = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    stream: true,
    max_tokens: 500,
    messages: [
      {
        role: 'user',
        content: 'Hey Claude!',
      },
    ],
  });
  const fullBuffer: any[] = [];
  let buffer: string[] = [''];
  for await (const event of stream) {
    fullBuffer.push(event);
    console.dir(event, { depth: null });
    if (event.type === 'content_block_start') {
      buffer.push(event.content_block.text);
    }
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      buffer.push(event.delta.text);
      process.stdout.write(event.delta.text);
    }
  }
  const text = buffer.join('');
  process.stdout.write('\n');
  console.log('SUM:', sumUsage(fullBuffer));
  console.log('BUFFER:', text);
}
main();
type Usage =
  | { usage: { input_tokens?: number; output_tokens?: number } }
  | { message: { usage: { input_tokens: number; output_tokens: number } } };

function sumUsage(messages: Usage[]): {
  totalInputTokens: number;
  totalOutputTokens: number;
} {
  let totalInputTokens = 0;
  let totalOutputTokens = 0;

  for (const item of messages) {
    if ('usage' in item) {
      totalInputTokens += item.usage.input_tokens || 0;
      totalOutputTokens += item.usage.output_tokens || 0;
    } else if ('message' in item && 'usage' in item.message) {
      totalInputTokens += item.message.usage.input_tokens;
      totalOutputTokens += item.message.usage.output_tokens;
    }
  }

  return { totalInputTokens, totalOutputTokens };
}

// // Example usage:
// const usages: Usage[] = [
//   { input_tokens: 10, output_tokens: 1 },
//   { input_tokens: 20 },
//   { output_tokens: 2 },
//   {},
// ];

// const totals = sumUsage(usages);
// console.log(totals); // prints { totalInputTokens: 30, totalOutputTokens: 3 }
/*
❯ ts-node "/projects/monorepo-one/APIs/anthropic/src/demos/raw-streaming.ts"
{
  type: 'message_start',
  message: {
    id: 'msg_01RwLuRMogajDEku3A9UYMRg',
    type: 'message',
    role: 'assistant',
    content: [],
    model: 'claude-3-opus-20240229',
    stop_reason: null,
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 1 }
  }
}
{
  type: 'content_block_start',
  index: 0,
  content_block: { type: 'text', text: '' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: 'Hello' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: '!' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' It' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: "'s" }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' nice' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' to' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' meet' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' you' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: '.' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' How' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' can' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' I' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' assist' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' you' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: ' today' }
}
{
  type: 'content_block_delta',
  index: 0,
  delta: { type: 'text_delta', text: '?' }
}
{ type: 'content_block_stop', index: 0 }
{
  type: 'message_delta',
  delta: { stop_reason: 'end_turn', stop_sequence: null },
  usage: { output_tokens: 19 }
}
{ type: 'message_stop' }
 */
