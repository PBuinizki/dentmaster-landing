export type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Минимальная замена clsx: склеивает классы без лишних зависимостей. */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (value: ClassValue) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    out.push(String(value));
  };
  inputs.forEach(walk);
  return out.join(' ');
}

/** Приводит телефон к формату tel: href. */
export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}

const rubles = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** 32000 -> «32 000 ₽» (узкий пробел, как принято в типографике). */
export function formatPrice(value: number): string {
  return rubles.format(value).replace(/\s/g, '\u00A0');
}

export function pluralRu(count: number, forms: [string, string, string]): string {
  const abs = Math.abs(count) % 100;
  const tail = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (tail > 1 && tail < 5) return forms[1];
  if (tail === 1) return forms[0];
  return forms[2];
}

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dentmaster-orel.ru').replace(
  /\/$/,
  '',
);

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
