import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
  as?: 'h2' | 'h3';
}

/** Заголовок секции: eyebrow → h2 → лид. Держит ритм и типографическую иерархию. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  id,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex max-w-2xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <Heading id={id} className="h2 text-balance">
        {title}
      </Heading>
      {description ? <p className="lead max-w-xl text-pretty">{description}</p> : null}
    </div>
  );
}

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Визуальный тон фона секции. */
  tone?: 'canvas' | 'surface' | 'sand' | 'forest';
  /** Уменьшенный вертикальный отступ. */
  compact?: boolean;
  labeledBy?: string;
  as?: 'section' | 'div';
}

const tones = {
  canvas: 'bg-canvas text-ink-soft',
  surface: 'bg-surface text-ink-soft',
  sand: 'bg-sand/45 text-ink-soft',
  forest: 'bg-forest text-canvas',
} as const;

/** Секция с предсказуемым «воздухом»: контейнер + вертикальные отступы. */
export function Section({
  id,
  children,
  className,
  containerClassName,
  tone = 'canvas',
  compact = false,
  labeledBy,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labeledBy}
      className={cn(tones[tone], compact ? 'py-12 sm:py-16 md:py-20' : 'section', className)}
    >
      <div className={cn('container-page', containerClassName)}>{children}</div>
    </Tag>
  );
}
