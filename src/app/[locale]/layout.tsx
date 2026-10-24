import type {Metadata} from 'next';
import {DM_Serif_Text, Geist_Mono, Plus_Jakarta_Sans} from 'next/font/google';
import localFont from 'next/font/local';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({subsets: ['latin'], variable: '--font-plus-jakarta-sans', display: 'swap'});
const geistMono = Geist_Mono({subsets: ['latin'], variable: '--font-geist-mono'});
const brittanySignature = localFont({src: '../../fonts/BrittanySignature.ttf', weight: '400', variable: '--font-brittany-signature', display: 'swap'});
const dmSerifText = DM_Serif_Text({subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-dm-serif-text', display: 'swap'});

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){}})()`;

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
    <html lang={locale === 'pt' ? 'pt-BR' : 'en'} data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Applies the saved (or system) theme before the first paint, so there is no flash. */}
        <script dangerouslySetInnerHTML={{__html: themeScript}} />
      </head>
      <body className={`${plusJakartaSans.variable} ${geistMono.variable} ${brittanySignature.variable} ${dmSerifText.variable}`}>
        <NextIntlClientProvider><div className="page">{children}</div></NextIntlClientProvider>
      </body>
    </html>
  );
}
