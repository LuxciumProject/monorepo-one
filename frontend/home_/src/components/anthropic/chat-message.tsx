// @/components/anthropic/chat-message.tsx
'use client';

import { Message } from '@/types/Message';

type ChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`rounded-lg p-5 ${
        isUser ? 'ml-auto max-w-lg bg-blue-100' : 'mr-auto max-w-lg bg-red-100'
      }`}
    >
      <div className="mb-2 font-semibold">
        {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
      </div>
      <p>{message.content}</p>
    </div>
  );
}
