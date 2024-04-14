import { AssistantMessage, EmptyMessage, SystemMessage, UserMessage } from '..';
import { defaultSystemMessage } from '../../../constants/defaultSystemMessage';
import { createMessage } from '../../../interface/groq-cli';
import { ChatMessage } from '../ChatMessage';
import { EmptyAssistantMessage } from '../empty/EmptyAssistantMessage';
import { EmptySystemMessage } from '../empty/EmptySystemMessage';
import { EmptyUserMessage } from '../empty/EmptyUserMessage';
import {
  convertMessage,
  createContentBlock,
  createTextBlock,
  messagesHasSystemMessage,
} from '../utils';

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

// ... existing tests ...

// describe('ChatMessage Error Handling', () => {
//   it('should handle null content correctly', () => {
//     expect(() => new ChatMessage('user', null)).toThrowError();
//   });

//   it('should handle null role correctly', () => {
//     expect(() => new ChatMessage(null, 'Hello')).toThrowError();
//   });
// });

describe('SystemMessage', () => {
  it('should create a system message with default values', () => {
    const systemMessage = new SystemMessage();
    expect(systemMessage.role).toBe('system');
    expect(systemMessage.content).toBe(''); // Replace with the actual default content if different
    expect(systemMessage.system).toBe(systemMessage.content);
  });

  // Test for custom message content
  it('should create a system message with custom content', () => {
    const content = 'System maintenance starts at 2 AM';
    const systemMessage = new SystemMessage('system', content);
    expect(systemMessage.content).toBe(content);
  });

  // Additional tests to cover any other methods or properties
});

describe('EmptySystemMessage', () => {
  it('should have the correct default system message', () => {
    const emptySystemMessage = new EmptySystemMessage();
    expect(emptySystemMessage.system).toBe(defaultSystemMessage); // Assuming defaultSystemMessage is a predefined constant
  });
});

// Test for UserMessage including prefix handling
describe('UserMessage', () => {
  it('should prepend a prefix to the user message content', () => {
    const prefix = 'User:';
    const content = 'Hello, world!';
    const userMessage = new UserMessage(content, prefix);
    expect(userMessage.content).toBe(`${prefix}${content}`);
  });
});

// Test for AssistantMessage including additional fields like _id and _model
describe('AssistantMessage', () => {
  it('should include id, model, and other properties if provided', () => {
    const id = 'msg_123';
    const model = 'gen_ai_model';
    const prefix = 'Assistant:';
    const content = 'How can I help you today?';
    const assistantMessage = new AssistantMessage(content, prefix, id, model);
    expect(assistantMessage.id).toBe(id);
    expect(assistantMessage.model).toBe(model);
    expect(assistantMessage.content).toBe(`${prefix}${content}`);
  });
});

// Test for EmptyMessages to validate correct object creation based on role
describe('EmptyMessage Factory', () => {
  it('should create the correct type of EmptyMessage based on role', () => {
    const emptyAssistant = EmptyMessage.create('assistant');
    expect(emptyAssistant).toBeInstanceOf(EmptyAssistantMessage);

    const emptyUser = EmptyMessage.create('user');
    expect(emptyUser).toBeInstanceOf(EmptyUserMessage);

    const emptySystem = EmptyMessage.create('system');
    expect(emptySystem).toBeInstanceOf(EmptySystemMessage);
  });
});

// ... Additional tests for any other custom behavior or methods...
