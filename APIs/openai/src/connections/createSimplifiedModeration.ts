import { ModerationCreateResponse } from "openai/resources";
import { processCategories } from "./processCategories";
import { SimplifiedModeration } from "./SimplifiedModeration";
import { validateModerationResult } from "./validateModerationResult";

export function createSimplifiedModeration(
  moderation: ModerationCreateResponse,
): SimplifiedModeration {
  const result = moderation.results[0];

  if (!validateModerationResult(result)) {
    throw new Error("Unexpected moderation result format");
  }

  return {
    id: moderation.id,
    model: moderation.model,
    isFlagged: result.flagged,
    categories: processCategories(result.categories, result.category_scores),
  };
}
