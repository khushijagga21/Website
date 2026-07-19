import { useLayoutEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ArchitectScene } from '../three/ArchitectScene'
import { useMagnetic } from '../../hooks/useMagnetic'
import { prefersReducedMotion } from '../../utils/dom'

function SplitLetters({ text }: { text: string }) {
  const letters = useMemo(() => text.split(''), [text])
  return (
    <span aria-label={text} role="text" className="inline-block">
      {letters.map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="inline-block will-change-transform"
          data-letter="true"
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  )
}

function PrimaryButton({
  children,
  variant = 'primary',
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}) {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.2, scale: 1.03 })
  const base =
    'relative inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm tracking-[0.18em] transition-transform duration-300 [transition-timing-function:var(--ease-out)] active:translate-y-[1px]'

  const skin =
    variant === 'primary'
      ? 'text-[rgb(var(--bg))] bg-[linear-gradient(135deg,rgb(var(--accent)),rgb(var(--glow)))]'
      : 'text-[rgb(var(--text))] bg-[rgb(var(--glass))] border border-[rgb(var(--border))] backdrop-blur-xl'

  return (
    <button
      ref={ref}
      type="button"
      data-cursor="hover"
      className={`${base} ${skin} group overflow-hidden`}
      style={{
        boxShadow:
          variant === 'primary'
            ? '0 18px 50px rgb(var(--shadow)), 0 0 0 1px rgb(var(--border))'
            : '0 18px 50px rgb(var(--shadow)), 0 0 0 1px rgb(var(--border))',
      }}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_40%,rgb(var(--glow)/0.55),transparent_55%)]" />
      </span>
      <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.20),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
    </button>
  )
}

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = rootRef.current
    if (!el) return

    const letters = el.querySelectorAll('[data-letter="true"]')
    const p = el.querySelector('[data-hero="p"]')
    const btns = el.querySelectorAll('[data-hero="btn"]')

    gsap.set(letters, { y: 34, rotateX: 70, opacity: 0 })
    gsap.set(p, { y: 14, opacity: 0 })
    gsap.set(btns, { y: 10, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(letters, {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.012,
    })
      .to(
        p,
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.45,
      )
      .to(
        btns,
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08 },
        0.65,
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 pb-28 pt-28 md:min-h-[calc(100svh-2rem)] md:pb-32 md:pt-32"
    >
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <div className="text-xs tracking-[0.34em] text-[rgb(var(--muted))]">
            PREMIUM ARCHITECTURE • MODERN SPACES • CRAFTED DETAIL
          </div>

          <h1 className="mt-5 font-[var(--font-display)] text-5xl leading-[0.92] tracking-[-0.04em] md:text-[72px]">
            <SplitLetters text="Crafting" />
            <br />
            <SplitLetters text="Spaces" />
            <br />
            <span className="relative inline-block">
              <SplitLetters text="That Inspire" />
              <span className="pointer-events-none absolute -inset-x-2 -bottom-3 h-px bg-[linear-gradient(90deg,transparent,rgb(var(--accent)/0.65),rgb(var(--glow)/0.65),transparent)] opacity-60" />
            </span>
          </h1>

          <p
            data-hero="p"
            className="mt-6 max-w-prose text-base leading-relaxed text-[rgb(var(--muted))] md:text-lg"
          >
            ARQO Design Collective shapes contemporary environments with a luxury-minimal
            sensibility—precise geometry, warm materiality, and lighting that feels cinematic yet
            effortless.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.div data-hero="btn" initial={false}>
              <PrimaryButton>Explore Projects</PrimaryButton>
            </motion.div>
            <motion.div data-hero="btn" initial={false}>
              <PrimaryButton variant="secondary">Book Consultation</PrimaryButton>
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-6">
          <div
            className="relative overflow-hidden rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] backdrop-blur-2xl"
            style={{
              boxShadow:
                '0 0 0 1px rgb(var(--border)), 0 40px 90px rgb(var(--shadow))',
            }}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_30%_30%,rgb(var(--glow)/0.35),transparent_60%)]" />
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_80%_60%,rgb(var(--accent2)/0.30),transparent_60%)]" />
            </div>

            <div className="relative aspect-[4/3] w-full">
              <Canvas
                dpr={[1, 2]}
                camera={{ position: [2.6, 2.1, 3.35], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <ArchitectScene />
              </Canvas>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
              <div className="text-xs tracking-[0.22em] text-[rgb(var(--muted))]">
                INTERACTIVE SCULPTURE
              </div>
              <div className="text-xs tracking-[0.22em] text-[rgb(var(--muted))]">
                MOVE CURSOR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

