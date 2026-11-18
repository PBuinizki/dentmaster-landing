import type { MetadataRoute } from 'next';
import { clinic } from '@/data/clinic';
import { SITE_URL } from '@/lib/utils';

/** /sitemap.xml генерируется на билде (статический файл). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}${clinic.legal.privacyUrl}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
