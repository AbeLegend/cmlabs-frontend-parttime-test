export interface Ingredient {
  strIngredient: string;
}

export interface MealSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string | null;
  strTags: string | null;
  strSource: string | null;
  [key: string]: string | null | undefined;
}
