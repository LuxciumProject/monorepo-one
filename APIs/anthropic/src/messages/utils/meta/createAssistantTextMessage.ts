import type { AssistantTextMessage, TextBlock } from '../../types';

export function createAssistantTextMessage<Text extends string>(
  text: Text
): AssistantTextMessage<Text> {
  const content: [TextBlock<Text>] = [{ text, type: 'text' }];
  return {
    role: 'assistant',
    content,
  };
}
