import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <p className="font-display text-8xl font-bold mb-4 text-[var(--accent)]">404</p>
      <h1 className="font-display text-3xl font-bold mb-3 text-[var(--text-primary)]">
        Page not found
      </h1>
      <p className="mb-8 text-base text-[var(--text-secondary)]">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/ingredients"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
          transition-all hover:scale-105 bg-[var(--accent)] text-[#080705]"
      >
        Browse Ingredients
      </Link>
    </div>
  );
}
