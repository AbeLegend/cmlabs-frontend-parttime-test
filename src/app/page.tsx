import Link from 'next/link';
import Image from 'next/image';
import { getIngredients, getIngredientImageUrl } from '@/lib/api';

const FEATURED_COUNT = 12;

export default async function HomePage() {
  const allIngredients = await getIngredients();

  const step = Math.floor(allIngredients.length / FEATURED_COUNT);
  const featured = Array.from(
    { length: FEATURED_COUNT },
    (_, i) => allIngredients[i * step]
  ).filter(Boolean);

  return (
    <div className="relative overflow-hidden bg-[var(--background)]">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(ellipse_70%_45%_at_50%_20%,rgba(212,145,42,0.08)_0%,transparent_65%)]"
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20
          bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)]
          bg-[size:80px_80px]"
      />

      {/* ─── Hero ─── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-6 max-w-4xl mx-auto w-full">
        <span
          className="inline-block text-xs font-semibold tracking-[0.35em] uppercase mb-8 px-4 py-2 rounded-full
            text-[var(--accent)] bg-[var(--accent-dim)] border border-[var(--accent-border)]"
        >
          Powered by TheMealDB
        </span>

        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tight mb-8 text-[var(--text-primary)]">
          Explore
          <br />
          <em className="text-[var(--accent)] italic">Delicious</em>
          <br />
          Recipes
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed text-[var(--text-secondary)]">
          Discover thousands of recipes filtered by ingredient — from everyday pantry staples to
          the most exotic spices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/ingredients"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold
              tracking-wide transition-all duration-200 hover:scale-105 active:scale-[0.98]
              bg-[var(--accent)] text-[#080705]"
          >
            Browse All Ingredients
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium
              transition-all duration-200 hover:scale-105
              border border-[var(--border-strong)] text-[var(--text-secondary)]"
          >
            About TheMealDB &rarr;
          </a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-xs tracking-widest uppercase text-[var(--text-muted)]">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-[var(--text-muted)]"
            />
          </svg>
        </div>
      </section>

      {/* ─── Featured Ingredients ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-[var(--border)]">
        <div className="flex items-end justify-between mb-10 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2 text-[var(--accent)]">
              Featured
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight text-[var(--text-primary)]">
              Popular Ingredients
            </h2>
            <p className="text-sm mt-2 text-[var(--text-secondary)]">
              A taste of what&apos;s waiting — {allIngredients.length}+ ingredients to explore.
            </p>
          </div>

          <Link
            href="/ingredients"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200
              whitespace-nowrap text-[var(--accent)]"
          >
            View all {allIngredients.length}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {featured.map((item) => (
            <Link
              key={item.strIngredient}
              href={`/ingredients/${encodeURIComponent(item.strIngredient)}`}
              className="ingredient-card group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300"
            >
              <div className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden bg-[var(--surface-1)]">
                <Image
                  src={getIngredientImageUrl(item.strIngredient, 'small')}
                  alt={item.strIngredient}
                  width={56}
                  height={56}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="text-xs font-medium text-center leading-tight text-[var(--text-primary)]">
                {item.strIngredient}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/ingredients"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-sm font-semibold
              tracking-wide transition-all duration-200 hover:scale-105 active:scale-[0.98]
              border border-[var(--accent-border)] text-[var(--accent)] bg-[var(--accent-dim)]"
          >
            Browse all {allIngredients.length} ingredients
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <div className="relative z-10 flex items-center justify-center gap-8 sm:gap-16 py-8 px-6 border-t border-[var(--border)]">
        {[
          { value: `${allIngredients.length}+`, label: 'Ingredients' },
          { value: '1,000+', label: 'Recipes' },
          { value: 'Free', label: 'Open API' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-xl sm:text-2xl font-bold text-[var(--accent)]">
              {stat.value}
            </div>
            <div className="text-xs tracking-widest uppercase mt-0.5 text-[var(--text-muted)]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
