// /projects/monorepo-one/APIs/anthropic/src/interface/claude-cli.ts
import Anthropic from '@anthropic-ai/sdk';
import {
  ContentBlockDeltaEvent,
  ContentBlockStartEvent,
  ContentBlockStopEvent,
  MessageCreateParams,
  MessageDeltaEvent,
  MessageParam,
  MessageStartEvent,
  MessageStopEvent,
} from '@anthropic-ai/sdk/resources';
import type { Stream } from '@anthropic-ai/sdk/streaming';
import { config } from 'dotenv';
import readline, { Interface } from 'readline';
import { MODEL } from '../constants/models';
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
      // SIDE EFFECT: Write the delta text to the stdout -------------
      process.stdout.write(event.delta.text);
    } else if (event.type === 'message_delta') {
      usage.output_tokens += event.usage.output_tokens;
    } else if (event.type === 'message_start' && event.message.usage) {
      usage.output_tokens += event.message.usage.output_tokens;
    } else {
      // SIDE EFFECT: Write new line to the stdout -------------------
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
    // INFO: here I a messages: ModelReply
    // INFO: but I instead need a messages: Array<MessageParam>;
    // const modelReply: ModelReply<'claude-3-haiku-20240307'> =
    // await sendClaudeHaiku(
    const someRequest = {
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
    };
    // );
    // void modelReply;
    void someRequest;
    const messages: any = null;
    const stream: Stream<Anthropic.Messages.MessageStreamEvent> =
      await client.messages.create({
        model: MODEL.claudeHaiku,
        stream: true,
        max_tokens: 500,
        messages,
      });
    stream;
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

export type MessageStreamEvent =
  | MessageStartEvent
  | MessageDeltaEvent
  | MessageStopEvent
  | ContentBlockStartEvent
  | ContentBlockDeltaEvent
  | ContentBlockStopEvent;
export type MessageCreateParamsNonStreaming =
  Anthropic.Messages.MessageCreateParamsNonStreaming;

export interface MessageCreateParamsBase {
  max_tokens: number;
  messages: Array<MessageParam>;
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';
  metadata?: MessageCreateParams.Metadata;
  stop_sequences?: Array<string>;
  stream?: boolean;
  system?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
