import { ModerationCreateResponse } from 'openai/resources';
import { getOpenAI } from '../lib/getOpenAI';

// Example function to send a message to OpenAI's chat API
async function chatWithOpenAI(prompt: string) {
  const { openai, currentDate } = getOpenAI();


  try {
    const moderation: ModerationCreateResponse = await openai.moderations.create({
      model: "text-moderation-latest",
      input: `${prompt}`,
    });
    console.dir(moderation, { depth: null });
  } catch (error: unknown) {
    // if (error instanceof Error) {
    //   return console.warn('ModerationCreateResponse failed (message):', error.message);
    // }
    console.dir({ 'ModerationCreateResponse failed (error):': error }, { depth: null, colors: true, compact: true });


  }


  try {
    // const moderation = await openai.moderations.create({
    //   model: "text-moderation-stable",
    //   input: `${prompt}`,
    // });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `Today's date is ${currentDate}.` },
        { role: 'user', content: prompt },
      ],
    });
    console.log('Chat response:', response.choices[0]?.message?.content);
    console.dir(response, { depth: null });
    return response.choices[0]?.message?.content;
  } catch (error) {
    console.error("Error in OpenAI chat:", error);
    throw error;
  }
}

// Example usage of the chatWithOpenAI function
chatWithOpenAI("Tell me something interesting about today.");
