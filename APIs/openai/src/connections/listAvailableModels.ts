import { getOpenAI } from "./getOpenAI";
import { handleError } from "./handleError";
const { openai } = getOpenAI("vscode_API_OpenAI_env");

export async function listAvailableModels(): Promise<void> {
  try {
    const models = await openai.models.list();
    console.log(
      "Available Models:",
      models.data.map((model: { id: string }) => model.id),
    );
  } catch (error: unknown) {
    handleError(error, "ListModels");
  }
}
