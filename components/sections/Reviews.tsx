import type { Clinic } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { StarRating } from '@/components/ui/Logo';
import { RevealItem, RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';

interface ReviewsProps {
  clinic: Clinic;
}

/**
 * Отзывы: карточки-цитаты со звёздным рейтингом и ссылкой на источник.
 * Тексты — реальные фрагменты отзывов с Яндекс.Карт (сокращены).
 */
export default function Reviews({ clinic }: ReviewsProps) {
  return (
    <Section id="reviews" labeledBy="reviews-title" tone="canvas">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <SectionHeading
          eyebrow="Отзывы"
          id="reviews-title"
          title={
            <>
              Что говорят <span className="text-forest">пациенты</span>
            </>
          }
          description={
            <>
              Рейтинг {clinic.ratings.value.toFixed(1).replace('.', ',')} из 5 по{' '}
              {clinic.ratings.count} оценкам на {clinic.ratings.source}.
            </>
          }
        />

        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-ink/[0.08] bg-surface px-5 py-3.5 shadow-soft">
            <span className="font-display text-3xl font-semibold leading-none text-ink">
              {clinic.ratings.value.toFixed(1).replace('.', ',')}
            </span>
            <span className="flex flex-col gap-1">
              <StarRating value={clinic.ratings.value} size="md" />
              <span className="text-[0.6875rem] text-muted">{clinic.ratings.count} оценок</span>
            </span>
          </div>
          <ButtonLink
            href={clinic.ratings.url}
            variant="secondary"
            trailing={<Icon name="external" className="h-4 w-4" />}
          >
            Все отзывы
          </ButtonLink>
        </div>
      </div>

      <RevealOnScroll
        as="ul"
        stagger={0.08}
        className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-5"
      >
        {clinic.reviews.map((review) => (
          <RevealItem as="li" key={review.id} className="h-full">
            <figure className="flex h-full flex-col rounded-[1.5rem] border border-ink/[0.08] bg-surface p-5 shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:shadow-lift sm:p-7">
              <div className="flex items-center justify-between">
                <Icon name="quote" className="h-6 w-6 text-mint" />
                <StarRating value={review.rating} />
              </div>

              <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-[1.75] text-ink-soft">
                {review.text}
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/[0.07] pt-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mint-soft font-display text-sm font-semibold text-forest">
                  {review.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{review.author}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                    <time dateTime={review.dateISO}>{review.date}</time>
                    <span aria-hidden="true">·</span>
                    {review.sourceUrl ? (
                      <a
                        href={review.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200 hover:text-forest"
                      >
                        {review.source}
                      </a>
                    ) : (
                      review.source
                    )}
                  </span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealOnScroll>
    </Section>
  );
}
