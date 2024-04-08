// /projects/monorepo-one/APIs/anthropic/src/interface/claude-cli.ts
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
import readline, { Interface } from 'readline';
import { MessageItem, ModelReply } from '../messages/types';
import { sendClaudeHaiku } from '../models';
import { processArgv } from './processArgv';

// Setup readline interface for interactive CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,

  terminal: true,
  prompt: 'You: ',
});
// Load environment variables
config();
// Setup command-line arguments
const argv = processArgv(process.argv);
// Initialize Anthropic client
const client = new Anthropic({ apiKey: process.env['anthropic_k00'] });
// Main chat function
async function sendMessage(
  client: Anthropic,
  user_text: string,
  system_text: string = '',
  previousMessages: MessageItem[]
): Promise<MessageItem[]> {
  const resolvedArgv = await argv;
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
        user_id: argv['user_id'] || null,
        temperature: resolvedArgv.temperature,
        top_k: resolvedArgv.top_k,
        top_p: resolvedArgv.top_p,
      });
    console.log(`Claude: ${messages.content[0].text}`);
    return messages.previousMessages;
  } catch (error) {
    console.error('Error with Anthropic API:', error);
    return process.exit(14);
  }
}
// Chat loop handling user input
function chatLoop(rl: Interface) {
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
// Enhanced signal handling for a smoother user experience
let ctrlCPressed = false;
// Register signal handlers
const handleSIGINT = handleSignal('SIGINT');
const handleSIGTSTP = handleSignal('SIGTSTP');
process.on('SIGINT', handleSIGINT);
process.on('SIGTSTP', handleSIGTSTP);
rl.on('SIGINT', handleSIGINT);
rl.on('close', handleSIGTSTP);
function handleSignal(signal: string) {
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

// Initialize chat
chatLoop(rl);
