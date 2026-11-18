import type { Clinic } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { RevealItem, RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Section, SectionHeading } from '@/components/ui/Section';

interface AboutProps {
  clinic: Clinic;
}

const ABOUT_IMAGE = {
  src: '/images/clinic-photo.jpg', // <-- Здесь мы указали вашу новую картинку
  width: 1200, // Можно оставить так, Next.js подстроит размеры
  height: 1400,
};

/** 4 цифры + поясняющий текст. Счётчики оживают при скролле. */
export default function About({ clinic }: AboutProps) {
  return (
    <Section id="about" labeledBy="about-title" tone="canvas">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="О клинике"
            id="about-title"
            title={
              <>
                Стоматология, в которую приходят <span className="text-forest">без страха</span>
              </>
            }
            description={clinic.description[0]}
          />

          <div className="mt-6 max-w-2xl space-y-4 text-[1rem] leading-[1.75] text-ink-soft/85 sm:text-[1.0625rem]">
            {clinic.description.slice(1).map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
            {[
              { icon: 'badge-check' as const, text: `Работаем с ${clinic.foundedYear} года` },
              { icon: 'map-pin' as const, text: 'Центр Орла, Пушкина 24' },
              { icon: 'users' as const, text: 'Приём взрослых и детей' },
            ].map((item) => (
              <li key={item.text} className="inline-flex items-center gap-2">
                <Icon name={item.icon} className="h-4 w-4 text-forest" />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-[6/7] w-full max-w-md overflow-hidden rounded-[1.5rem_1.5rem_2.5rem_2.5rem] border border-ink/[0.06] shadow-soft sm:rounded-[2rem_2rem_3.5rem_3.5rem] lg:ml-auto">
            <img
              src={ABOUT_IMAGE.src}
              alt="Интерьер стоматологической клиники ДентМастер"
              width={ABOUT_IMAGE.width}
              height={ABOUT_IMAGE.height}
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 70vw, 92vw"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-transparent"
            />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl border border-white/25 bg-canvas/90 px-3.5 py-2.5 backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:gap-3 sm:px-4 sm:py-3">
              <div className="min-w-0">
                <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted sm:text-[0.625rem]">
                  Основана
                </p>
                <p className="font-display text-base font-semibold text-ink sm:text-lg">
                  {clinic.foundedYear}
                </p>
              </div>
              <span className="h-8 w-px shrink-0 bg-ink/10" aria-hidden="true" />
              <div className="min-w-0 text-right sm:text-left">
                <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-muted sm:text-[0.625rem]">
                  Город
                </p>
                <p className="truncate font-display text-base font-semibold text-ink sm:text-lg">
                  {clinic.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RevealOnScroll
        as="ul"
        stagger={0.08}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-ink/[0.08] bg-ink/[0.08] sm:rounded-[1.75rem] md:mt-16 lg:grid-cols-4"
      >
        {clinic.stats.map((stat) => (
          <RevealItem as="li" key={stat.id} className="bg-canvas p-5 sm:p-8">
            <p className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-medium leading-none tracking-[-0.04em] text-ink">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </p>
            <p className="mt-3 text-sm font-medium text-ink">{stat.label}</p>
            {stat.note ? <p className="mt-1 text-xs text-muted">{stat.note}</p> : null}
          </RevealItem>
        ))}
      </RevealOnScroll>
    </Section>
  );
}
