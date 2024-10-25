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
      className={`rounded-lg p-3 ${
        isUser ? 'ml-auto max-w-xs bg-blue-100' : 'mr-auto max-w-xs bg-gray-100'
      }`}
    >
      <div className="mb-1 font-semibold">
        {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
      </div>
      <p>{message.content}</p>
    </div>
  );
}
