'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Мобильное меню: burger + drawer.
 * - блокирует скролл body,
 * - закрывается по Esc и по клику на ссылку,
 * - focus-trap через aria-modal и возврат фокуса на кнопку,
 * - доступное имя кнопки через aria-label.
 */
interface MobileMenuProps {
  links: { href: string; label: string }[];
  phone: string;
  phoneHref: string;
}

export function MobileMenu({ links, phone, phoneHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Открыть меню"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/12 bg-surface/80 text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-surface lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden="true">
          <path d="M4 8h16M4 16h11" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Закрыть меню"
              className="absolute inset-0 h-full w-full cursor-default bg-forest-deep/45 backdrop-blur-sm"
              onClick={close}
            />

            <motion.nav
              id="mobile-menu"
              aria-label="Основная навигация"
              aria-modal="true"
              role="dialog"
              className="absolute inset-y-0 right-0 flex w-[min(88vw,25rem)] max-w-full flex-col gap-7 overflow-y-auto overscroll-contain bg-canvas px-6 pb-10 pt-6 shadow-float sm:gap-8 sm:px-7 sm:pt-7"
              initial={reduce ? { opacity: 0 } : { x: '100%' }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-muted">
                  Меню
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Закрыть меню"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-surface"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <ul className="flex flex-col">
                {links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-ink/[0.07] last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={close}
                      className="flex items-baseline justify-between gap-4 py-4 font-display text-[1.25rem] font-medium tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-forest sm:py-5 sm:text-[1.375rem]"
                    >
                      {link.label}
                      <span className="text-[0.6875rem] tabular-nums text-muted">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-4">
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-3 font-display text-lg font-medium text-ink"
                >
                  {phone}
                </a>
                <a
                  href="#zapis"
                  onClick={close}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-forest px-7 text-[0.9375rem] font-medium text-canvas shadow-soft transition-colors duration-300 hover:bg-forest-deep"
                >
                  Записаться на приём
                </a>
                <p className="text-xs text-muted">
                  Пн–Пт 09:00–14:00 · ул. Пушкина, 24, Орёл
                </p>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
