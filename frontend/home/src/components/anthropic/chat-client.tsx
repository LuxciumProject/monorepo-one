// @/components/anthropic/chat-client.tsx
'use client';

import { Message } from '@/types/Message';
import { useEffect, useRef, useState } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';

type ChatClientProps = {
  initialMessages: Message[];
};

export default function ChatClient({ initialMessages }: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    setIsLoading(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Simulated response to: "${messageContent}"`,
    };

    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="italic text-gray-500">Assistant is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
