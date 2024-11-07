import { ModerationCreateResponse } from "openai/resources";
import { getOpenAI } from "../lib/getOpenAI";

interface ContentInput {
  text: string;
  imagePath?: string;
}

// Example function to send a message to OpenAI's chat API
const { openai, currentDate } = getOpenAI("vscode_API_OpenAI_env");
async function chatWithOpenAI(prompt: string, imagePath?: string) {
  try {
    const input: ContentInput = {
      text: prompt,
      ...(imagePath && { imagePath }),
    };

    const moderation: ModerationCreateResponse = await openai.moderations
      .create({
        model: "omni-moderation-latest",
        input: input.text, // Currently OpenAI moderation only supports text
        // Note: image moderation would require different API endpoints
      });

    if (imagePath) {
      console.log("Image path provided:", imagePath);
      // Additional image handling logic can be added here
    }

    console.dir(moderation, { depth: null, colors: true });
  } catch (error: unknown) {
    console.dir({ "ModerationCreateResponse failed (error):": error }, {
      depth: null,
      colors: true,
      compact: true,
    });
  }
  void listAvailableModels;
}

async function listAvailableModels() {
  try {
    const models = await openai.models.list();
    console.log("Available Models:", models.data.map((model) => model.id));
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

// Example usage of the chatWithOpenAI function
chatWithOpenAI(
  `The sky is blue and the grass is green.`,
  "/home/luxcium/Téléchargements/images.jpeg", // optional image path
);

// lorem ipsum
"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
