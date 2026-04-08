'use client';

import { useMemo, useState } from 'react';
import type { MealSummary } from '@/lib/types';
import MealCard from '@/components/molecules/MealCard';
import SearchInput from '@/components/atoms/SearchInput';

interface MealGridProps {
  meals: MealSummary[];
  ingredient: string;
}

export default function MealGrid({ meals, ingredient }: MealGridProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return meals;
    return meals.filter((m) => m.strMeal.toLowerCase().includes(q));
  }, [meals, query]);

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search meals by name..."
          className="max-w-md"
        />
        {query && (
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {filtered.length === 0
              ? `No results for "${query}"`
              : `${filtered.length} meal${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((meal) => (
            <MealCard
              key={meal.idMeal}
              id={meal.idMeal}
              name={meal.strMeal}
              thumbnail={meal.strMealThumb}
              ingredient={ingredient}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center text-[var(--text-muted)]">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden
            className="mb-4 opacity-40"
          >
            <circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="2" />
            <path d="M27 27l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-base">No meals match your search.</p>
          <button
            onClick={() => setQuery('')}
            className="mt-3 text-sm underline text-[var(--accent)]"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
