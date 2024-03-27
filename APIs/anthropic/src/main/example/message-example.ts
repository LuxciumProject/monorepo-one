import Anthropic from '@anthropic-ai/sdk';
import { ContentBlock, Usage } from '@anthropic-ai/sdk/resources';
import { config } from 'dotenv';
import { create } from '../../messages';
import { MessageItem } from '../../messages/types/Message';
config();
const key = {
  apiKey: process.env['monorepo-one_000x'],
};

export type ClaudeModel<M extends `claude-${string}`> = M;
// | ((
//     client: Anthropic,
//     system?: string,
//     user_text?: string,
//     assist_text?: string,
//     max_tokens?: number,
//     user_id?: string | null,
//     temperature?: number,
//     top_k?: number,
//     top_p?: number
//   ) => Promise<Anthropic.Messages.Message[]>);

// body: MessageParams
export const createClaude = <M extends string>(model: M) => {
  const createClaudeInstance = async ({
    client,
    system = '',
    user_text = '',
    assist_text = '',
    max_tokens = 1024,
    user_id = null,
    temperature = 0.95,
    top_k,
    top_p,
  }: MessageParams): Promise<ModelReply<M>> => {
    // const model:M = 'claude-3-haiku-20240307';
    const stream = false;
    const metadata: { user_id?: string | null } = { user_id };
    const messages: MessageItem[] = [];
    messages.push(create.userMessage(user_text));
    messages.push(create.assistantMessage(assist_text));
    const {
      id,
      content,
      model: replyModel,
      role,
      stop_reason,
      stop_sequence,
      type: messageType,
      usage,
    } = await client.messages.create({
      model,
      max_tokens,
      temperature,
      system,
      messages,
      stream,
      top_k,
      top_p,
      metadata,
    });

    const [{ text: replyText, type: replyType }] = content;
    const { input_tokens, output_tokens } = usage;
    return {
      role, // "assistant"
      model, // "claude-3-haiku-20240307"
      replyModel, // string
      replyType, // "text"
      replyText, // string
      content, // Array<ContentBlock>
      stop_reason, // "end_turn"
      stop_sequence, // null
      id, // string
      messageType, // "message"
      usage, // Usage
      input_tokens, // number
      output_tokens, // number
    };
  };
  return createClaudeInstance;
};

export interface ModelReply<M extends string> {
  role: 'assistant';
  model: M;
  replyModel: string;
  replyType: 'text';
  replyText: string;
  content: Array<ContentBlock>;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  id: string;
  messageType: 'message';
  usage: Usage;
  input_tokens: number;
  output_tokens: number;
}

const claudeHaiku: ClaudeModel<'claude-3-haiku-20240307'> =
  'claude-3-haiku-20240307' as const;

claudeHaiku;
const haiku: Haiku<typeof claudeHaiku> = createClaude(claudeHaiku);
haiku;
type Haiku<M extends `claude-3-haiku-${string}`> = (
  MessageParams
) => Promise<ModelReply<M>>;

interface MessageParams {
  client: Anthropic;
  system: string;
  user_text?: string;
  assist_text?: string;
  max_tokens?: number;
  user_id?: string | null;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
void (async () => {
  const client = new Anthropic(key);

  const system_instruction: string = `Create a text in english that looks like LOREM IPSUM but that can be read as it is normal english text. Create 3 short dummy paragrafs using that technique. Reply in JSON format.'`;
  const messages = await haiku({
    client,
    system: system_instruction,
  });
  console.dir(messages, { depth: null });
  // const values = messages.map(message =>
  //   messageFromAssistantTrimm(message, '', '')
  // );
  // const resultMessage = messages.map(messageFromAssistantWithUsageString);
  // console.dir(values, { depth: null });
  // console.dir(resultMessage, { depth: null });
})()
  .then()
  .catch(console.error);
