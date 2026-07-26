import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../utils/dom'

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    // Large animated blurred layers are expensive on mobile GPUs.
    if (window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return

    const a = el.querySelector('[data-layer="a"]')
    const b = el.querySelector('[data-layer="b"]')
    const c = el.querySelector('[data-layer="c"]')

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(a, { duration: 12, xPercent: 8, yPercent: -6, ease: 'sine.inOut' }, 0)
      .to(b, { duration: 16, xPercent: -10, yPercent: 7, ease: 'sine.inOut' }, 0)
      .to(c, { duration: 18, xPercent: 6, yPercent: 10, ease: 'sine.inOut' }, 0)

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(var(--glow)/0.22),transparent_50%),radial-gradient(circle_at_80%_35%,rgb(var(--accent2)/0.20),transparent_55%),radial-gradient(circle_at_40%_85%,rgb(var(--accent)/0.18),transparent_60%)]" />

      {/* Moving gradient veils */}
      <div
        data-layer="a"
        className="absolute -inset-24 opacity-70 blur-3xl"
        style={{
          background:
            'conic-gradient(from 220deg at 50% 50%, rgb(var(--accent)/0.18), rgb(var(--glow)/0.10), rgb(var(--accent2)/0.16), transparent)',
        }}
      />
      <div
        data-layer="b"
        className="absolute -inset-28 opacity-55 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 35% 45%, rgb(var(--glow)/0.22), transparent 60%)',
        }}
      />
      <div
        data-layer="c"
        className="absolute -inset-28 opacity-45 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 70% 60%, rgb(var(--accent2)/0.22), transparent 62%)',
        }}
      />

      {/* Architectural grid lines */}
      <div className="absolute inset-0 opacity-[0.16] [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--text)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--text)/0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      {/* Grain */}
      <div className="grain" />
    </div>
  )
}

