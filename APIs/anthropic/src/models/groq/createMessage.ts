import { CompletionCreateParams } from './CompletionCreateParams';

export function createMessage(
  role: string,
  content: string
): CompletionCreateParams.Message {
  return {
    content,
    role,
  };
}
