import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variant === 'accent'
          ? 'bg-[var(--accent-dim)] text-[var(--accent)] border-[var(--accent-border)]'
          : 'bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border)]'
      )}
    >
      {children}
    </span>
  );
}
