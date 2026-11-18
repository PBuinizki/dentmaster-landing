'use client';

import { useEffect, useState } from 'react';
import type { OpeningHours } from '@/data/types';
import { isOpenAt, todayHours } from '@/lib/schedule';
import { OpenStatus } from './Logo';

interface OpenStatusBadgeProps {
  hours: OpeningHours[];
  /** Показывать ли часы на сегодня. */
  withToday?: boolean;
  className?: string;
}

/**
 * Клиентский индикатор статуса. Рендерится только после гидрации,
 * чтобы статический HTML не расходился с серверным временем.
 */
export function OpenStatusBadge({ hours, withToday = true, className }: OpenStatusBadgeProps) {
  const [state, setState] = useState<{ open: boolean; today: string } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setState({ open: isOpenAt(hours, now), today: todayHours(hours, now) });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [hours]);

  if (!state) {
    return (
      <span className={className} aria-hidden="true">
        &nbsp;
      </span>
    );
  }

  return (
    <span className={className}>
      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
        <OpenStatus isOpen={state.open} />
        {withToday ? (
          <span className="text-xs text-muted">· сегодня {state.today}</span>
        ) : null}
      </span>
    </span>
  );
}
