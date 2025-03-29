import { ChatMessage } from '../ChatMessage';

export class EmptyAssistantMessage extends ChatMessage<'assistant'> {
  constructor() {
    super(
      'assistant',
      `[[ this message is intentionally left empty, empty assistant turn ]]`
    );
  }
}
