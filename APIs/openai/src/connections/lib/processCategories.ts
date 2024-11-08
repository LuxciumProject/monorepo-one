import { Categories } from "../types/Categories";
import { CategoryData } from "../types/CategoryData";
import { CategoryScores } from "../types/CategoryScores";

export function processCategories(
  categories: Categories,
  categoryScores: CategoryScores,
): Record<string, CategoryData> {
  const processedCategories: Record<string, CategoryData> = {};

  Object.keys(categories).forEach((category: string): void => {
    processedCategories[category] = {
      isEnabled: categories[category],
      score: categoryScores[category],
    };
  });

  return processedCategories;
}
