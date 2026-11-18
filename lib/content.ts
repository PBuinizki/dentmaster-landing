/**
 * Слой доступа к контенту.
 *
 * Сейчас данные статические (data/clinic.ts) и "вшиваются" в билд,
 * поэтому страница получается полностью статической (SSG).
 *
 * Переезд на Headless CMS:
 *   1. Раскомментировать fetch к Strapi/Sanity/Contentful.
 *   2. Добавить маппер CmsResponse -> Clinic.
 *   3. Оставить generateStaticParams + revalidate — компоненты не меняются.
 */
import { clinic as staticClinic, clinicTimeZone } from '@/data/clinic';
import type { Clinic } from '@/data/types';

const REVALIDATE_SECONDS = 60 * 60 * 24;

async function fetchClinic(): Promise<Clinic> {
  // TODO(cms): заменить на реальный источник.
  // const res = await fetch(`${process.env.CMS_URL}/api/clinic?locale=ru`, {
  //   next: { revalidate: REVALIDATE_SECONDS, tags: ['clinic'] },
  // });
  // if (!res.ok) return staticClinic;
  // return mapCmsToClinic(await res.json());
  return staticClinic;
}

export async function getClinic(): Promise<Clinic> {
  return fetchClinic();
}

export async function getClinicSlugs(): Promise<string[]> {
  const clinic = await fetchClinic();
  return [clinic.slug];
}

export { clinicTimeZone };
export const revalidate = REVALIDATE_SECONDS;
