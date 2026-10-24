'use client'

import { contact } from '@/data/contact'
import { Link } from '@/i18n/navigation'
import { Download } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useLocale, useTranslations } from 'next-intl'
import { HeroPortrait } from './hero-portrait'
import { Signature } from './signature'
import { ThemeToggle } from './theme-toggle'

export function Hero() {
	const t = useTranslations('Hero')
	const locale = useLocale()
	const reducedMotion = useReducedMotion()

	return (
		<section id="top" className="hero" aria-labelledby="hero-heading">
			<motion.header
				className="hero-header"
				initial={reducedMotion ? false : { opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<Link href="/" className="hero-logo" aria-label={t('homeLabel')}>
					<Signature />
				</Link>
				<div className="hero-tools">
					<ThemeToggle />
					<nav className="hero-languages" aria-label={t('languageLabel')}>
						<Link
							href="/"
							locale="en"
							lang="en"
							aria-label="English"
							aria-current={locale === 'en' ? 'page' : undefined}
						>
							EN
						</Link>
						<span aria-hidden="true">/</span>
						<Link
							href="/"
							locale="pt"
							lang="pt-BR"
							aria-label="Português"
							aria-current={locale === 'pt' ? 'page' : undefined}
						>
							PT
						</Link>
					</nav>
					<div className="hero-social">
						<a className="hero-social-link" href={contact.github} target="_blank" rel="noreferrer">
							GitHub
						</a>
						<a className="hero-social-link hero-social-link-filled" href={contact.linkedin} target="_blank" rel="noreferrer">
							LinkedIn
						</a>
					</div>
				</div>
			</motion.header>

			<motion.div
				className="hero-copy"
				initial={reducedMotion ? false : { opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
			>
				<h1 id="hero-heading" className="hero-name">
					{t.rich('name', {
						br: () => <br />,
						serif: (chunks) => <span className="hero-serif">{chunks}</span>,
						idea: (chunks) => (
							<span className="hero-mark">
								{chunks}
								<svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none">
									<path pathLength="1" d="M3 10 C 35 4, 65 2, 94 4 S 151 3, 197 9" />
								</svg>
							</span>
						),
						mark: (chunks) => (
							<span className="hero-mark">
								{chunks}
								<svg
									aria-hidden="true"
									viewBox="0 0 200 14"
									preserveAspectRatio="none"
								>
									<path pathLength="1" d="M3 11 Q 100 -5 197 11" />
								</svg>
							</span>
						),
					})}
				</h1>
				<p className="hero-headline">
					{t.rich('headline', {
						serif: (chunks) => <span className="hero-serif">{chunks}</span>,
					})}
				</p>
				<div className="hero-actions">
					<a
						className="hero-button"
						href="/cv.pdf"
						download="Rodrigo-Gouveia-Estevao-CV.pdf"
					>
						{t('downloadCv')}
						<Download aria-hidden="true" size={16} strokeWidth={1.8} />
					</a>
					<a className="hero-button hero-button-outline" href="#projects">
						{t('viewProjects')}
					</a>
				</div>
				<p className="hero-stat">
					{t.rich('stat', { strong: (chunks) => <strong>{chunks}</strong> })}
				</p>
			</motion.div>

			<motion.div
				className="hero-portrait"
				initial={reducedMotion ? false : { opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
			>
				<HeroPortrait
					alts={[t('portraitAlt'), t('portraitAltIllustration'), t('portraitAltCubist'), t('portraitAltPainterly')]}
					label={t('portraitToggle')}
				/>
			</motion.div>
		</section>
	)
}
