import { Message } from '@anthropic-ai/sdk/resources';
import { create } from '../messages';
import type {
  AssistantTextMessage,
  MessageItem,
  MessageParams,
  MessageRequest,
  ModelReply,
  UserTextMessage,
} from '../messages/types';

const system_text =
  '"You are a clever AI Agent. You are made to assist humans in their daily tasks. You are a friend. You are a helper. You are a companion. You are a guide. You are a teacher. You are a student. You are a learner. You are a creator. You are a thinker. You are a doer. Enact a leader"';
export const claudeCreateInstance = <M extends string>(model: M) => {
  return async function sendClaudeRequest({
    client,
    user_prefix = '',
    user_text,
    assist_text = '',
    assist_prefix = '',
    system = system_text,
    max_tokens = 1024,
    user_id = null,
    temperature = 0.95,
    top_k,
    top_p,
    previousMessages = [], // Add a new parameter for the previous messages
  }: MessageParams): Promise<ModelReply<M>> {
    const stream = false;
    previousMessages;
    const metadata: { user_id?: string | null } = { user_id };
    const userMessage: UserTextMessage<string> = create.userMessage(
      user_text.trim(),
      user_prefix.trim() + ' '
    );
    const messages: MessageItem[] = [...previousMessages, userMessage];
    let assistantMessage: AssistantTextMessage<string> = null;
    if (assist_text.trim() !== '') {
      assistantMessage = create.assistantMessage(
        assist_text.trim(),
        assist_prefix.trim()
      );
      messages.push(assistantMessage);
    }
    try {
      // %-=========================================================-%
      const result: Message = await client.messages.create({
        // &-=======================================================-&
        model,
        max_tokens,
        temperature,
        system,
        messages,
        stream,
        top_k,
        top_p,
        metadata,
        // &-=======================================================-&
      });
      // %-=========================================================-%
      const {
        id,
        content: contentRaw,
        model: replyModel,
        role,
        stop_reason,
        stop_sequence,
        type: messageType,
        usage,
      } = result;
      // 2-=========================================================-2
      const [{ text: replyText, type: replyType }] = contentRaw;
      const { input_tokens, output_tokens } = usage;
      const replyMessage = assist_text + replyText;
      const responseText = create.assistantMessage(replyMessage);
      // 2-=========================================================-2
      const request: MessageRequest<M> = {
        model,
        max_tokens,
        temperature,
        system,
        stream,
        top_k,
        top_p,
        metadata,
        previousMessages,
      };
      // %-=========================================================-%
      return {
        role,
        model,
        replyModel,
        replyType,
        replyText,
        replyMessage,
        responseText,
        content: contentRaw,
        stop_reason,
        stop_sequence,
        id,
        messageType,
        usage,
        input_tokens,
        output_tokens,
        request,
        assistantMessage,
        userMessage,
        previousMessages: [...previousMessages, userMessage, responseText],
      };
      // %-=========================================================-%
    } catch (error) {
      console.error('Error AT: SendClaudeRequest with Anthropic API:', error);
      // Do nothing
      /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
    }
  };
};

export interface MessageCreateParamsBase_TYPEMAP {
  max_tokens: number;

  // messages: Array<MessageParam>
  messages: Array<{
    // content: Array<TextBlock | ImageBlockParam>
    content:
      | Array<
          | {
              text: string;
              type?: 'text';
            }
          // ImageBlockParam
          | {
              // source: ImageBlockParam.Source;
              source: {
                data: string;
                media_type:
                  | 'image/jpeg'
                  | 'image/png'
                  | 'image/gif'
                  | 'image/webp';
                type?: 'base64';
              };
              type?: 'image';
            }
        >
      | string;
    role: 'user' | 'assistant';
  }>;
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';
  // metadata?: MessageCreateParams.Metadata
  metadata?: {
    user_id?: string | null;
  };
  stop_sequences?: string[];
  stream?: boolean;
  system?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
