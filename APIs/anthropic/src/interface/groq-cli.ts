import { config } from 'dotenv';
import Groq from 'groq-sdk';

config();
// UserTextMessage<string> | AssistantTextMessage<string>
export type GroqMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};

// role: 'system' | 'user' | 'assistant' | 'tool';
// CreateMessage for role 'system' | 'user' | 'assistant' | 'tool';
export function createMessage(
  role: 'system' | 'user' | 'assistant' | 'tool',
  content: string
): GroqMessage {
  return { role, content };
}
function extractSystemMessageObject(
  messages: GroqMessage[]
): SystemMessage | null {
  if (messages.length > 0 && messages[0].role === 'system') {
    const [, ...restMessages] = messages;
    return { system: messages[0].content, messages: restMessages };
  }
  return null;
}

type SystemMessage = { system: string; messages: GroqMessage[] };

function extractSystemMessageList(system: SystemMessage): GroqMessage[] {
  return [{ role: 'system', content: system.system }, ...system.messages];
}

function prependSystemMessage(
  system: string,
  messages: GroqMessage[]
): GroqMessage[] {
  return [{ role: 'system', content: system }, ...messages];
}

const groq_: Groq = new Groq({
  apiKey: process.env['monorepo_one_GROQ'],
});

void groq_;

('use strict');
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  process.stdout.write(chatCompletion.choices[0]?.message?.content || '');
}
main();
// role: 'system' | 'user' | 'assistant' | 'tool';

/**
 * Get a chat completion from the Groq API.
 */

async function getGroqChatCompletion() {
  const createOptions = {
    messages: [
      {
        role: 'user',
        content: 'Explain the importance of low latency LLMs',
      },
    ],
    model: 'mixtral-8x7b-32768',
  };
  const resultRaw = groq.chat.completions.create(createOptions);
  const result: Groq.Chat.Completions.ChatCompletion = await resultRaw;
  return result;
}

// The combined body type for a non-streaming chat completion request
export interface ChatCompletionCreateParamsNonStreaming {
  messages: Array<{
    content: string;
    role: 'system' | 'user' | 'assistant' | 'tool';
    name?: string;
    tool_call_id?: string;
    tool_calls?: Array<{
      id?: string;
      function?: {
        arguments?: string;
        name?: string;
      };
      type?: string;
    }>;
  }>;
  model: string;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  logprobs?: boolean;
  max_tokens?: number;
  n?: number;
  presence_penalty?: number;
  response_format?: {
    type?: string;
  };
  seed?: number;
  stop?: string | null | Array<string>;
  temperature?: number;
  tool_choice?: {
    string?: string;
    toolChoice?: {
      function?: {
        name?: string;
      };
      type?: string;
    };
  };
  tools?: Array<{
    function?: {
      description?: string;
      name?: string;
      parameters?: Record<string, unknown>;
    };
    type?: string;
  }>;
  top_logprobs?: number;
  top_p?: number;
  user?: string;
  stream?: false;
}

// The combined return type for a non-streaming chat completion request
export interface ChatCompletion {
  choices: Array<{
    finish_reason: string;
    index: number;
    logprobs: {
      content?: Array<{
        token?: string;
        bytes?: Array<number>;
        logprob?: number;
        top_logprobs?: Array<{
          token?: string;
          bytes?: Array<number>;
          logprob?: number;
        }>;
      }>;
    };
    message: {
      content: string;
      role: 'system' | 'user' | 'assistant' | 'tool';
      tool_calls?: Array<{
        id?: string;
        function?: {
          arguments?: string;
          name?: string;
        };
        type?: string;
      }>;
    };
  }>;
  id?: string;
  created?: number;
  model?: string;
  object?: string;
  system_fingerprint?: string;
  usage?: {
    completion_time?: number;
    completion_tokens?: number;
    prompt_time?: number;
    prompt_tokens?: number;
    queue_time?: number;
    total_time?: number;
    total_tokens?: number;
  };
}
