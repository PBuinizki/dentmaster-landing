import type { Clinic } from '@/data/types';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { OpenStatusBadge } from '@/components/ui/OpenStatusBadge';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { toTelHref } from '@/lib/utils';

interface ContactsProps {
  clinic: Clinic;
}

/**
 * Контакты + карта + форма записи.
 * Карта — ленивый iframe Яндекса (loading="lazy"), чтобы не портить LCP.
 */
export default function Contacts({ clinic }: ContactsProps) {
  const tel = toTelHref(clinic.contacts.phone);

  return (
    <Section id="contacts" labeledBy="contacts-title" tone="sand" className="relative">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Контакты</p>
          <h2 id="contacts-title" className="h2 mt-4 text-balance sm:mt-5">
            Заходите — мы в центре <span className="text-forest">Орла</span>
          </h2>
          <p className="lead mt-4 max-w-md sm:mt-5">
            Удобно добраться из исторического центра. Приём — по предварительной записи, чтобы
            вам не пришлось ждать.
          </p>

          <ul className="mt-7 flex flex-col gap-px overflow-hidden rounded-[1.5rem] border border-ink/[0.08] bg-ink/[0.08] sm:mt-9">
            <li className="flex items-start gap-3 bg-canvas p-4 sm:gap-4 sm:p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-forest">
                <Icon name="map-pin" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  Адрес
                </span>
                <span className="mt-1 block text-[0.9375rem] font-medium text-ink">
                  {clinic.address.full}
                </span>
                {clinic.address.landmark ? (
                  <span className="mt-0.5 block text-xs text-muted">{clinic.address.landmark}</span>
                ) : null}
              </span>
            </li>

            <li className="flex items-start gap-3 bg-canvas p-4 sm:gap-4 sm:p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-forest">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  Телефон
                </span>
                <a
                  href={tel}
                  className="mt-1 block font-display text-[1.0625rem] font-semibold text-ink transition-colors duration-200 hover:text-forest"
                >
                  {clinic.contacts.phone}
                </a>
                <span className="mt-0.5 block text-xs text-muted">Запись и вопросы по лечению</span>
              </span>
            </li>

            <li className="flex items-start gap-3 bg-canvas p-4 sm:gap-4 sm:p-5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mint-soft text-forest">
                <Icon name="clock" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  Часы работы
                </span>
                <span className="mt-1 flex flex-col gap-1 text-[0.9375rem] text-ink">
                  {clinic.hours.map((slot) => (
                    <span key={slot.days} className="flex items-baseline justify-between gap-4">
                      <span className="text-muted">{slot.days}</span>
                      <span className={slot.closed ? 'text-muted' : 'font-medium tabular-nums'}>
                        {slot.time}
                      </span>
                    </span>
                  ))}
                </span>
                {clinic.hoursNote ? (
                  <span className="mt-2 block text-xs leading-snug text-muted">{clinic.hoursNote}</span>
                ) : null}
              </span>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ButtonLink
              href={clinic.map.routeUrl}
              variant="primary"
              leading={<Icon name="route" className="h-4 w-4" />}
            >
              Построить маршрут
            </ButtonLink>
            <OpenStatusBadge hours={clinic.hours} className="text-muted" />
          </div>

          <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-ink/[0.08] bg-canvas shadow-soft">
            <iframe
              src={clinic.map.embedUrl}
              title="Карта: ДентМастер, ул. Пушкина, 24, Орёл"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[240px] w-full border-0 sm:h-[320px]"
            />
          </div>
        </div>

        <div id="zapis" className="scroll-mt-28 lg:col-span-7">
          <div className="h-full rounded-[1.5rem] border border-ink/[0.07] bg-surface p-5 shadow-soft sm:rounded-[2rem] sm:p-9 lg:p-10">
            <div className="flex flex-col gap-3">
              <p className="eyebrow">Запись на приём</p>
              <h3 className="h3 text-balance text-[1.375rem] sm:text-[1.75rem]">
                Запишитесь — перезвоним и подберём удобное время
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft/80">
                Оставьте имя и телефон. Администратор уточнит запрос и предложит свободные окна.
                Никаких звонков «по поводу акций» — только по вашей записи.
              </p>
            </div>

            <AppointmentForm className="mt-7 sm:mt-8" />

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/[0.07] pt-6 text-xs text-muted sm:mt-8">
              <span className="inline-flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-forest" />
                Данные защищены
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-forest" />
                Ответим в рабочее время
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="wallet" className="h-4 w-4 text-forest" />
                Смета до начала лечения
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
