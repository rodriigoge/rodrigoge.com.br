'use client';

import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {motion, useReducedMotion} from 'motion/react';
import {Link} from '@/i18n/navigation';

function Underline({children}: {children: React.ReactNode}) {
  return (
    <span className="hero-underline">
      {children}
      <svg aria-hidden="true" viewBox="0 0 500 12" preserveAspectRatio="none">
        <path d="M2 7 C125 6 305 8 497 6" />
        <path d="M3 8 C190 9 341 7 483 8" />
      </svg>
    </span>
  );
}

export function Hero() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const reducedMotion = useReducedMotion();

  return (
    <section id="top" className="hero" aria-labelledby="hero-heading">
      <header className="hero-header">
        <Link href="/" className="hero-logo" aria-label={t('homeLabel')}>RG.</Link>
        <nav className="hero-languages" aria-label={t('languageLabel')}>
          <Link href="/" locale="en" lang="en" aria-label="English" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link>
          <span aria-hidden="true">/</span>
          <Link href="/" locale="pt" lang="pt-BR" aria-label="Português" aria-current={locale === 'pt' ? 'page' : undefined}>PT</Link>
        </nav>
      </header>

      <motion.div className="hero-copy"
        initial={reducedMotion ? false : {opacity: 0, y: 12}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut'}}>
        <p className="hero-greeting">{t('greeting')}</p>
        <h1 id="hero-heading" className="hero-statement">
          {t.rich('statement', {
            systems: (chunks) => <Underline>{chunks}</Underline>,
            problems: (chunks) => <Underline>{chunks}</Underline>
          })}
        </h1>
        <p className="hero-specialties">{t('specialties')}</p>
      </motion.div>

      <div className="hero-portrait">
        <Image src="/images/rodrigo-cutout.png" alt={t('portraitAlt')} fill priority
          sizes="(max-width: 700px) 100vw, 42vw" />
      </div>
    </section>
  );
}
