import type { Metadata } from 'next';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Doctors from '@/components/sections/Doctors';
import Advantages from '@/components/sections/Advantages';
import Reviews from '@/components/sections/Reviews';
import Contacts from '@/components/sections/Contacts';
import { getClinic, revalidate as contentRevalidate } from '@/lib/content';

/**
 * SSG: страница рендерится один раз на этапе `next build`
 * и отдаётся как готовый статический HTML (см. вывод билда: ○ Static).
 * force-static отключает динамические API на уровне роутa.
 */
export const dynamic = 'force-static';
export const revalidate = contentRevalidate;

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinic();
  return {
    title: { absolute: clinic.seo.title },
    description: clinic.seo.description,
  };
}

export default async function HomePage() {
  const clinic = await getClinic();

  return (
    <>
      <Hero clinic={clinic} />
      <About clinic={clinic} />
      <Services clinic={clinic} />
      <Doctors clinic={clinic} />
      <Advantages clinic={clinic} />
      <Reviews clinic={clinic} />
      <Contacts clinic={clinic} />
    </>
  );
}
