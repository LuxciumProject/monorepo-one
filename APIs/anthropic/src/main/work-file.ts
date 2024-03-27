import Anthropic from '@anthropic-ai/sdk';
import { ContentBlock, Usage } from '@anthropic-ai/sdk/resources';
import { config } from 'dotenv';
import { create } from '../messages';
import { MessageItem } from '../messages/types/Message';
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
});
// )()
//   .then()
//   .catch(console.error);
// user_id?: string | null;
/*
  id: string;
  content: Array<ContentBlock>;
  model: string;
  role: 'assistant';
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  type: 'message';
  usage: Usage;

  // const userCall2 = create.userMessage('Please create a haiku.');
  // messages.push( messageFromAssistantTrimm(result1,'{'))  userCall2],
  const result2 = await client.messages.create({
    model: 'claude-3-haiku-20240307',
    temperature: 0.95,
    max_tokens: 1024,
    // HACK: Because the API doesn't allow for empty messages        !
    messages: [],
    system: '',
    metadata: { user_id: '123-testing' },
    stream: false,
    // temperature:0
    // top_k:0
    // top_p:0
  });
  return [result1, result2];
❯ ts-node "/projects/monorepo-one/APIs/anthropic/src/main/message-example.ts"
[
  {
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: 'Certainly! Here are three short dummy paragraphs that look like "LOREM IPSUM" but can be read as normal English text:\n' +
          '\n' +
          'Paragraph 1:\n' +
          "Relish the zest of life's vibrant tapestry, where every hue holds a tale untold. Embrace the dance of the seasons, as they waltz through the years, each step a symphony of growth and renewal. Savor the fleeting moments that weave the fabric of our existence, for it is in these precious fragments that we find the essence of true living.\n" +
          '\n' +
          'Paragraph 2:\n' +
          'Venture forth, my friend, and let your spirit soar on the wings of curiosity. Uncover the hidden gems that lie beyond the horizon, where the familiar gives way to the unexplored. Dare to step outside the bounds of the ordinary, for it is in the uncharted territories that we discover the true depth of our own resilience and the wonders that await.\n' +
          '\n' +
          'Paragraph 3:\n' +
          "Embrace the rhythm of the world around you, as the ebb and flow of life's tides carry you forward. Surrender to the gentle embrace of the present, where the chatter of the past and the whispers of the future fade into the background. In this moment, let your senses be awakened, your heart be filled, and your soul be nourished by the simple beauty that surrounds you, waiting to be discovered anew."
      }
    ]
  },
  {
    role: 'assistant',
    content: [
      {
        type: 'text',
        text: 'Here is a haiku for you:\n' +
          '\n' +
          'Gentle breeze whispers,\n' +
          'Petals drift, a fleeting dance,\n' +
          "Nature's tranquil grace."
      }
    ]
  }
]
[
  [
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'Certainly! Here are three short dummy paragraphs that look like "LOREM IPSUM" but can be read as normal English text:\n' +
            '\n' +
            'Paragraph 1:\n' +
            "Relish the zest of life's vibrant tapestry, where every hue holds a tale untold. Embrace the dance of the seasons, as they waltz through the years, each step a symphony of growth and renewal. Savor the fleeting moments that weave the fabric of our existence, for it is in these precious fragments that we find the essence of true living.\n" +
            '\n' +
            'Paragraph 2:\n' +
            'Venture forth, my friend, and let your spirit soar on the wings of curiosity. Uncover the hidden gems that lie beyond the horizon, where the familiar gives way to the unexplored. Dare to step outside the bounds of the ordinary, for it is in the uncharted territories that we discover the true depth of our own resilience and the wonders that await.\n' +
            '\n' +
            'Paragraph 3:\n' +
            "Embrace the rhythm of the world around you, as the ebb and flow of life's tides carry you forward. Surrender to the gentle embrace of the present, where the chatter of the past and the whispers of the future fade into the background. In this moment, let your senses be awakened, your heart be filled, and your soul be nourished by the simple beauty that surrounds you, waiting to be discovered anew."
        }
      ]
    },
    {
      inTokens: 'You can use 88889× this amout of tokens for 1.00$',
      outTokens: 'You can use 2581× this amout of tokens for 1.00$'
    }
  ],
  [
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: 'Here is a haiku for you:\n' +
            '\n' +
            'Gentle breeze whispers,\n' +
            'Petals drift, a fleeting dance,\n' +
            "Nature's tranquil grace."
        }
      ]
    },
    {
      inTokens: 'You can use 12233× this amout of tokens for 1.00$',
      outTokens: 'You can use 21053× this amout of tokens for 1.00$'
    }
  ]
]
 */
