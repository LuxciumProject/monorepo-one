import { TextBlock } from '../../messages/types';

export interface GrogChatCompletionCreateParamsBase {
  messages: Array<CompletionCreateParams.Message>;
  model: string;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  logprobs?: boolean;
  max_tokens?: number;
  n?: number;
  presence_penalty?: number;
  response_format?: CompletionCreateParams.ResponseFormat;
  seed?: number;
  stop?: string | null | Array<string>;
  stream?: boolean;
  temperature?: number;
  tool_choice?: CompletionCreateParams.ToolChoice;
  tools?: Array<CompletionCreateParams.Tool>;
  top_logprobs?: number;
  top_p?: number;
  user?: string;
}

export interface ChatCompletion {
  choices: Array<ChatCompletion.Choice>;

  id?: string;

  created?: number;

  model?: string;

  object?: string;

  system_fingerprint?: string;

  usage?: ChatCompletion.Usage;
}

export namespace CompletionCreateParams {
  export interface Message {
    content: string;

    role: string;

    name?: string;

    /**
     * ToolMessage Fields
     */
    tool_call_id?: string;

    /**
     * AssistantMessage Fields
     */
    tool_calls?: Array<Message.ToolCall>;
  }

  export namespace Message {
    export interface ToolCall {
      id?: string;

      function?: ToolCall.Function;

      type?: string;
    }

    export namespace ToolCall {
      export interface Function {
        arguments?: string;

        name?: string;
      }
    }
  }

  export interface ResponseFormat {
    type?: string;
  }

  export interface ToolChoice {
    string?: string;

    toolChoice?: ToolChoice.ToolChoice;
  }

  export namespace ToolChoice {
    export interface ToolChoice {
      function?: ToolChoice.Function;

      type?: string;
    }

    export namespace ToolChoice {
      export interface Function {
        name?: string;
      }
    }
  }

  export interface Tool {
    function?: Tool.Function;

    type?: string;
  }

  export namespace Tool {
    export interface Function {
      description?: string;

      name?: string;

      parameters?: Record<string, unknown>;
    }
  }
}

export namespace ChatCompletion {
  export interface Choice {
    finish_reason: string;

    index: number;

    logprobs: Choice.Logprobs;

    message: Choice.Message;
  }

  export namespace Choice {
    export interface Logprobs {
      content?: Array<Logprobs.Content>;
    }

    export namespace Logprobs {
      export interface Content {
        token?: string;

        bytes?: Array<number>;

        logprob?: number;

        top_logprobs?: Array<Content.TopLogprob>;
      }

      export namespace Content {
        export interface TopLogprob {
          token?: string;

          bytes?: Array<number>;

          logprob?: number;
        }
      }
    }

    export interface Message {
      content: string;

      role: string;

      tool_calls?: Array<Message.ToolCall>;
    }

    export namespace Message {
      export interface ToolCall {
        id?: string;

        function?: ToolCall.Function;

        type?: string;
      }

      export namespace ToolCall {
        export interface Function {
          arguments?: string;

          name?: string;
        }
      }
    }
  }

  export interface Usage {
    completion_time?: number;

    completion_tokens?: number;

    prompt_time?: number;

    prompt_tokens?: number;

    queue_time?: number;

    total_time?: number;

    total_tokens?: number;
  }
}

export function createMessage(
  role: string,
  content: string
): CompletionCreateParams.Message {
  return {
    content,
    role,
  };
}
export function createContentBlock(message: {
  content: string;
}): [TextBlock<string>] {
  return [createTextBlock(message.content)];
}
export function convertMessage(message: CompletionCreateParams.Message): {
  role: 'assistant' | 'user';
  content: [TextBlock<string>];
} {
  if (message.role === 'assistant') {
    return {
      content: createContentBlock(message),
      role: 'assistant',
    };
  } else if (message.role === 'user') {
    return {
      content: createContentBlock(message),
      role: 'user',
    };
  }
  return {
    content: createContentBlock(message),
    role: (message.role ?? '') as 'assistant' | 'user',
  };
}

export function createTextBlock<Text extends string>(
  text: Text
): TextBlock<Text> {
  return {
    type: 'text',
    text,
  };
}
export function extreactTextBlock<Text extends string>(
  block: TextBlock<Text>
): Text {
  // only to illustrate the validation of the type.
  if (block.type === 'text') {
    return block.text;
  }
  return block.text;
}

