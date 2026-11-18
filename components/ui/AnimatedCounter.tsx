'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  format?: (value: number) => string;
}

const defaultFormat = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(Math.round(value)).replace(/\s/g, '\u00A0');

/**
 * Счётчик, который «докручивается» при входе в вьюпорт.
 * Итоговое значение всегда доступно скринридеру через aria-label,
 * анимируемое число скрыто от него. Уважает prefers-reduced-motion.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.8,
  className,
  format = defaultFormat,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)} aria-label={`${prefix}${format(value)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {format(display)}
        {suffix}
      </span>
    </span>
  );
}
