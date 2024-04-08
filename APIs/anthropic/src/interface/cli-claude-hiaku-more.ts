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
import { MessageItem, ModelReply } from '../messages/types';
import { sendClaudeHaiku } from '../models';
import { makeSystemBlock } from './makeSystemBlock';
import { prepareJsonSystemMessage } from './systemNessage';
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
    JSON: { type: 'boolean', describe: 'Output JSON response', default: false },
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
    const paramClaude = prepareJsonSystemMessage(
      system_text,
      'Claude 3: ',
      resolvedArgv
    );
    if (resolvedArgv.JSON) {
      const useJSON = `Do not say anything, do not acknowledge and do not introduce or do not conclude. All must ben valid JSON or will be discarded by the system.\n\n Ensure that the data is accurately represented and properly formatted within the JSON structure. The resulting JSON table should provide a clear, structured overview of the information presented in the original text. \n\n"resolvedArgv.JSON" = ${resolvedArgv.JSON}\n JSON MODE IS ENABLED`;

      paramClaude.system = makeSystemBlock(
        system_text
          ? `"system": "Follow the instruction to generate the JSON OUTPUT you first need to ingest the system_text: « ${system_text} » Generate your output following the system_text but anything you reply must be a valid JSON Object:\n\n${useJSON}"`
          : `\n"system": "${useJSON}"`
      );
    }

    paramClaude.assist_prefix = resolvedArgv.JSON ? '\n{' : '\nclaude:';
    const messages: ModelReply<'claude-3-haiku-20240307'> =
      await sendClaudeHaiku({
        client,
        previousMessages,
        system: system_text || '',
        user_text,
        user_prefix: '\nYou: ',
        assist_prefix: '\nClaude3: ',
        max_tokens: resolvedArgv.max_tokens,
        user_id: argv['user_id'] || null,
        temperature: resolvedArgv.temperature,
        top_k: resolvedArgv.top_k,
        top_p: resolvedArgv.top_p,
        ...paramClaude,
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
