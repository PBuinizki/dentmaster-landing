import Image from 'next/image';
import type { Clinic } from '@/data/types';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { StarRating } from '@/components/ui/Logo';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import { FloatingChip } from '@/components/ui/MotionExtras';
import { toTelHref } from '@/lib/utils';

interface HeroProps {
  clinic: Clinic;
}

const HERO_IMAGE = {
  src: '/images/hero-art.webp',
  width: 1200,
  height: 1500,
  blurDataURL:
    'data:image/webp;base64,UklGRjYAAABXRUJQVlA4ICoAAACQAQCdASoMAA8AAwBSJQAAXOtdmFwA/uV6kTPbV1qe4kAGZ/6TiAiAAAA=',
};

const MINI_FEATURES = [
  { icon: 'shield' as const, title: 'Стерильность', text: 'Контроль гигиены на каждом этапе' },
  { icon: 'scan' as const, title: 'Цифровая диагностика', text: 'Снимок и план до лечения' },
  { icon: 'feather' as const, title: 'Без боли', text: 'Спокойный темп и паузы' },
];

/**
 * Первый экран: крупный h1 с УТП, два CTA, стеклянные плашки поверх графики.
 *
 * Закругления подобраны так, чтобы контент внутри арки не обрезался:
 * на мобильных — умеренный радиус сверху и скругление только внизу,
 * на десктопе — более выраженная «арка». Изображение — приоритетное (LCP).
 */
export default function Hero({ clinic }: HeroProps) {
  const tel = toTelHref(clinic.contacts.phone);

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-[var(--header-height)]"
    >
      <div
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-[18rem] w-[18rem] animate-soft-pulse rounded-full bg-mint/25 blur-3xl sm:-left-40 sm:h-[26rem] sm:w-[26rem]"
      />

      <div className="container-page relative grid min-w-0 items-center gap-10 pb-14 pt-8 sm:gap-12 sm:pb-20 sm:pt-12 md:pb-24 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-32 lg:pt-20">
        <div className="relative z-10 flex min-w-0 flex-col items-start gap-6 motion-safe:animate-fade-in sm:gap-7">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-surface/80 py-1.5 pl-2 pr-3.5 text-[0.6875rem] font-medium text-ink-soft backdrop-blur-sm sm:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-forest">
                <Icon name="star" className="h-3 w-3" />
                {clinic.ratings.value.toFixed(1).replace('.', ',')}
              </span>
              {clinic.ratings.count} оценок на Яндекс.Картах
            </span>
            <OpenStatusBadge hours={clinic.hours} withToday={false} />
          </div>

          <h1 id="hero-title" className="display max-w-[16ch] text-balance text-ink">
            Премиальная стоматология{' '}
            <span className="relative inline-block text-forest">
              в&nbsp;Орле
              <svg
                viewBox="0 0 240 14"
                preserveAspectRatio="none"
                className="absolute -bottom-1 left-0 h-2 w-full text-mint sm:h-2.5"
                aria-hidden="true"
              >
                <path
                  d="M2 10C60 3 170 2 238 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="lead max-w-[34rem] text-ink-soft/90">
            «ДентМастер» на Пушкина, 24 — спокойное лечение без тревоги: понятный план, аккуратная
            анестезия и врачи, к которым возвращаются семьями с 2008 года.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <ButtonLink
              href="#zapis"
              size="lg"
              fullWidth
              className="sm:w-auto"
              trailing={<Icon name="arrow-right" className="h-4 w-4" />}
            >
              Записаться на приём
            </ButtonLink>
            <ButtonLink
              href={tel}
              size="lg"
              variant="secondary"
              fullWidth
              className="sm:w-auto"
              leading={<Icon name="phone" className="h-[1.05rem] w-[1.05rem]" />}
            >
              {clinic.contacts.phone}
            </ButtonLink>
          </div>

          <ul className="mt-1 grid w-full grid-cols-1 gap-3 border-t border-ink/10 pt-6 sm:grid-cols-3 sm:gap-5 sm:pt-7">
            {MINI_FEATURES.map((feature) => (
              <li key={feature.title} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-forest/12 bg-surface text-forest shadow-[inset_0_1px_0_rgb(255_255_255/0.8)]">
                  <Icon name={feature.icon} className="h-[1.125rem] w-[1.125rem]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.8125rem] font-semibold text-ink">
                    {feature.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
                    {feature.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Визуал: мягкая арка + плашки-факты внутри, без обрезки контента */}
        <div className="relative mx-auto w-full min-w-0 max-w-[30rem] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem_1.5rem_2.5rem_2.5rem] shadow-float sm:rounded-[2rem_2rem_4rem_4rem] lg:rounded-[2.5rem_2.5rem_6rem_6rem]">
            <Image
              src={HERO_IMAGE.src}
              alt="Графическая композиция: контур зуба в глубоком зелёном спектре — визуальный образ клиники ДентМастер"
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              fetchPriority="high"
              sizes="(min-width: 1024px) 42vw, (min-width: 640px) 78vw, 92vw"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10"
            />
            <div className="absolute inset-x-3 bottom-3 flex flex-col items-start gap-2 sm:inset-x-5 sm:bottom-5">
              <FloatingChip
                icon="clock"
                label="График"
                value={clinic.hours
                  .filter((h) => !h.closed)
                  .map((h) => `${h.days} ${h.time}`)
                  .join(' · ')}
                delay={0.35}
                className="max-w-full"
              />
              <FloatingChip
                icon="map-pin"
                label="Адрес"
                value={clinic.address.full}
                delay={0.5}
                className="max-w-full"
              />
            </div>
          </div>

          <div className="absolute -left-2 top-6 hidden rounded-2xl border border-ink/[0.07] bg-canvas/95 px-4 py-3 shadow-lift backdrop-blur sm:block lg:-left-6">
            <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted">Рейтинг</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="font-display text-lg font-semibold text-ink">
                {clinic.ratings.value.toFixed(1).replace('.', ',')}
              </span>
              <StarRating value={clinic.ratings.value} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
