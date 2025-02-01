export interface MessageFromAssistant {
  id: string;
  content: [
    {
      text: string;

      type: 'text';
    },
  ];
  model: string;
  role: 'assistant';
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  type: 'message';
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}
