'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Ingredients', href: '/ingredients' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-16
        bg-[rgba(8,7,5,0.85)] backdrop-blur-lg border-b border-[var(--border)]"
    >
      <Link
        href="/"
        className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-80 text-[var(--text-primary)]"
      >
        Recipe
      </Link>

      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive =
            link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'text-[var(--accent)] bg-[var(--accent-dim)]'
                  : 'text-[var(--text-secondary)] bg-transparent'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
