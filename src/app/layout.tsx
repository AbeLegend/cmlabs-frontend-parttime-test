import type { Metadata } from 'next';
import { Fraunces, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/organisms/Navbar';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Recipe — Explore Recipes by Ingredient',
  description: 'Browse thousands of recipes by ingredient. Powered by TheMealDB API.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="text-center py-6 text-sm border-t border-[var(--border)] text-[var(--text-muted)]">
          Recipe &middot; Powered by{' '}
          <a
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[var(--accent)]"
          >
            TheMealDB
          </a>
        </footer>
      </body>
    </html>
  );
}
