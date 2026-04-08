import Link from 'next/link';
import Image from 'next/image';
import { getIngredientImageUrl } from '@/lib/api';

interface IngredientCardProps {
  name: string;
}

export default function IngredientCard({ name }: IngredientCardProps) {
  const imgSrc = getIngredientImageUrl(name, 'small');

  return (
    <Link
      href={`/ingredients/${encodeURIComponent(name)}`}
      className="group flex flex-col items-center gap-3 p-5 rounded-2xl transition-all duration-300
        bg-[var(--surface-2)] border border-[var(--border)]
        hover:bg-[var(--surface-3)] hover:border-[var(--accent-border)] hover:-translate-y-[3px]"
    >
      <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-[var(--surface-1)]">
        <Image
          src={imgSrc}
          alt={name}
          width={64}
          height={64}
          className="object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <span className="text-xs font-medium text-center leading-tight text-[var(--text-primary)]">
        {name}
      </span>
    </Link>
  );
}
