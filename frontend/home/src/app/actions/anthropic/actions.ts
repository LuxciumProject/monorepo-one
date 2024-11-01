// @ServerActions/anthropic/actions.ts
'use server';
import { getAnthropic } from '@/configs/getAnthropic';
import Anthropic from '@anthropic-ai/sdk';
export interface PromptCachingBetaTextBlockParam {
  text: string;

  type: 'text';

  cache_control?: {
    type: 'ephemeral';
  } | null;
}
const { anthropic, currentDate } = getAnthropic();
export async function sendMessage(message: string) {
  const messageParams: Anthropic.Beta.PromptCaching.Messages.MessageCreateParamsNonStreaming =
    {
      model: 'claude-3-haiku-20240307',
      max_tokens: 2953,
      temperature: 0.7,
      system: `Current date: ${currentDate}`,
      stream: false,
      top_k: 1,
      top_p: 1,
      stop_sequences: undefined,
      metadata: { user_id: null },
      messages: [],
      tools: undefined,
      tool_choice: undefined,
      betas: ['prompt-caching-2024-07-31'],
    };
  const cahchedMsg: Anthropic.Beta.PromptCaching.Messages.PromptCachingBetaMessage =
    await anthropic.beta.promptCaching.messages.create(messageParams);
  void cahchedMsg;
  console.log('Sending message to Anthropic:', message);
  return {
    response: 'Placeholder response from Anthropic',
    messageId: Date.now().toString(),
  };
}
export async function streamMessage(message: string) {
  console.log('Streaming message to Anthropic:', message);
  // Placeholder for streaming implementation
  return new Response('Placeholder streaming response');
}
