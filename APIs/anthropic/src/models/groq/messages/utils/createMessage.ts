import { CompletionCreateParams } from '../../types/CompletionCreateParams';

export function createMessage(
  role: string,
  content: string
): CompletionCreateParams.Message {
  return {
    content,
    role,
  };
}
