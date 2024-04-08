import type { TextBlock, UserTextMessage } from '../../types';

export function createUserTextMessage<Text extends string>(
  text: Text
): UserTextMessage<Text> {
  const content: [TextBlock<Text>] = [{ text, type: 'text' }];
  return {
    role: 'user',
    content,
  };
}
