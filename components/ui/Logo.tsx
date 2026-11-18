import { cn } from '@/lib/utils';
import { Icon } from './Icon';

interface LogoProps {
  /** Цвет логотипа. */
  tone?: 'dark' | 'light';
  className?: string;
  /** На очень узких экранах подпись «Орёл · Пушкина 24» скрывается. */
  compact?: boolean;
}

/**
 * Логотип: арка (визуальный код) + монограмма + название.
 * Текст обрезается ellipsis, чтобы на ширине 320px хедер не «разъезжался».
 */
export function Logo({ tone = 'dark', className, compact = false }: LogoProps) {
  return (
    <span className={cn('inline-flex min-w-0 items-center gap-2.5 sm:gap-3', className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" fill="none" aria-hidden="true" focusable="false">
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="19"
          className={tone === 'dark' ? 'fill-forest' : 'fill-canvas'}
        />
        <path
          d="M20 9.5c-2.6 0-4.2 1.4-6.6 1.4-2.4 0-4 1.9-4 4.6 0 2.3.8 3.9 1.5 5.8.6 1.7.8 3.1 1 5.1.2 2.5.7 4.6 2.5 4.6 2 0 2.2-2.3 2.6-4.8.3-1.9.6-3.4 3-3.4s2.7 1.5 3 3.4c.4 2.5.6 4.8 2.6 4.8 1.8 0 2.3-2.1 2.5-4.6.2-2 .4-3.4 1-5.1.7-1.9 1.5-3.5 1.5-5.8 0-2.7-1.6-4.6-4-4.6-2.4 0-4-1.4-6.6-1.4Z"
          className={tone === 'dark' ? 'stroke-mint' : 'stroke-forest'}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'truncate font-display text-[1rem] font-semibold tracking-[-0.02em] sm:text-[1.0625rem]',
            tone === 'dark' ? 'text-ink' : 'text-canvas',
          )}
        >
          ДентМастер
        </span>
        <span
          className={cn(
            'mt-1 truncate text-[0.5625rem] font-medium uppercase tracking-[0.28em]',
            compact && 'hidden xs:inline',
            tone === 'dark' ? 'text-muted' : 'text-mint/80',
          )}
        >
          Орёл · Пушкина 24
        </span>
      </span>
    </span>
  );
}

interface StarRatingProps {
  value: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
}

/** Рейтинг SVG-звёздами с дробной заливкой (clip по проценту). */
export function StarRating({ value, max = 5, className, size = 'sm' }: StarRatingProps) {
  const percent = Math.max(0, Math.min(1, value / max)) * 100;
  const dim = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <span
      className={cn('inline-flex items-center gap-0.5', className)}
      role="img"
      aria-label={`Рейтинг ${value.toFixed(1).replace('.', ',')} из ${max}`}
    >
      <span className="relative inline-flex gap-0.5 text-ink/15">
        {Array.from({ length: max }, (_, i) => (
          <Icon key={i} name="star" className={dim} />
        ))}
        <span
          className="pointer-events-none absolute inset-0 inline-flex gap-0.5 overflow-hidden text-amber"
          style={{ width: `${percent}%` }}
          aria-hidden="true"
        >
          {Array.from({ length: max }, (_, i) => (
            <Icon key={i} name="star" className={dim} />
          ))}
        </span>
      </span>
    </span>
  );
}

interface OpenStatusProps {
  isOpen: boolean;
  className?: string;
}

/** Индикатор «Открыто / Закрыто» с точкой-статусом. */
export function OpenStatus({ isOpen, className }: OpenStatusProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-xs font-medium', className)}>
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {isOpen ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
        ) : null}
        <span
          className={cn('relative inline-flex h-2 w-2 rounded-full', isOpen ? 'bg-forest' : 'bg-muted')}
        />
      </span>
      {isOpen ? 'Сейчас открыто' : 'Сейчас закрыто'}
    </span>
  );
}
