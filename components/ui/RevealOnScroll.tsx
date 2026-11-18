'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealOnScrollProps {
  children: ReactNode;
  /** Задержка старта анимации, секунды. */
  delay?: number;
  /** Шаг stagger для прямых дочерних элементов (RevealItem). */
  stagger?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section' | 'article';
  once?: boolean;
}

/**
 * Мягкое появление при скролле (fade + up) со stagger для дочерних элементов.
 * prefers-reduced-motion: остаётся только изменение прозрачности, без сдвига.
 */
export function RevealOnScroll({
  children,
  delay = 0,
  stagger = 0.07,
  y = 26,
  className,
  as = 'div',
  once = true,
}: RevealOnScrollProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-12% 0px -8% 0px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {Array.isArray(children) ? children : <RevealItem y={reduce ? 0 : y}>{children}</RevealItem>}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'p';
}

/** Элемент сетки внутри RevealOnScroll — создаёт последовательное появление. */
export function RevealItem({ children, y = 26, className, as = 'div' }: RevealItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.01 : 0.75, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
