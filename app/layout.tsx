import type { Metadata, Viewport } from 'next';
import { Golos_Text, Manrope } from 'next/font/google';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { clinic } from '@/data/clinic';
import { buildJsonLd, defaultMetadata } from '@/lib/seo';

import './globals.css';

/**
 * Пара шрифтов: Manrope (display, геометрический гротеск с мягкими формами —
 * читается «дорого» и человечно) + Golos Text (текст, отличная кириллица).
 * Оба подключаются локально через next/font — без FOUT и внешних запросов.
 */
const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#faf9f7' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="ru" className={`${manrope.variable} ${golos.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Перейти к содержимому
        </a>

        <Header phone={clinic.contacts.phone} phoneHref={clinic.contacts.phoneHref} />

        <main id="main">{children}</main>

        <Footer clinic={clinic} />

        <script
          type="application/ld+json"
          // JSON-LD проверен и формируется на билде из типизированных данных.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
