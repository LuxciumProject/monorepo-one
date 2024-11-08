import { Categories } from "./Categories";
import { CategoryScores } from "./CategoryScores";

export interface ModerationResult {
  categories: Categories;
  category_scores: CategoryScores;
  flagged: boolean;
}
