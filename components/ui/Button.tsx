import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  // Основное действие: тёмный зелёный, на hover — глубокий оттенок и подъём.
  primary:
    'bg-forest text-canvas shadow-soft hover:bg-forest-deep hover:shadow-lift motion-safe:active:translate-y-px',
  // Второе действие: hairline-бордер, стеклянная подложка.
  secondary:
    'border border-ink/15 bg-surface/70 text-ink backdrop-blur-sm hover:border-ink/30 hover:bg-surface hover:shadow-soft motion-safe:active:translate-y-px',
  // Тихая ссылка внутри интерфейса.
  ghost: 'text-ink hover:bg-ink/[0.05] motion-safe:active:bg-ink/[0.08]',
  // Для тёмных секций.
  light:
    'bg-canvas text-forest shadow-soft hover:bg-white hover:shadow-lift motion-safe:active:translate-y-px',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 gap-2 rounded-full px-4 text-[0.8125rem]',
  md: 'h-12 gap-2.5 rounded-full px-6 text-sm',
  lg: 'h-14 gap-3 rounded-full px-7 text-[0.9375rem]',
};

const shared =
  'group/btn relative inline-flex select-none items-center justify-center whitespace-nowrap font-medium tracking-[-0.01em] transition-all duration-300 ease-premium hover:transition-[color,background-color,border-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  leading?: ReactNode;
  trailing?: ReactNode;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
}

function Inner({ leading, trailing, children }: Pick<CommonProps, 'leading' | 'trailing' | 'children'>) {
  return (
    <>
      {leading ? (
        <span className="inline-flex transition-transform duration-300 ease-premium group-hover/btn:-translate-x-0.5">
          {leading}
        </span>
      ) : null}
      <span>{children}</span>
      {trailing ? (
        <span className="inline-flex transition-transform duration-300 ease-premium group-hover/btn:translate-x-0.5">
          {trailing}
        </span>
      ) : null}
    </>
  );
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'aria-label'>,
    CommonProps {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', fullWidth, leading, trailing, className, children, type, loading, disabled, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(shared, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      <Inner leading={leading} trailing={trailing}>
        {children}
      </Inner>
    </button>
  );
});

export interface ButtonLinkProps extends CommonProps {
  href: string;
  prefetch?: boolean;
}

/** Ссылка с видом кнопки. tel:/mailto: и внешние URL остаются нативными ссылками. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  fullWidth,
  leading,
  trailing,
  className,
  children,
  prefetch,
  'aria-label': ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(shared, variants[variant], sizes[size], fullWidth && 'w-full', className);
  const isHttp = /^https?:/i.test(href);
  const isNative = isHttp || /^(tel:|mailto:)/i.test(href);

  if (isNative) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Inner leading={leading} trailing={trailing}>
          {children}
        </Inner>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel} prefetch={prefetch}>
      <Inner leading={leading} trailing={trailing}>
        {children}
      </Inner>
    </Link>
  );
}
