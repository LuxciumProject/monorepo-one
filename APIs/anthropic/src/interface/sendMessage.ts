import Anthropic from '@anthropic-ai/sdk';
import { Stream } from '@anthropic-ai/sdk/streaming';
import { config } from 'dotenv';
import { hideBin } from 'yargs/helpers';
import { sendClaudeHaiku } from '../constants/models';
import { MessageItem, ModelReply } from '../messages/types';
import yargs = require('yargs');

/**
 * Command line arguments for the CLI tool.
 */
// const argv = yargs(hideBin(process.argv))
//   .option('max_tokens', {
//     alias: 'm',
//     describe: 'The maximum number of tokens to generate',
//     type: 'number',
//     default: 1024,
//   })
//   .option('user_id', {
//     alias: 'u',
//     describe: 'User ID for personalized responses',
//     type: 'string',
//   })
//   .option('temperature', {
//     alias: 't',
//     describe: 'Controls randomness of the response',
//     type: 'number',
//     default: 0.95,
//   })
//   .option('top_k', {
//     alias: 'k',
//     describe: 'Filters the most likely next tokens',
//     type: 'number',
//   })
//   .option('top_p', {
//     alias: 'p',
//     describe: 'Nucleus sampling',
//     type: 'number',
//   })
//   .help()
//   .alias('help', 'h').argv;
const argv = yargs(hideBin(process.argv))
  .options({
    max_tokens: {
      type: 'number',
      describe: 'The maximum number of tokens to generate',
      default: 1024,
    },
    user_id: { type: 'string', describe: 'User ID for personalized responses' },
    temperature: {
      type: 'number',
      describe: 'Controls randomness of the response',
      default: 0.95,
    },
    top_k: { type: 'number', describe: 'Filters the most likely next tokens' },
    top_p: { type: 'number', describe: 'Nucleus sampling' },
  })
  .help().argv;

/**
 * Sends a message to the Anthropic API and logs the response.
 * @param user_text The text message to send.
 * @returns A Promise that resolves to void.
 */
export async function sendMessage(
  user_text: string,
  system_text: string,
  previousMessages: MessageItem[]
) {
  config();
  const client = new Anthropic({ apiKey: process.env['anthropic_k00'] });
  try {
    const resolvedArgv = await argv;
    const messages: ModelReply<'claude-3-haiku-20240307'> =
      await sendClaudeHaiku({
        client,
        previousMessages,
        system: system_text || '',
        user_text,
        user_prefix: '\nYou: ',
        assist_prefix: '\nClaude: ',
        max_tokens: resolvedArgv.max_tokens,
        user_id: argv['user_id'] || null,
        temperature: resolvedArgv.temperature,
        top_k: resolvedArgv.top_k,
        top_p: resolvedArgv.top_p,
      });
    const { previousMessages: nextMessages } = messages;
    // console.log(`Claude: ${messages.content[0].text}`);
    console.log(`Claude: ${messages.content[0].text}`);

    return nextMessages;
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error);
  }
}

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

async function streamMessages(
  client: Anthropic,
  user_text: string,
  system_text: string = ''
) {
  const stream = client.messages.stream(user_text, system_text); // Hypothetical API call

  stream.on('data', message => {
    process.stdout.write(`Claude: ${message.text}`);
    // Adjust as needed to handle the specific data structure
  });

  stream.on('end', () => {
    process.stdout.write('\nEnd of message stream.\n');
    rl.prompt(); // Prompt for next input after stream ends
  });

  stream.on('error', error => {
    process.stdout.write(`\nStream error: ${error}\n`);
    rl.prompt(); // Ensure the prompt returns in case of error
  });
}
