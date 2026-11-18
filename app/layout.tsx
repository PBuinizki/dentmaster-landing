import type { Metadata, Viewport } from 'next';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { clinic } from '@/data/clinic';
import { buildJsonLd, defaultMetadata } from '@/lib/seo';

import './globals.css';

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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap&subset=cyrillic,latin"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
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
