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

export function createTextBlock(text: string): TextBlock<string> {
  return {
    text,
    type: 'text',
  };
}
