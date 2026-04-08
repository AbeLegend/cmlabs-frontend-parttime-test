'use client';

import { useMemo, useState } from 'react';
import type { Ingredient } from '@/lib/types';
import IngredientCard from '@/components/molecules/IngredientCard';
import SearchInput from '@/components/atoms/SearchInput';

interface IngredientGridProps {
  ingredients: Ingredient[];
}

export default function IngredientGrid({ ingredients }: IngredientGridProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ingredients;
    return ingredients.filter((item) => item.strIngredient.toLowerCase().includes(q));
  }, [ingredients, query]);

  return (
    <div>
      <div className="mb-8">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search ingredients by name..."
          className="max-w-md"
        />
        {query && (
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            {filtered.length === 0
              ? `No results for "${query}"`
              : `${filtered.length} ingredient${filtered.length !== 1 ? 's' : ''} found`}
          </p>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((item) => (
            <IngredientCard key={item.strIngredient} name={item.strIngredient} />
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
            <path d="M13 18h10M18 13v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <p className="text-base">No ingredients match your search.</p>
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
