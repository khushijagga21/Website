import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/dom'

gsap.registerPlugin(ScrollTrigger)

export type RevealVariant = 'fade-up' | 'fade' | 'scale' | 'clip-up' | 'blur-up'

type RevealOpts = {
  y?: number
  stagger?: number
  delay?: number
  variant?: RevealVariant
  start?: string
  scrub?: boolean | number
}

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { y: 48, opacity: 0 },
  fade: { opacity: 0 },
  scale: { scale: 0.92, opacity: 0 },
  'clip-up': { y: 60, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
  'blur-up': { y: 36, opacity: 0, filter: 'blur(12px)' },
}

const VARIANTS_TO: Record<RevealVariant, gsap.TweenVars> = {
  'fade-up': { y: 0, opacity: 1 },
  fade: { opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  'clip-up': { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  'blur-up': { y: 0, opacity: 1, filter: 'blur(0px)' },
}

export function useScrollReveal<T extends HTMLElement>(opts: RevealOpts = {}) {
  const ref = useRef<T | null>(null)
  const variant = opts.variant ?? 'fade-up'

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const items = el.querySelectorAll('[data-reveal]')
    if (!items.length) return

    const from = { ...VARIANTS[variant] }
    if (opts.y !== undefined && 'y' in from) from.y = opts.y
    gsap.set(items, from)

    const ctx = gsap.context(() => {
      gsap.to(items, {
        ...VARIANTS_TO[variant],
        duration: opts.scrub ? 1 : 1.1,
        ease: 'power3.out',
        stagger: opts.stagger ?? 0.1,
        delay: opts.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? 'top 80%',
          toggleActions: opts.scrub ? undefined : 'play none none reverse',
          scrub: opts.scrub ?? false,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [opts.delay, opts.scrub, opts.stagger, opts.start, opts.variant, opts.y])

  return ref
}

export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T | null>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => speed * 120,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [speed])

  return ref
}

export function usePinnedSection<T extends HTMLElement>(
  onProgress?: (progress: number) => void,
) {
  const ref = useRef<T | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const steps = el.querySelectorAll('[data-step]')
    const line = el.querySelector('[data-progress-line]')
    if (line) gsap.set(line, { scaleY: 0, transformOrigin: 'top' })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: () => `+=${steps.length * 400}`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => onProgress?.(self.progress),
        },
      })

      steps.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { opacity: 1, y: 0 })
        } else {
          gsap.set(step, { opacity: 0, y: 24, pointerEvents: 'none' })
        }
      })

      steps.forEach((step, i) => {
        if (i === 0) return
        tl.to(
          steps[i - 1],
          { opacity: 0, y: -20, duration: 0.5, ease: 'power2.inOut' },
          i,
        ).to(
          step,
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.inOut' },
          i,
        )
      })

      if (line) {
        tl.to(
          line,
          {
            scaleY: 1,
            ease: 'none',
            duration: steps.length,
          },
          0,
        )
      }
    }, el)

    return () => ctx.revert()
  }, [onProgress])

  return { ref, progressRef }
}
