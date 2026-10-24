'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

const SOURCES = [
	'/images/portrait-sketch.webp',
	'/images/portrait-smirking.png',
	'/images/portrait-cubist.webp',
	'/images/portrait-painterly.webp',
] as const
const WIDTH = 480
const HEIGHT = 640
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }

// Continuous seeded noise produces rounded burn holes, without a visible grid.
function noise(x: number, y: number) {
	const ix = Math.floor(x), iy = Math.floor(y)
	const hash = (a: number, b: number) => {
		const v = Math.sin(a * 127.1 + b * 311.7 + 17) * 43758.5453
		return v - Math.floor(v)
	}
	const tx = smooth(x - ix), ty = smooth(y - iy)
	const top = hash(ix, iy) * (1 - tx) + hash(ix + 1, iy) * tx
	const bottom = hash(ix, iy + 1) * (1 - tx) + hash(ix + 1, iy + 1) * tx
	return top * (1 - ty) + bottom * ty
}

type Props = { alts: [string, string, string, string]; label: string }

export function HeroPortrait({ alts, label }: Props) {
	const canvas = useRef<HTMLCanvasElement>(null)
	const frames = useRef<ImageData[]>([])
	const field = useRef<Float32Array>(new Float32Array(0))
	const active = useRef(0)
	const animation = useRef(0)
	const busy = useRef(false)
	const [current, setCurrent] = useState(0)
	const [ready, setReady] = useState(false)
	const [hovering, setHovering] = useState(false)
	const [failed, setFailed] = useState(false)
	const reducedMotion = useReducedMotion()
	const pointerX = useMotionValue(0)
	const pointerY = useMotionValue(0)
	const cursorX = useMotionValue(0)
	const cursorY = useMotionValue(0)
	const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 24 })
	const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 24 })

	useEffect(() => {
		let cancelled = false
		Promise.all(SOURCES.map(src => new Promise<HTMLImageElement>((resolve, reject) => {
			const image = new window.Image()
			image.onload = () => resolve(image)
			image.onerror = reject
			image.src = src
		}))).then(images => {
			if (cancelled) return
			const context = canvas.current?.getContext('2d')
			if (!context) return
			frames.current = images.map(image => {
				// Transparent canvas: the cut-out portraits sit directly on the page, in any theme.
				context.clearRect(0, 0, WIDTH, HEIGHT)
				const scale = Math.max(WIDTH / image.width, HEIGHT / image.height)
				context.drawImage(image, (WIDTH - image.width * scale) / 2, (HEIGHT - image.height * scale) / 2, image.width * scale, image.height * scale)
				return context.getImageData(0, 0, WIDTH, HEIGHT)
			})
			field.current = new Float32Array(WIDTH * HEIGHT)
			for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < WIDTH; x++) {
				const organic = noise(x / 90, y / 90) * 0.24 + noise(x / 32, y / 32) * 0.12 + noise(x / 11, y / 11) * 0.035
				field.current[y * WIDTH + x] = (1 - y / HEIGHT) * 0.66 + organic
			}
			context.putImageData(frames.current[0], 0, 0)
			setReady(true)
		}).catch(() => { if (!cancelled) setFailed(true) })
		return () => { cancelled = true; cancelAnimationFrame(animation.current); busy.current = false }
	}, [])

	const transition = useCallback(() => {
		const context = canvas.current?.getContext('2d')
		if (!context || frames.current.length !== SOURCES.length || busy.current) return
		const next = (active.current + 1) % SOURCES.length
		const finish = () => {
			context.putImageData(frames.current[next], 0, 0)
			active.current = next
			setCurrent(next)
			busy.current = false
		}
		if (reducedMotion) { finish(); return }
		busy.current = true
		const output = context.createImageData(WIDTH, HEIGHT)
		const from = frames.current[active.current].data
		const to = frames.current[next].data
		const started = performance.now()
		const draw = (now: number) => {
			const elapsed = clamp((now - started) / 2400)
			const threshold = -0.07 + smooth(elapsed) * 1.2
			for (let pixel = 0; pixel < field.current.length; pixel++) {
				const distance = field.current[pixel] - threshold
				const reveal = 1 - smooth((distance + 0.009) / 0.018)
				const edge = Math.max(0, 1 - Math.abs(distance) / 0.025)
				const i = pixel * 4
				const fromAlpha = from[i + 3] / 255
				const toAlpha = to[i + 3] / 255
				const alpha = fromAlpha * (1 - reveal) + toAlpha * reveal
				// Glow follows only the irregular combustion front, and only over the portraits.
				const luminance = Math.max(from[i] * fromAlpha, from[i + 1] * fromAlpha, from[i + 2] * fromAlpha, to[i] * toAlpha, to[i + 1] * toAlpha, to[i + 2] * toAlpha) / 255
				const ember = edge * edge * luminance
				for (let channel = 0; channel < 3; channel++) {
					// Alpha-weighted blend avoids dark fringes around the cut-outs.
					const color = alpha > 0 ? (from[i + channel] * fromAlpha * (1 - reveal) + to[i + channel] * toAlpha * reveal) / alpha : 0
					output.data[i + channel] = color * (1 - edge * 0.3) + ember * (channel === 0 ? 240 : channel === 1 ? 95 : 18)
				}
				output.data[i + 3] = Math.min(255, (alpha + ember * 0.6) * 255)
			}
			context.putImageData(output, 0, 0)
			if (elapsed < 1) animation.current = requestAnimationFrame(draw)
			else finish()
		}
		animation.current = requestAnimationFrame(draw)
	}, [reducedMotion])

	useEffect(() => {
		if (!ready || reducedMotion || hovering) return
		const timer = window.setTimeout(transition, 5200)
		return () => window.clearTimeout(timer)
	}, [ready, current, reducedMotion, hovering, transition])

	return (
		<button type="button" className={`portrait${hovering ? ' is-hovering' : ''}`} aria-label={label} onClick={transition} disabled={!ready}
			onPointerEnter={event => {
				if (event.pointerType !== 'mouse') return
				const box = event.currentTarget.getBoundingClientRect()
				cursorX.set(event.clientX - box.left)
				cursorY.set(event.clientY - box.top)
				setHovering(true)
			}}
			onPointerMove={event => {
				if (event.pointerType !== 'mouse') return
				const box = event.currentTarget.getBoundingClientRect()
				cursorX.set(event.clientX - box.left)
				cursorY.set(event.clientY - box.top)
				if (reducedMotion) return
				pointerX.set((event.clientX - box.left) / box.width - 0.5)
				pointerY.set((event.clientY - box.top) / box.height - 0.5)
			}}
			onPointerLeave={() => { setHovering(false); pointerX.set(0); pointerY.set(0) }}>
			<motion.span className={`portrait-card${current === 1 ? ' portrait-card-cutout' : ''}`} style={{ rotateX, rotateY }}>
				{!ready && <img className="portrait-fallback" src={SOURCES[0]} alt={alts[0]} />}
				<canvas ref={canvas} width={WIDTH} height={HEIGHT} className="portrait-canvas" role="img" aria-label={alts[current]} hidden={failed} />
			</motion.span>
			<motion.span className="portrait-cursor" aria-hidden="true" style={{ x: cursorX, y: cursorY, opacity: hovering ? 1 : 0 }} />
		</button>
	)
}
