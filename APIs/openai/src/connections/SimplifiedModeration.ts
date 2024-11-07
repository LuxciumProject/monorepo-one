import { CategoryData } from "./CategoryData";

export interface SimplifiedModeration {
  id: string;
  model: string;
  isFlagged: boolean;
  categories: Record<string, CategoryData>;
}
