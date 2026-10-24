'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useId, useState } from 'react'
import { flushSync } from 'react-dom'

type Theme = 'dark' | 'light'

export const THEME_STORAGE_KEY = 'theme'

function readTheme(): Theme {
	return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
	document.documentElement.dataset.theme = theme
	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme)
	} catch {}
}

export function ThemeToggle() {
	const t = useTranslations('Hero')
	const clipId = useId()
	const [theme, setTheme] = useState<Theme>('dark')

	useEffect(() => setTheme(readTheme()), [])

	function toggle(event: React.MouseEvent<HTMLButtonElement>) {
		const next: Theme = readTheme() === 'dark' ? 'light' : 'dark'
		const root = document.documentElement
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		const change = () =>
			flushSync(() => {
				applyTheme(next)
				setTheme(next)
			})

		if (reducedMotion) return change()

		// Fallback: smooth colour fade for browsers without View Transitions.
		if (!document.startViewTransition) {
			root.classList.add('theme-fade')
			change()
			window.setTimeout(() => root.classList.remove('theme-fade'), 500)
			return
		}

		// Circular reveal of the new theme, growing from the button.
		const box = event.currentTarget.getBoundingClientRect()
		const x = box.left + box.width / 2
		const y = box.top + box.height / 2
		const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

		document.startViewTransition(change).ready.then(() => {
			root.animate(
				{ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
				{ duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
			)
		})
	}

	return (
		<button
			type="button"
			className="theme-toggle"
			onClick={toggle}
			aria-label={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
			title={theme === 'dark' ? t('themeToLight') : t('themeToDark')}
		>
			<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
				<defs>
					<clipPath id={clipId}>
						<path d="M9 1.5a7.5 7.5 0 0 1 0 15z" />
					</clipPath>
				</defs>
				<circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4" />
				<g clipPath={`url(#${clipId})`} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
					<path d="M5 9 13 1M5 12 16 1M5 15 17 3M6 17 17 6M9 17 17 9M12 17 17 12" />
				</g>
				<path d="M9 1.5v15" stroke="currentColor" strokeWidth="1.4" />
			</svg>
		</button>
	)
}
