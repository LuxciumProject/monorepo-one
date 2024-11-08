import { ModerationCreateResponse } from "openai/resources";
import { connectOpenAI } from "../connectOpenAI";
const { openai } = connectOpenAI("vscode_API_OpenAI_env");

export async function performModeration(
  text: string,
): Promise<ModerationCreateResponse> {
  return await openai.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });
}
