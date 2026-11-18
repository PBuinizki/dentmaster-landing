'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';
import { toTelHref } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#about', label: 'О клинике' },
  { href: '#services', label: 'Услуги' },
  { href: '#doctors', label: 'Врачи' },
  { href: '#advantages', label: 'Преимущества' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
];

interface HeaderProps {
  phone: string;
  phoneHref?: string;
}

/**
 * Sticky-хедер: прозрачный сверху, «стеклянный» после прокрутки.
 * Активная секция подсвечивается через IntersectionObserver.
 * Мобильная вёрстка ограничена шириной вьюпорта (min-w-0 + shrink),
 * чтобы burger никогда не выходил за край экрана.
 */
export default function Header({ phone, phoneHref }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const tel = phoneHref ?? toTelHref(phone);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.href.slice(1))).filter(
      (element): element is HTMLElement => Boolean(element),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[80] w-full max-w-[100vw] transition-all duration-500 ease-premium',
        scrolled
          ? 'border-b border-ink/[0.07] bg-canvas/85 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-3 sm:gap-6">
        <a href="#hero" aria-label="ДентМастер — на главную" className="min-w-0 shrink rounded-full">
          <Logo compact />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={cn(
                    'relative inline-flex items-center rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-200',
                    active === link.href
                      ? 'text-ink'
                      : 'text-ink-soft/80 hover:text-ink',
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-forest transition-transform duration-300 ease-premium',
                      active === link.href ? 'scale-x-100' : 'scale-x-0',
                    )}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={tel}
            className="hidden items-center gap-2 text-sm font-medium text-ink transition-colors duration-200 hover:text-forest md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-forest"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path
                d="M4.2 5.6c0-1 .8-1.8 1.8-1.8h1.7c.8 0 1.5.5 1.7 1.3l.7 2.6a1.8 1.8 0 0 1-.5 1.8l-1 .9a12.6 12.6 0 0 0 5.7 5.7l.9-1a1.8 1.8 0 0 1 1.8-.5l2.6.7c.8.2 1.3.9 1.3 1.7v1.7c0 1-.8 1.8-1.8 1.8h-.6C11.4 20.5 3.5 12.6 3.5 5.6Z"
                strokeLinejoin="round"
              />
            </svg>
            {phone}
          </a>

          <a
            href="#zapis"
            className="hidden h-11 items-center gap-2 rounded-full bg-forest px-5 text-[0.8125rem] font-medium text-canvas shadow-soft transition-all duration-300 ease-premium hover:bg-forest-deep hover:shadow-lift lg:inline-flex"
          >
            Записаться
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4.5 12h15M13.5 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <MobileMenu links={NAV_LINKS} phone={phone} phoneHref={tel} />
        </div>
      </div>
    </header>
  );
}
