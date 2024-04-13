import {
  AssistantMessage,
  ChatMessage,
  convertMessage,
  createContentBlock,
  createMessage,
  createTextBlock,
  messagesHasSystemMessage,
  SystemMessage,
  UserMessage,
} from './Groq';

describe('Groq.ts', () => {
  describe('createMessage', () => {
    it('should create a message with the given role and content', () => {
      const message = createMessage('user', 'Hello, world!');
      expect(message).toEqual({ role: 'user', content: 'Hello, world!' });
    });
  });

  describe('createContentBlock', () => {
    it('should create a content block with the given message content', () => {
      const block = createContentBlock({ content: 'Hello, world!' });
      expect(block).toEqual([{ type: 'text', text: 'Hello, world!' }]);
    });
  });

  describe('convertMessage', () => {
    it('should convert a message to a content block and role', () => {
      const converted = convertMessage({
        role: 'user',
        content: 'Hello, world!',
      });
      expect(converted).toEqual({
        role: 'user',
        content: [{ type: 'text', text: 'Hello, world!' }],
      });
    });
  });

  describe('createTextBlock', () => {
    it('should create a text block with the given text', () => {
      const block = createTextBlock('Hello, world!');
      expect(block).toEqual({ type: 'text', text: 'Hello, world!' });
    });
  });

  describe('ChatMessage', () => {
    it('should create a chat message with the given role and content', () => {
      const message = new ChatMessage('user', 'Hello, world!');
      expect(message.role).toBe('user');
      expect(message.content).toBe('Hello, world!');
    });
  });

  // Add similar tests for SystemMessage, UserMessage, EmptyUserMessage, EmptyAssistantMessage, EmptySystemMessage, EmptyMessage, AssistantMessage

  describe('messagesHasSystemMessage', () => {
    it('should return true if the messages array contains a system message', () => {
      const messages = [
        new UserMessage('Hello, world!', 'prefix'),
        new SystemMessage(),
      ];
      expect(messagesHasSystemMessage(messages)).toBe(true);
    });

    it('should return false if the messages array does not contain a system message', () => {
      const messages = [
        new UserMessage('Hello, world!', 'prefix'),
        new AssistantMessage('Hello, world!', 'prefix'),
      ];
      expect(messagesHasSystemMessage(messages)).toBe(false);
    });
  });
});
