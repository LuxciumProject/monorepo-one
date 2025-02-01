import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import readline, { Interface } from 'readline';
import { MessageItem, ModelReply } from '../messages/types';
import { sendClaudeHaiku } from '../models';
import { processArgv } from './processArgv';

/**
 * Sets up the readline interface for interactive command-line input and output.
 * It configures the input and output streams, as well as the terminal and prompt settings.
 * @returns {Interface} The configured readline interface.
 */
function setupReadlineInterface(): Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    prompt: 'You: ',
  });
}

/**
 * Loads the environment variables using the `dotenv` package.
 * This ensures that the API key for the Anthropic client is available.
 */
function loadEnvironmentVariables(): void {
  config();
}

/**
 * Processes the command-line arguments using the `processArgv` function.
 * This function likely validates and parses the arguments, returning a promise that resolves to the processed arguments.
 * @returns {Promise<any>} A promise that resolves to the processed command-line arguments.
 */
async function setupCommandLineArguments(): Promise<any> {
  return await processArgv(process.argv);
}

/**
 * Initializes the Anthropic client with the API key obtained from the environment variables.
 * @returns {Anthropic} The initialized Anthropic client.
 */
function initializeAnthropicClient(): Anthropic {
  return new Anthropic({ apiKey: process.env['anthropic_k00'] });
}

/**
 * Sends a message to the Anthropic API and handles the response.
 * @param {Anthropic} client - The Anthropic client instance.
 * @param {string} user_text - The text entered by the user.
 * @param {string} [system_text] - The optional system text to include in the message.
 * @param {MessageItem[]} previousMessages - The previous messages in the conversation.
 * @returns {Promise<MessageItem[]>} The updated list of previous messages.
 */
async function sendMessage(
  client: Anthropic,
  user_text: string,
  system_text: string = '',
  previousMessages: MessageItem[]
): Promise<MessageItem[]> {
  const resolvedArgv = await setupCommandLineArguments();
  try {
    const messages: ModelReply<'claude-3-haiku-20240307'> =
      await sendClaudeHaiku({
        client,
        previousMessages,
        system: system_text,
        user_text,
        user_prefix: '\nYou: ',
        assist_prefix: '\nClaude: ',
        max_tokens: resolvedArgv.max_tokens,
        user_id: resolvedArgv['user_id'] || null,
        temperature: resolvedArgv.temperature,
        top_k: resolvedArgv.top_k,
        top_p: resolvedArgv.top_p,
      });
    console.log(`Claude: ${messages.content[0].text}`);
    return messages.previousMessages;
  } catch (error) {
    console.error('Error with Anthropic API:', error);
    process.exit(14);
  }
}

/**
 * Handles the main chat loop, prompting the user for input and sending messages to the Anthropic API.
 * @param {Interface} rl - The readline interface.
 * @param {Anthropic} client - The Anthropic client instance.
 */
function chatLoop(rl: Interface, client: Anthropic) {
  let previousMessages: MessageItem[] = [];
  rl.prompt();
  rl.on('line', async line => {
    previousMessages = await sendMessage(
      client,
      line.trim(),
      '',
      previousMessages
    );
    rl.prompt();
  });
}

/**
 * Handles the signal for SIGINT (Ctrl+C) and SIGTSTP (Ctrl+Z).
 * It provides a smooth user experience by allowing the user to exit the program gracefully.
 * @param {string} signal - The signal to handle.
 * @returns {() => void} A function that handles the signal.
 */
function handleSignal(signal: string) {
  let ctrlCPressed = false;
  return () => {
    if (signal === 'SIGINT') {
      if (!ctrlCPressed) {
        console.log('\nCTRL+C pressed. Press again to exit.');
        ctrlCPressed = true;
        setTimeout(() => (ctrlCPressed = false), 1500);
      } else {
        console.log('\nExiting.');
        process.exit(0);
      }
    } else if (signal === 'SIGTSTP') {
      console.log('\nExiting chat...');
      process.exit(0);
    }
  };
}

/**
 * Sets up the signal handlers for SIGINT and SIGTSTP using the `handleSignal` function.
 * @param {Interface} rl - The readline interface.
 */
function setupSignalHandlers(rl: Interface) {
  const handleSIGINT = handleSignal('SIGINT');
  const handleSIGTSTP = handleSignal('SIGTSTP');
  process.on('SIGINT', handleSIGINT);
  process.on('SIGTSTP', handleSIGTSTP);
  rl.on('SIGINT', handleSIGINT);
  rl.on('close', handleSIGTSTP);
}

/**
 * The main function that sets up the application and starts the chat loop.
 */
async function main() {
  const rl = setupReadlineInterface();
  loadEnvironmentVariables();
  const client = initializeAnthropicClient();
  setupSignalHandlers(rl);
  chatLoop(rl, client);
}

main();
