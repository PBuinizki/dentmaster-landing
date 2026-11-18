import type { Clinic } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { RevealItem, RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Section, SectionHeading } from '@/components/ui/Section';

interface AdvantagesProps {
  clinic: Clinic;
}

/**
 * Преимущества: тёмная секция как «пауза» между светлыми блоками.
 * Даёт контраст и ощущение премиального глянца без перегруза.
 */
export default function Advantages({ clinic }: AdvantagesProps) {
  return (
    <Section id="advantages" labeledBy="advantages-title" tone="forest" className="grain on-dark relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-[24rem] w-[24rem] rounded-full bg-mint/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[20rem] w-[20rem] rounded-full bg-sand/10 blur-3xl"
      />

      <div className="relative">
        <SectionHeading
          eyebrow="Почему нас выбирают"
          id="advantages-title"
          title={
            <>
              Спокойствие, техника и{' '}
              <span className="text-mint">честные договорённости</span>
            </>
          }
          description="Мы не продаём лишние процедуры. Наша задача — сделать лечение предсказуемым и комфортным, а результат — долговечным."
          className="max-w-3xl"
        />

        <RevealOnScroll
          as="ul"
          stagger={0.07}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
        >
          {clinic.advantages.map((advantage) => (
            <RevealItem as="li" key={advantage.id} className="h-full">
              <article className="group flex h-full flex-col gap-4 rounded-[1.5rem] border border-canvas/12 bg-canvas/[0.045] p-5 backdrop-blur-sm transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-mint/30 hover:bg-canvas/[0.08] sm:p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-mint/25 bg-mint/10 text-mint transition-colors duration-300 group-hover:bg-mint/20">
                  <Icon name={advantage.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] text-canvas">
                  {advantage.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-canvas/70">{advantage.description}</p>
              </article>
            </RevealItem>
          ))}
        </RevealOnScroll>
      </div>
    </Section>
  );
}
