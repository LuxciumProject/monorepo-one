import { ModerationResult } from "./ModerationResult";

export function validateModerationResult(
  result: unknown,
): result is ModerationResult {
  const typedResult = result as ModerationResult;
  return (
    typeof typedResult === "object" &&
    typedResult !== null &&
    typeof typedResult.categories === "object" &&
    typeof typedResult.category_scores === "object" &&
    typeof typedResult.flagged === "boolean"
  );
}
