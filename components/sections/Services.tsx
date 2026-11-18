import type { Clinic } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { RevealItem, RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface ServicesProps {
  clinic: Clinic;
}

/**
 * Услуги: сетка карточек с hairline-бордером, hover-подъёмом и ценой «от».
 * Никаких «иконочных плиток» с эмодзи — только линейные SVG.
 */
export default function Services({ clinic }: ServicesProps) {
  return (
    <Section id="services" labeledBy="services-title" tone="sand">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <SectionHeading
          eyebrow="Услуги и цены"
          id="services-title"
          title={
            <>
              Всё, что нужно зубам — <span className="text-forest">в одном месте</span>
            </>
          }
          description="От профилактики до имплантации. Цены указаны «от»: точную стоимость врач называет после осмотра и фиксирует в смете до начала лечения."
        />
        <ButtonLink
          href="#zapis"
          variant="secondary"
          className="shrink-0"
          trailing={<Icon name="arrow-right" className="h-4 w-4" />}
        >
          Записаться на консультацию
        </ButtonLink>
      </div>

      <RevealOnScroll
        as="ul"
        stagger={0.06}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
      >
        {clinic.services.map((service, index) => (
          <RevealItem as="li" key={service.slug} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-ink/[0.08] bg-canvas p-5 transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:border-forest/20 hover:shadow-lift focus-within:-translate-y-1.5 focus-within:shadow-lift sm:p-6">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-mint/0 blur-2xl transition-colors duration-500 group-hover:bg-mint/40"
              />
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-forest/12 bg-surface text-forest shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] transition-colors duration-300 group-hover:border-forest/25 group-hover:bg-mint-soft">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <span className="text-[0.6875rem] tabular-nums text-muted/70">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-6 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {service.title}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-soft/75">
                {service.shortDescription}
              </p>

              <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                <p className="leading-tight">
                  <span className="block text-[0.625rem] uppercase tracking-[0.16em] text-muted">от</span>
                  <span className="font-display text-lg font-semibold text-ink">
                    {formatPrice(service.priceFrom)}
                  </span>
                </p>
                <a
                  href="#zapis"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink/10 px-3 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-forest/30 hover:bg-forest hover:text-canvas"
                  aria-label={`Записаться: ${service.title}`}
                >
                  Записаться
                  <Icon
                    name="arrow-up-right"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>

              {service.priceNote ? (
                <p className="mt-3 text-[0.6875rem] leading-snug text-muted/80">{service.priceNote}</p>
              ) : null}
            </article>
          </RevealItem>
        ))}
      </RevealOnScroll>

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-muted">
        Цены носят ознакомительный характер и не являются публичной офертой. Полный прайс-лист — по
        телефону клиники.
      </p>
    </Section>
  );
}
