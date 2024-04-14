import { ChatMessage } from '../ChatMessage';

export class EmptyUserMessage extends ChatMessage<'user'> {
  constructor() {
    super(
      'user',
      `[[ this message is intentionally left empty, empty user turn ]]`
    );
  }
}
