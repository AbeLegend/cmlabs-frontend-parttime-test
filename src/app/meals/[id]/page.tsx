import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getMealDetail, extractYoutubeId, buildRecipeList } from '@/lib/api';
import Breadcrumb from '@/components/molecules/Breadcrumb';
import Badge from '@/components/atoms/Badge';
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const meal = await getMealDetail(id);
  if (!meal) return { title: 'Meal not found — Recipe' };
  return {
    title: `${meal.strMeal} — Recipe`,
    description: `Recipe and instructions for ${meal.strMeal}.`,
  };
}

export default async function MealDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { from } = await searchParams;

  const meal = await getMealDetail(id);
  if (!meal) notFound();

  const youtubeId = extractYoutubeId(meal.strYoutube);
  const recipes = buildRecipeList(meal);
  const fromIngredient = from ? decodeURIComponent(from) : meal.strCategory;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Ingredients', href: '/ingredients' },
    { label: fromIngredient, href: `/ingredients/${encodeURIComponent(fromIngredient)}` },
    { label: meal.strMeal },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Title + badges */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {meal.strCategory && <Badge variant="accent">{meal.strCategory}</Badge>}
          {meal.strArea && <Badge>{meal.strArea} Cuisine</Badge>}
          {meal.strTags &&
            meal.strTags
              .split(',')
              .slice(0, 3)
              .map((tag) => <Badge key={tag.trim()}>{tag.trim()}</Badge>)}
        </div>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[var(--text-primary)]">
          {meal.strMeal}
        </h1>
      </div>

      <div className="mb-10 border-t border-[var(--border)]" />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Left: image */}
        <div>
          <div className="relative rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-80 sticky top-24">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right: instructions + ingredients */}
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)]">
              Instructions
            </h2>
            <div className="text-sm leading-relaxed space-y-3 text-[var(--text-secondary)]">
              {meal.strInstructions
                .split(/\n+/)
                .filter((p) => p.trim())
                .slice(0, 5)
                .map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
            </div>
          </div>

          {recipes.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold mb-4 text-[var(--text-primary)]">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipes.map(({ ingredient, measure }, index) => (
                  <li
                    key={`${ingredient}-${index}`}
                    className="flex items-center justify-between gap-4 py-2 border-b border-[var(--border)]"
                  >
                    <span className="text-sm text-[var(--text-primary)]">{ingredient}</span>
                    <span className="text-xs font-medium shrink-0 text-[var(--accent)]">
                      {measure || '—'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Full recipe */}
      <div className="mb-16">
        <h2 className="font-display text-2xl font-bold mb-6 text-[var(--text-primary)]">
          Full Recipe
        </h2>
        <div className="p-6 rounded-2xl text-sm leading-relaxed space-y-4 bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-secondary)]">
          {meal.strInstructions
            .split(/\n+/)
            .filter((p) => p.trim())
            .map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
        </div>
      </div>

      {/* YouTube embed */}
      {youtubeId && (
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold mb-6 text-center text-[var(--text-primary)]">
            Video Tutorial
          </h2>
          <div className="relative w-full rounded-2xl overflow-hidden pb-[56.25%] bg-[var(--surface-2)] border border-[var(--border)]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={`${meal.strMeal} tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Source link */}
      {meal.strSource && (
        <div className="text-center">
          <a
            href={meal.strSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm underline text-[var(--accent)]"
          >
            View original recipe source &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
