import type { Ingredient, MealDetail, MealSummary } from './types';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export async function getIngredients(): Promise<Ingredient[]> {
  const res = await fetch(`${BASE_URL}/list.php?i=list`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Failed to load ingredients');
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
  const res = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to load meals');
  const data = await res.json();
  return data.meals ?? [];
}

export async function getMealDetail(id: string): Promise<MealDetail | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Failed to load meal detail');
  const data = await res.json();
  return data.meals?.[0] ?? null;
}

export function getIngredientImageUrl(name: string, size: 'small' | 'full' = 'small'): string {
  const suffix = size === 'small' ? '-Small' : '';
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(name)}${suffix}.png`;
}

export function extractYoutubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? null;
}

export function buildRecipeList(meal: MealDetail): { ingredient: string; measure: string }[] {
  const recipes: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      recipes.push({
        ingredient: ingredient.trim(),
        measure: (measure ?? '').trim(),
      });
    }
  }
  return recipes;
}
