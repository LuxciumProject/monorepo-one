import { ModerationCreateResponse } from "openai/resources";
import { getOpenAI } from "./getOpenAI";
const { openai } = getOpenAI("vscode_API_OpenAI_env");

export async function performModeration(
  text: string,
): Promise<ModerationCreateResponse> {
  return await openai.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });
}
