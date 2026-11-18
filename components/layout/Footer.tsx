import { Logo } from '@/components/ui/Logo';
import { Icon } from '@/components/ui/Icon';
import type { Clinic } from '@/data/types';
import { toTelHref } from '@/lib/utils';

interface FooterProps {
  clinic: Clinic;
}

const YEAR = new Date().getFullYear();

/** Подвал: повторяющийся «якорь» доверия — контакты, соцсети, юридическая информация. */
export default function Footer({ clinic }: FooterProps) {
  const tel = toTelHref(clinic.contacts.phone);

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-32 h-[22rem] w-[22rem] rounded-full bg-mint/10 blur-3xl sm:-right-32 sm:-top-40 sm:h-[28rem] sm:w-[28rem]"
      />

      <div className="container-page relative py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-canvas/65">
              {clinic.tagline}. {clinic.address.full}.
            </p>
            <div className="mt-7 flex gap-2.5">
              {clinic.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-canvas/15 text-canvas/80 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:border-mint/50 hover:bg-mint/10 hover:text-mint"
                >
                  <Icon name={social.icon} className="h-[1.125rem] w-[1.125rem]" />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Навигация в подвале">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-canvas/45">
              Клиника
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { href: '#about', label: 'О клинике' },
                { href: '#services', label: 'Услуги и цены' },
                { href: '#doctors', label: 'Врачи' },
                { href: '#reviews', label: 'Отзывы' },
                { href: '#zapis', label: 'Запись на приём' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-canvas/70 transition-colors duration-200 hover:text-canvas"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-canvas/45">
              Контакты
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a
                  href={tel}
                  className="font-display text-lg font-medium text-canvas transition-colors duration-200 hover:text-mint"
                >
                  {clinic.contacts.phone}
                </a>
              </li>
              <li className="flex gap-3 text-canvas/70">
                <Icon name="map-pin" className="mt-0.5 h-4 w-4 text-mint/80" />
                <span>{clinic.address.full}</span>
              </li>
              <li className="flex gap-3 text-canvas/70">
                <Icon name="clock" className="mt-0.5 h-4 w-4 text-mint/80" />
                <span>
                  {clinic.hours
                    .filter((h) => !h.closed)
                    .map((h) => `${h.days} ${h.time}`)
                    .join(' · ')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-canvas/10 pt-7 text-xs text-canvas/50 md:mt-14 md:flex-row md:items-center md:justify-between">
          <p>
            © {YEAR} {clinic.legalName}. Все права защищены.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a
                href={clinic.legal.privacyUrl}
                className="transition-colors duration-200 hover:text-canvas"
              >
                Политика конфиденциальности
              </a>
            </li>
            <li>ИНН {clinic.legal.inn}</li>
            {/* TODO: добавить ОГРН и номер лицензии после подтверждения клиникой */}
            <li>Лицензия: уточняется</li>
          </ul>
        </div>

        <p className="mt-6 max-w-3xl text-[0.6875rem] leading-relaxed text-canvas/35">
          Информация на сайте не является публичной офертой и не заменяет консультацию врача.
          Имеются противопоказания, необходима консультация специалиста.
        </p>
      </div>
    </footer>
  );
}
