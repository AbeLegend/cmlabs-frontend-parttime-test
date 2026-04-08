import { notFound } from 'next/navigation';
import { getMealsByIngredient } from '@/lib/api';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import MealGrid from '@/components/organisms/MealGrid';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const name = decodeURIComponent(slug);
  return {
    title: `${name} Meals — Recipe`,
    description: `Browse all meals featuring ${name} as an ingredient.`,
  };
}

export default async function IngredientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ingredient = decodeURIComponent(slug);
  const meals = await getMealsByIngredient(ingredient);

  if (!meals || meals.length === 0) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Ingredients', href: '/ingredients' },
            { label: ingredient },
          ]}
        />
      </div>

      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 text-[var(--accent)]">
          {meals.length} recipe{meals.length !== 1 ? 's' : ''}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-4 text-[var(--text-primary)]">
          {ingredient} Meals
        </h1>
        <p className="text-base max-w-xl text-[var(--text-secondary)]">
          Recipes that feature <span className="text-[var(--accent)]">{ingredient}</span> as an
          ingredient. Click any meal to see the full recipe.
        </p>
      </div>

      <div className="mb-8 border-t border-[var(--border)]" />

      <MealGrid meals={meals} ingredient={ingredient} />
    </div>
  );
}
