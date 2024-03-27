import { create } from '../../messages';
import { MessageItem, MessageParams } from '../../messages/types';
import { ModelReply } from '../../messages/types/ModelReply';

export const createClaude = <M extends string>(model: M) => {
  const createClaudeInstance = async ({
    client,
    system = '""',
    user_text = '""',
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
    if (assist_text !== '') {
      messages.push(create.assistantMessage(assist_text));
    }
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
    const replyMessage = assist_text + replyText;
    return {
      role, // "assistant"
      model, // "claude-3-haiku-20240307"
      replyModel, // string
      replyType, // "text"
      replyText, // string
      replyMessage,
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
