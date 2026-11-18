'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import type { IconName } from '@/data/types';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Дополнительные микроанимации:
 * — TiltCard: мягкий 3D-наклон карточки за курсором;
 * — FloatingChip: «стеклянная» плашка, выезжающая поверх изображения.
 * Всё уважает prefers-reduced-motion.
 */

export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className={cn('will-change-transform [transform-style:preserve-3d]', className)}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 160, damping: 20, mass: 0.6 }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setRotate({ x: -y * max, y: x * max });
      }}
      onPointerLeave={() => setRotate({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

export function FloatingChip({
  icon,
  label,
  value,
  className,
  delay = 0,
}: {
  icon: IconName;
  label: string;
  value: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={cn(
        'flex items-center gap-2.5 rounded-2xl border border-canvas/20 bg-forest-deep/55 px-3 py-2.5 text-canvas shadow-lift backdrop-blur-md sm:gap-3 sm:px-4 sm:py-3',
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint/15 text-mint">
        <Icon name={icon} className="h-[1.125rem] w-[1.125rem]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[0.625rem] uppercase tracking-[0.18em] text-canvas/55">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[0.8125rem] font-medium sm:text-sm">{value}</span>
      </span>
    </motion.div>
  );
}
