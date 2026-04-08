import Link from 'next/link';
import Image from 'next/image';

interface MealCardProps {
  id: string;
  name: string;
  thumbnail: string;
  ingredient?: string;
}

export default function MealCard({ id, name, thumbnail, ingredient }: MealCardProps) {
  const href = ingredient
    ? `/meals/${id}?from=${encodeURIComponent(ingredient)}`
    : `/meals/${id}`;

  return (
    <Link
      href={href}
      className="group relative block rounded-2xl overflow-hidden transition-all duration-300
        bg-[var(--surface-2)] border border-[var(--border)]
        hover:border-[var(--accent-border)] hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay so the meal name stays readable */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(8,7,5,0.85)_0%,rgba(8,7,5,0.2)_50%,transparent_100%)]" />

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-semibold leading-snug line-clamp-2 text-[var(--text-primary)]">
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}