export interface MessageParam {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Represents a chat message with a specified role and content.
 * This class serves as a base for more specialized chat messages in a chat application.
 * @template Role - The role type which indicates the sender's role in the chat.
 */
export class ChatMessage<Role extends string = string> {
  /**
   * Initializes a new instance of the ChatMessage class.
   * @param _role The role of the sender.
   * @param _content The textual content of the message.
   */
  constructor(
    private _role: Role,
    private _content: string
  ) {}

  /**
   * Gets the content of the message.
   * @returns The content of the message as a string.
   */
  get content(): string {
    return this._content;
  }

  /**
   * Gets the role of the sender.
   * @returns The role of the sender as a string.
   */
  get role(): Role {
    return this._role;
  }
}

export class SystemMessage<Type extends 'system' = 'system'>
  extends ChatMessage<Type>
  implements GroqMessage
{
  constructor(type: Type = 'system' as Type, message: string = '') {
    super(type as Type, message);
  }
  get system() {
    return this.content;
  }
  get systemMessageList(): GroqMessage[] {
    return [this];
  }
}

export type GroqMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};
export class UserMessage extends ChatMessage<'user'> {
  constructor(message: string, prefix: string) {
    super('user', `${prefix}${message}`);
  }
}

export class EmptyUserMessage extends ChatMessage<'user'> {
  constructor() {
    super(
      'user',
      `[[ this message is intentionally left empty, empty user turn ]]`
    );
  }
}

export class EmptyAssistantMessage extends ChatMessage<'assistant'> {
  constructor() {
    super(
      'assistant',
      `[[ this message is intentionally left empty, empty assistant turn ]]`
    );
  }
}
export const defaultSystemMessage = `During our interaction, please prioritize providing accurate and helpful responses to the user's inquiries. Thank you for your cooperation.`;
export class EmptySystemMessage
  extends SystemMessage<'system'>
  implements GroqMessage
{
  constructor() {
    super('system', defaultSystemMessage);
  }
  get system() {
    return this.content;
  }
  get systemMessageList(): GroqMessage[] {
    return [this];
  }
}
export class EmptyMessage extends ChatMessage<'assistant' | 'user' | 'system'> {
  static create(role: 'assistant'): EmptyUserMessage;
  static create(role: 'user'): EmptyAssistantMessage;
  static create(role: 'system'): EmptySystemMessage;
  static create(
    role: string
  ): EmptyUserMessage | EmptyAssistantMessage | EmptySystemMessage;

  static create(): EmptySystemMessage;

  static create(role: 'assistant' | 'user' | 'system' = 'system') {
    if (role === 'assistant') {
      return new EmptyAssistantMessage();
    } else if (role === 'user') {
      return new EmptyUserMessage();
    }
    return new EmptySystemMessage();
  }
  constructor(role: 'assistant' | 'user' | 'system') {
    super(role, `[[ This message is intentionally left empty, empty turn! ]]`);
    if (role === 'system') {
      return new EmptySystemMessage();
    }
  }
}

// const testingStuff = new EmptyMessage('system');

// console.dir(testingStuff, { depth: 3 });
export class AssistantMessage extends ChatMessage<'assistant'> {
  constructor(
    message: string,
    prefix: string,
    private _id?: string,
    private _model?: string,
    private _stop_reason?: 'end_turn' | 'max_tokens' | 'stop_sequence' | null,
    private _stop_sequence?: string | null,
    private _usage?: {
      input_tokens?: number;
      output_tokens?: number;
    }
  ) {
    super('assistant', `${prefix}${message}`);
  }

  public get id() {
    return this._id;
  }
  public get model() {
    return this._model;
  }
  public get stop_reason() {
    return this._stop_reason;
  }

  public get stop_sequence() {
    return this._stop_sequence;
  }

  public get type() {
    return 'message';
  }

  public get usage() {
    return this._usage;
  }
}

// function Person(name: string, age: number) {
//   if (this instanceof Person) {
//     console.log('this is an instance of Person');
//   }
//   this.name = name;
//   this.age = age;
//   // } else {
//   // return new Person(name, age);
//   // }
// }

// let tomy123 = Person('tomy123', 37);
// const tommy123 = new Person('tommy123', 37);

// void tomy123, tommy123;

// class ChatSystemArgs {
//   constructor(public message: string) {}
// }

// function ChatSystemArgsConstructor(message: string) {
//   this.message = message;
// }

export function messagesHasSystemMessage(
  messages: ChatMessage[]
): messages is ChatParticipant[] {
  return messages.some(message => message.role === 'system');
}

export type ChatParticipant = UserMessage | AssistantMessage;
export type MessageParticipant = UserMessage | AssistantMessage | SystemMessage;
type Conversation = [MessageParticipant, ...ChatParticipant[]];
