export type GroqMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
};
