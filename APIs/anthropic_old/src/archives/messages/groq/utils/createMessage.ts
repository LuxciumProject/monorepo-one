import { CompletionCreateParams } from '../types';
export function createMessage(
  role: string,
  content: string
): CompletionCreateParams.Message {
  return {
    content,
    role,
  };
}
