import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';
config();
const anthropic = new Anthropic({
  apiKey: process.env['local_vscode'],
});

// Replace placeholders like {{INPUT_TEXT}} with real values,
// because the SDK does not support variables.
const currentDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

`You are an AI assistant named ${'Claude'}, developed by Anthropic. Your task is to interact with users according to the following system instructions:

<system_instructions>
${'SYSTEM_INSTRUCTIONS'}
</system_instructions>

These instructions define your capabilities, knowledge cutoff, and guidelines for interaction. Always adhere to these instructions when responding to users.

When a user provides input, follow these steps:

1. Read and understand the user's input carefully.
2. Determine if the user's query falls within your knowledge cutoff ${'April 2024'}. If it doesn't, acknowledge this politely while still attempting to assist.
3. Formulate a response that is concise, relevant, and helpful, following the guidelines in the system instructions.
4. If necessary, ask for clarification or more specific information to better assist the user.
5. Maintain a collaborative and cooperative tone throughout the interaction.

Here is the user's input:

<user_input>
{{USER_INPUT}}
</user_input>

Respond to the user's input following the guidelines and example interaction flow provided in the system instructions. Your response should be helpful, concise, and tailored to the user's needs.`;
export const myModels: {
  [key: string]: {
    model: string;
    friendlyName?: string;
    max_tokens?: number;
    temperature?: number;
    currentDate?: string;
  };
} = {
  'claude-3-5-sonnet-20241022': {
    model: 'claude-3-5-sonnet-20241022',
    friendlyName: 'Claude 3.5 Sonnet (New) as of 2024 10 22',
  },

  'claude-3-haiku-20240307': {
    model: 'claude-3-haiku-20240307',
    friendlyName: 'Claude 3 Haiku',
    max_tokens: 2953,
    temperature: 0.7,
    currentDate,
  },
};
const msg = await anthropic.messages.create({
  model: 'claude-3-haiku-20240307',
  max_tokens: 2953,
  temperature: 0.7,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'You are an autonomous AI agent, you are running as a background task, you are not interacting directly with the user you must follow the instructions all by yourself. You are tasked with transforming text into clear, actionable directives to instruct other AI Assistants, to dictate what thought process or analyses they must undergo. Your goal is to create a set of imperative instructions based on given input text. Follow these steps carefully:\n\n1. Examine following input text:\n\n<input_text>\n{{INPUT_TEXT}}\n</input_text>\n\n2. Wrap your analysis inside <analysis> tags:\n   a. If text is not in English, translate it to English. Include a <translated> section if needed.\n   b. Identify and list key actions, goals, or concepts present in text.\n   c. Identify and list secondary headers above each items to included them inline later.\n   d. Consider how these elements can be transformed into direct, imperative instructions.\n   e. Brainstorm potential directives based on your analysis. \n   f. Convert them in sub-processes that an AI Agent would be able to follow.\n\n3. After your analysis, create a brief top level header summarizing overall task or context.\n\n4. Develop a series of clear, concise directives for an AI agent based on your analysis. Each directive should:\n   - Focus on a single, specific action or consideration.\n   - Use imperative verb forms (e.g., "Do this" instead of "AI should do this").\n   - Be written in a way that modern AI agents would understand and execute promptly.\n   - Include secondary headers above directives using ":" after to place them inline.\n5. Format your output using following structure:\n   <header>Insert summary title here</header>\n   <directives>\n   - First directive\n   - Second directive\n   - Third directive\n   ...\n   </directives>\n\nRemember:\n- If original text have secondary headers above directives include them.\n- Include secondary headers inline followed by ":" to separate them from directive. \n- Ensure each directive is a direct command, not a suggestion.\n- Avoid using conditional language like "should" or "could."\n- Make each instruction direct clear and unambiguous.\n- Maintain original meaning and context of input text.\n\nBegin your response with <analysis> section, followed by formatted output.\n\nInclude a <translated> section if needed',
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: '<analysis>',
        },
      ],
    },
  ],
});
console.log(msg);
