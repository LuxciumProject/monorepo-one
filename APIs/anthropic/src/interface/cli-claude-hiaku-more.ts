#!/usr/bin/env ts-node
/**
 * This script is used to interact with the Anthropic AI API and create a chat interface with the "Claude" model.
 * It allows users to send messages and receive responses from the model.
 * The script takes command-line arguments to customize the behavior of the model.
 * It uses the yargs library for parsing command-line arguments and the readline library for interactive input.
 * The main function sets up the chat loop and handles user input.
 * The sendMessage function sends a user message to the Anthropic API and receives a response from the model.
 * The script also handles clean shutdown on signal when pressing CTRL+C twice in a row.
 * @module cli-claude-haiku
 */

import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import { createInterface, type Interface } from 'readline';
import { hideBin } from 'yargs/helpers';
import { sendClaudeHaiku } from '../constants/models';
import { MessageItem, ModelReply } from '../messages/types';
import yargs = require('yargs');

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

const prompt = 'You: ';
let ctrlCPressed = false;

const createRl = () =>
  createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt,
  });

const rl = createRl();

function logAndExit(message: string, exitCode: number) {
  console.log(message);
  return process.exit(exitCode);
}

const handleSIGINT = (rl: Interface) => () => {
  if (!ctrlCPressed) {
    console.log('\nCTRL+C pressed. Press again to exit.');
    ctrlCPressed = true;
  } else {
    logAndExit('\nCTRL+C pressed twice. Exiting.', 0);
    rl.close();
  }
  setTimeout(() => {
    ctrlCPressed = false;
  }, 1500);
};

const handleSIGTSTP = (rl: Interface) => () => {
  logAndExit('\nExiting chat...', 0);
  rl.close();
};

const handleLine =
  (rl: Interface, msgObj: { messages: MessageItem[] }) =>
  async (line: string) => {
    const system_text = '';
    const messages = msgObj.messages;
    const previousMessages = await sendMessage(
      line.trim(),
      system_text,
      messages
    );
    msgObj.messages = previousMessages;
    return rl.prompt();
  };

function main(rl: Interface) {
  const msgObj: { messages: MessageItem[] } = { messages: [] };
  rl.prompt();
  rl.on('SIGINT', handleSIGINT(rl))
    .on('close', handleSIGTSTP(rl))
    .on('line', handleLine(rl, msgObj));
}

main(rl);

process.on('SIGINT', handleSIGINT(rl));
process.on('SIGTSTP', handleSIGTSTP(rl));

export function makeSystemBlock(systemText: string) {
  return `
/**
* System prompt.
*
* A system prompt is a way of providing context and instructions to Claude, such
* as specifying a particular goal or role. See our
* [guide to system prompts](https://docs.anthropic.com/claude/docs/system-prompts).
*/
<SYSTEM>
  ${systemText}
</SYSTEM>
`
    .trim()
    .split('\n')
    .map(sysText => sysText.trim())
    .join('\n');
}

void makeSystemBlock(
  'Tu es Claude un assistant IA créé par Anthropic pour être utile, honnête et inoffensif.'
);
