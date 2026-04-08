import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <span key={idx} className="flex items-center gap-1.5">
            {idx > 0 && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden
                className="text-[var(--text-muted)] shrink-0"
              >
                <path
                  d="M4 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {isLast || !item.href ? (
              <span
                className={cn(
                  'text-sm',
                  isLast ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                )}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-[var(--text-secondary)] transition-colors hover:underline"
              >
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
