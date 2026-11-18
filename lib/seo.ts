/**
 * SEO-слой: metadata + JSON-LD schema.org/Dentist.
 * Всё вычисляется на билде (SSG), поэтому поисковики получают
 * готовые мета-теги и структурированные данные в статическом HTML.
 */
import type { Metadata } from 'next';

import { clinic } from '@/data/clinic';
import { SITE_URL, absoluteUrl } from './utils';

export const siteName = `${clinic.name} — стоматологическая клиника в Орле`;

function buildAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.region,
    postalCode: clinic.address.postalCode,
    addressCountry: 'RU',
  } as const;
}

/** «Пн–Пт 09:00-14:00, Сб-Вс off» -> openingHoursSpecification. */
function buildOpeningHours() {
  const dayMap: Record<string, string[]> = {
    Пн: ['Monday'],
    Вт: ['Tuesday'],
    Ср: ['Wednesday'],
    Чт: ['Thursday'],
    Пт: ['Friday'],
    Сб: ['Saturday'],
    Вс: ['Sunday'],
  };

  const order = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const expandDays = (days: string): string[] => {
    const [from, to] = days.split(/[–-]/).map((d) => d.trim().slice(0, 2));
    if (!from) return [];
    if (!to) return dayMap[from] ?? [];
    const start = order.indexOf(from);
    const end = order.indexOf(to);
    if (start === -1 || end === -1) return [];
    const seq: string[] = [];
    for (let i = start; i <= end; i += 1) seq.push(order[i]!);
    return seq.flatMap((d) => dayMap[d] ?? []);
  };

  return clinic.hours
    .filter((h) => !h.closed)
    .flatMap((h) => {
      const [opens, closes] = h.time.split(/[–-]/).map((t) => t.trim());
      if (!opens || !closes) return [];
      return [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: expandDays(h.days),
          opens,
          closes,
        },
      ];
    });
}

export function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${SITE_URL}/#clinic`,
    name: clinic.name,
    legalName: clinic.legalName,
    description: clinic.shortDescription,
    url: SITE_URL,
    image: absoluteUrl(clinic.seo.ogImage),
    logo: absoluteUrl('/icon.svg'),
    telephone: clinic.contacts.phone,
    email: clinic.contacts.email,
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Наличные, банковские карты', // TODO: уточнить способы оплаты
    address: buildAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: clinic.address.coordinates.lat,
      longitude: clinic.address.coordinates.lng,
    },
    hasMap: clinic.map.orgUrl,
    areaServed: {
      '@type': 'City',
      name: clinic.address.city,
    },
    openingHoursSpecification: buildOpeningHours(),
    medicalSpecialty: ['Dentistry'],
    availableService: clinic.services.map((service) => ({
      '@type': 'MedicalProcedure',
      name: service.title,
      description: service.shortDescription,
      bodyLocation: 'Полость рта',
    })),
    // aggregateRating — из публичной карточки; TODO: обновлять по API отзывов.
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: clinic.ratings.value,
      reviewCount: clinic.ratings.count,
      bestRating: 5,
      worstRating: 1,
    },
    founder: {
      '@type': 'Person',
      name: clinic.doctors[0]?.name,
    },
    employees: clinic.doctors.map((doctor) => ({
      '@type': 'Person',
      name: doctor.name,
      jobTitle: doctor.role,
    })),
    sameAs: clinic.socials.map((s) => s.href).filter((href) => !href.endsWith('t.me/')),
  } satisfies Record<string, unknown>;
}

/** Metadata для App Router. */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: clinic.seo.title,
    template: `%s · ${clinic.name}`,
  },
  description: clinic.seo.description,
  keywords: clinic.seo.keywords,
  applicationName: clinic.name,
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: clinic.seo.locale,
    url: SITE_URL,
    siteName: clinic.name,
    title: clinic.seo.title,
    description: clinic.seo.description,
    images: [
      {
        url: clinic.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${clinic.name} — стоматологическая клиника в Орле`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: clinic.seo.title,
    description: clinic.seo.description,
    images: [clinic.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png' }],
  },
  category: 'health',
};
