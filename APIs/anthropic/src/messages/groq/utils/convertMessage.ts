import { TextBlock } from '../../types';
import { CompletionCreateParams } from '../types';
import { createContentBlock } from './createContentBlock';

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
