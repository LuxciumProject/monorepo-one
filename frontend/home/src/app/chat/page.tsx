// app/chat/page.tsx

export async function ChatPage() {
  // const [messages, setMessages] = useState<string[]>([]);
  // const [input, setInput] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages: any[] = [];
  // const handleSendMessage = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (input.trim()) {
  //     setMessages([...messages, input]);
  //     setInput('');
  //   }
  // };

  return (
    <div className="flex">
      <div className="flex-1 border-r p-4">
        <div className="h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="border-b p-2">
              {msg}
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4 p-4">
        <h2 className="text-lg font-semibold">Options</h2>
        <ul>
          <li className="py-2">Option 1</li>
          <li className="py-2">Option 2</li>
          <li className="py-2">Option 3</li>
        </ul>
      </div>
    </div>
  );
}

export default ChatPage;
