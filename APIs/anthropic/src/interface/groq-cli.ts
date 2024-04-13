import { config } from 'dotenv';
import Groq from 'groq-sdk';

config();
// UserTextMessage<string> | AssistantTextMessage<string>
export type GroqMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};
export type AnthropicMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};
// role: 'system' | 'user' | 'assistant' | 'tool';
// CreateMessage for role 'system' | 'user' | 'assistant' | 'tool';

export interface Usage {
  completion_time?: number;
  completion_tokens?: number;
  prompt_time?: number;
  prompt_tokens?: number;
  queue_time?: number;
  total_time?: number;
  total_tokens?: number;
}

type Tool_Call = {
  id?: string;
  function?: ToolCall_Function;
  type?: string;
};
type ToolCall_Function = {
  arguments?: string;
  name?: string;
};

type CompletionCreateParams_<Role extends 'user' | 'system' | 'assistant'> = {
  content: string;
  role: Role;
  name?: string;
  /**
   * ToolMessage Fields
   */
  tool_call_id?: string;
  /**
   * AssistantMessage Fields
   */
  tool_calls?: Tool_Call[];
};
type CompletionCreateParams_Message = CompletionCreateParams_<
  'user' | 'system' | 'assistant'
>;
type CompletionCreateStrictParams_Message = CompletionCreateParams_<
  'user' | 'assistant'
>;
type CompletionCreateParams_UserMessage = CompletionCreateParams_<'user'>;
type CompletionCreateParams_SystemMessage = CompletionCreateParams_<'system'>;
type CompletionCreateParams_AssistantMessage =
  CompletionCreateParams_<'assistant'>;

// one that would convert system messages to the correct type
// in one case it is a property along withj messages in the other
// case it is the first elemenent of the messages array in the shape of
// a single element
export interface ChatCompletionCreateParamsBase {
  messages: CompletionCreateParams_<'user' | 'system' | 'assistant'>[];
  model: string;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  logprobs?: boolean;
  max_tokens?: number;
  n?: number;
  presence_penalty?: number;
  // response_format?: Groq.ResponseFormat;
  seed?: number;
  /**
   * Up to 4 sequences where the API will stop generating further tokens. The
   * returned text will not contain the stop sequence.
   */
  stop?: string | null | Array<string>;
  stream?: boolean;
  temperature?: number;
  // tool_choice?: CompletionCreateParams.ToolChoice;
  // tools?: Array<CompletionCreateParams.Tool>;
  top_logprobs?: number;
  top_p?: number;
  user?: string;
}

export function createMessage(
  role: 'system' | 'user' | 'assistant' | 'tool',
  content: string
): GroqMessage {
  return { role, content };
}
function extractSystemMessageObject(
  messages: GroqMessage[]
): SystemMessageObject | null {
  if (messages.length > 0 && messages[0].role === 'system') {
    const [, ...restMessages] = messages;
    return { system: messages[0].content, messages: restMessages };
  }
  return null;
}

type SystemMessageObject = { system: string; messages: GroqMessage[] };
type GroqSystemMessage = { system: string; messages: GroqMessage[] };

function extractSystemMessageList(system: SystemMessageObject): GroqMessage[] {
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
  const chatCompletion = await getGroqChatCompletion(
    'Explain the importance of low latency LLMs in the context of AI systems. What are the benefits of low latency Multi Agentic systems?'
  );
  // Print the completion returned by the LLM.
  process.stdout.write(chatCompletion.choices[0]?.message?.content || '');
  // console.dir(

  // );
}
main();

class SystemMessage {
  private _messages: GroqMessage[];
  private _system: string;

  protected constructor(params: { system: string; messages: GroqMessage[] }) {
    this._system = params.system;
    this._messages = params.messages;
  }

  get systemMessage() {
    return this._messages;
  }

  get system() {
    return this._system;
  }

  get role() {
    return 'system';
  }
}

// role: 'system' | 'user' | 'assistant' | 'tool';

// function typeOfMembers(obj: any) {
//   const keys = Object.keys(obj);
//   return keys.map(key => {
//     return key === 'choices'
//       ? { choices: typeOfMembers(obj.choices) }
//       : key == '0'
//         ? { '0': typeOfMembers(obj[0]) }
//         : key === 'logprobs'
//           ? { logprobs: typeOfMembers(obj.logprobs) }
//           : key === 'message'
//             ? { message: typeOfMembers(obj.message) }
//             : key === 'x_groq'
//               ? { x_groq: typeOfMembers(obj.x_groq) }
//               : key === 'usage'
//                 ? { usage: typeOfMembers(obj.usage) }
//                 : { [key]: typeof obj[key] };
//   });
//   // : key === 'choices'
//   //   ?  key === 'logprobs' ?
//   //   { logprobs: typeOfMembers(obj.logprobs) } :
//   //    key === 'message' ?
//   //   { choices: typeOfMembers(obj.choices) }
//   //   : key === 'x_groq'
//   //     ? { x_groq: typeOfMembers(obj.x_groq) }
//   //     : key === '0'
//   //       ? { '0': typeOfMembers(obj[0]) }
//   //       : key === 'message'
//   //         ? { message: typeOfMembers(obj.message) }
//   //         : key === 'logprobs'
//   //           ? { logprobs: typeOfMembers(obj['logprobs']) }
//   //           : key === 'message'
//   //             ? { message: typeOfMembers(obj.message) }
//   //             : { [key]: typeof obj[key] };
//   // });
// }
// messages: [
//   {
//     role: 'user',
//     content: 'Explain the importance of low latency LLMs',
//   },
// ],
/**
 * Get a chat completion from the Groq API.
 */
async function getGroqChatCompletion<Content extends string>(content: Content) {
  const createOptions = {
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'mixtral-8x7b-32768',
  };
  const resultRaw = groq.chat.completions.create(createOptions);
  const result: Groq.Chat.Completions.ChatCompletion = await resultRaw;
  return result;
}

// type ChatRoleTuple = ['system', ...('assistant' | 'user')[]];
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
