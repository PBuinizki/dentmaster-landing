import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'li';
  tone?: 'surface' | 'canvas' | 'mint' | 'outline';
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const tones = {
  surface: 'bg-surface border-ink/[0.07] shadow-soft',
  canvas: 'bg-canvas border-ink/[0.07]',
  mint: 'bg-mint-soft/70 border-forest/10',
  outline: 'bg-transparent border-ink/10',
} as const;

const paddings = {
  none: '',
  sm: 'p-5 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-7 sm:p-10',
} as const;

/**
 * Базовый «лист» интерфейса: многослойная тень, hairline-бордер, rounded-2xl.
 * interactive добавляет подъём и усиленную тень при hover/focus-within.
 */
export function Card({
  as: Tag = 'div',
  tone = 'surface',
  interactive = false,
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-[1.75rem] border transition-all duration-300 ease-premium',
        tones[tone],
        paddings[padding],
        interactive &&
          'hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift focus-within:-translate-y-1 focus-within:shadow-lift',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
