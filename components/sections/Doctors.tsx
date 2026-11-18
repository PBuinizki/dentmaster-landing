import Image from 'next/image';
import type { Clinic, Doctor } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { RevealItem, RevealOnScroll } from '@/components/ui/RevealOnScroll';
import { Section, SectionHeading } from '@/components/ui/Section';
import { TiltCard } from '@/components/ui/MotionExtras';
import { pluralRu } from '@/lib/utils';

interface DoctorsProps {
  clinic: Clinic;
}

const UNSET = { label: 'Фото уточняется', tone: 'amber' as const };
const SET = { label: 'Врач клиники', tone: 'mint' as const };

function DoctorAvatar({ doctor }: { doctor: Doctor }) {
  if (doctor.photo) {
    return (
      <Image
        src={doctor.photo.src}
        alt={doctor.photo.alt}
        width={doctor.photo.width}
        height={doctor.photo.height}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        className="h-full w-full object-cover object-top transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgb(var(--mint)/0.35),transparent_60%)]"
      role="img"
      aria-label={`Фотография врача ${doctor.name} пока не опубликована`}
    >
      <span className="flex h-24 w-24 items-center justify-center rounded-full border border-forest/15 bg-canvas/80 font-display text-2xl font-semibold tracking-tight text-forest shadow-soft backdrop-blur-sm sm:h-28 sm:w-28 sm:text-3xl">
        {doctor.initials}
      </span>
    </div>
  );
}

export default function Doctors({ clinic }: DoctorsProps) {
  return (
    <Section id="doctors" labeledBy="doctors-title" tone="canvas">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
        <SectionHeading
          eyebrow="Команда"
          id="doctors-title"
          title={
            <>
              Врачи, которым доверяют <span className="text-forest">годами</span>
            </>
          }
          description="Пациенты возвращаются к своим врачам и приводят семьи. Профили ниже — каркас: фотографии и сведения уточняются у клиники."
        />
      </div>

      <RevealOnScroll
        as="ul"
        stagger={0.08}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
      >
        {clinic.doctors.map((doctor) => {
          const badge = doctor.photo ? SET : UNSET;
          return (
            <RevealItem as="li" key={doctor.id} className="h-full">
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/[0.08] bg-surface shadow-soft transition-shadow duration-300 ease-premium hover:shadow-lift">
                  
                  {/* Блок с картинкой: фиксированная высота, чтобы текст не обрезался */}
                  <div className="relative h-[320px] w-full overflow-hidden rounded-b-[1.5rem] bg-sand/40 sm:h-[400px] sm:rounded-b-[2rem]">
                    <DoctorAvatar doctor={doctor} />

                    <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-canvas/85 px-3 py-1 text-[0.6875rem] font-semibold text-forest backdrop-blur-md">
                        <Icon name="badge-check" className="h-3.5 w-3.5" />
                        {doctor.experienceYears}{' '}
                        {pluralRu(doctor.experienceYears, ['год', 'года', 'лет'])} опыта
                      </span>
                      {badge.tone === 'amber' ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-canvas/90 px-3 py-1 text-[0.625rem] font-medium text-amber backdrop-blur-md">
                          <Icon name="external" className="h-3 w-3" />
                          {badge.label}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Блок с текстом */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-[1.125rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                      {doctor.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-forest">{doctor.role}</p>
                    <p className="mt-1 text-[0.8125rem] text-muted">{doctor.specialization}</p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {doctor.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-ink/[0.09] bg-canvas px-2.5 py-1 text-[0.6875rem] text-ink-soft/85"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
                      <a
                        href="#zapis"
                        className="link-underline text-[0.8125rem] font-medium text-ink"
                        aria-label={`Записаться к врачу: ${doctor.name}`}
                      >
                        Записаться к врачу
                        <Icon name="arrow-right" className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealOnScroll>
    </Section>
  );
}