import { getIngredients } from '@/lib/api';
import IngredientGrid from '@/components/organisms/IngredientGrid';

export const metadata = {
  title: 'Ingredients — Recipe',
  description: 'Browse all available ingredients and find recipes.',
};

export default async function IngredientsPage() {
  const ingredients = await getIngredients();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-[var(--accent)]">
          {ingredients.length} available
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
          All Ingredients
        </h1>
        <p className="text-base max-w-xl text-[var(--text-secondary)]">
          Select an ingredient to explore meals that use it. Search to quickly find what
          you&apos;re looking for.
        </p>
      </div>

      <div className="mb-8 border-t border-[var(--border)]" />

      <IngredientGrid ingredients={ingredients} />
    </div>
  );
}
