import { ContentInput } from "./ContentInput";
import { createSimplifiedModeration } from "./createSimplifiedModeration";
import { handleError } from "./handleError";
import { handleImagePath } from "./handleImagePath";
import { listAvailableModels } from "./listAvailableModels";
import { performModeration } from "./performModeration";

export async function chatWithOpenAI(
  prompt: string,
  imagePath?: string,
): Promise<void> {
  try {
    const input: ContentInput = {
      text: prompt,
      ...(imagePath && { imagePath }),
    };

    const moderation = await performModeration(input.text);

    if (imagePath) {
      handleImagePath(imagePath);
    }

    const simplifiedModeration = createSimplifiedModeration(moderation);
    console.dir(simplifiedModeration, { depth: null, colors: true });
  } catch (error: unknown) {
    handleError(error, "ModerationCreateResponse");
  }
  void listAvailableModels();
}
