// /projects/monorepo-one/APIs/anthropic/src/interface/claude-cli.ts
import Anthropic from '@anthropic-ai/sdk';
import type { Stream } from '@anthropic-ai/sdk/streaming';
import { config } from 'dotenv';
import readline, { Interface } from 'readline';
import { MODEL, sendClaudeHaiku } from '../constants/models';
import type { MessageItem } from '../messages/types';
import { processArgv } from './processArgv';

// Setup readline interface for interactive CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You: ',
});
// Load environment variables
config();
// Setup command-line arguments
const argv = processArgv(process.argv);
// Initialize Anthropic client
const client = new Anthropic({ apiKey: process.env['anthropic_k00'] });
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
// Main chat function
async function sendMessageToStreamer(
  client: Anthropic,
  user_text: string,
  system_text: string = '',
  previousMessages: MessageItem[]
): Promise<MessageItem[]> {
  const resolvedArgv = await argv;
  try {
    const messages = await sendClaudeHaiku({
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
    const stream = await client.messages.create({
      model: MODEL.claudeHaiku,
      stream: true,
      max_tokens: 500,
      messages,
    });
    const usage = { output_tokens: 0, input_tokens: 0 };

    await streamer(stream, usage);
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
    previousMessages = await sendMessageToStreamer(
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
