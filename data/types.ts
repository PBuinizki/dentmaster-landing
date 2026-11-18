/**
 * Типы контента сайта.
 *
 * Это контракт между вёрсткой и источником данных. Сейчас источник —
 * data/clinic.ts, позже — Strapi / Sanity / Contentful: достаточно
 * реализовать маппинг CMS-ответа в эти же типы, компоненты менять не нужно.
 */

export type IconName =
  | 'phone'
  | 'map-pin'
  | 'clock'
  | 'calendar'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-left'
  | 'check'
  | 'star'
  | 'quote'
  | 'menu'
  | 'close'
  | 'plus'
  | 'chevron-down'
  | 'mail'
  | 'route'
  | 'sparkles'
  | 'tooth'
  | 'implant'
  | 'crown'
  | 'surgery'
  | 'child'
  | 'aligner'
  | 'aesthetics'
  | 'shield'
  | 'scan'
  | 'feather'
  | 'badge-check'
  | 'users'
  | 'wallet'
  | 'microscope'
  | 'heart'
  | 'external'
  | 'telegram'
  | 'whatsapp'
  | 'yandex';

export interface ImageAsset {
  /** Путь относительно /public. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Base64 LQIP для blur-плейсхолдера next/image. */
  blurDataURL?: string;
  caption?: string;
}

export interface OpeningHours {
  /** Например: «Пн–Пт». */
  days: string;
  /** Например: «09:00–14:00» или «выходной». */
  time: string;
  closed?: boolean;
}

export interface Address {
  country: string;
  region: string;
  city: string;
  street: string;
  postalCode: string;
  /** Полная строка для отображения и schema.org. */
  full: string;
  metro?: string;
  landmark?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Stat {
  id: string;
  value: number;
  /** + / % / ₽ и т. п. */
  suffix?: string;
  prefix?: string;
  label: string;
  /** Пояснение под цифрой. */
  note?: string;
  /** true — значение нужно уточнить у клиники. */
  placeholder?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  /** Полное описание для будущей страницы услуги / CMS. */
  description: string;
  priceFrom: number;
  priceNote?: string;
  duration?: string;
  icon: IconName;
  featured?: boolean;
  includes: string[];
}

export interface Doctor {
  id: string;
  name: string;
  initials: string;
  role: string;
  specialization: string;
  experienceYears: number;
  education?: string;
  tags: string[];
  image: ImageAsset;
  /** Реальная фотография врача (обязательна для публикации профиля). */
  photo?: ImageAsset;
  /** true — профиль-заглушка, требует подтверждения клиники. */
  placeholder?: boolean;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  date: string;
  /** ISO-дата для <time dateTime>. */
  dateISO: string;
  rating: number;
  text: string;
  source: string;
  sourceUrl?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface ClinicRatings {
  value: number;
  count: number;
  source: string;
  url: string;
}

export interface ClinicSeo {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  locale: string;
}

export interface ClinicLegal {
  legalName: string;
  inn: string;
  ogrn?: string;
  license?: string;
  privacyUrl: string;
}

export interface Clinic {
  /** Стабильный идентификатор для CMS и sitemap. */
  slug: string;
  name: string;
  legalName: string;
  tagline: string;
  specialization: string;
  shortDescription: string;
  description: string[];
  foundedYear: number;
  address: Address;
  contacts: {
    phone: string;
    phoneHref: string;
    email: string;
    whatsapp?: string;
    telegram?: string;
  };
  hours: OpeningHours[];
  hoursNote?: string;
  map: {
    embedUrl: string;
    routeUrl: string;
    orgUrl: string;
  };
  ratings: ClinicRatings;
  stats: Stat[];
  services: Service[];
  doctors: Doctor[];
  advantages: Advantage[];
  reviews: Review[];
  socials: SocialLink[];
  seo: ClinicSeo;
  legal: ClinicLegal;
  /** false — контент-заглушка, которую нужно подтвердить перед публикацией. */
  verified: boolean;
}
