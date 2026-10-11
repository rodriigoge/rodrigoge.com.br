import type {Metadata} from 'next';
import {Geist, Geist_Mono, Twinkle_Star} from 'next/font/google';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css';

const geist = Geist({subsets: ['latin'], variable: '--font-geist-sans'});
const geistMono = Geist_Mono({subsets: ['latin'], variable: '--font-geist-mono'});
const twinkleStar = Twinkle_Star({subsets: ['latin'], weight: '400', variable: '--font-twinkle-star', display: 'swap'});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({locale, namespace: 'Metadata'});
  return {title: t('title'), description: t('description')};
}

export default async function RootLayout({children, params}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'}>
      <body className={`${geist.variable} ${geistMono.variable} ${twinkleStar.variable}`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
