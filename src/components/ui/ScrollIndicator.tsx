import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../utils/dom'

export function ScrollIndicator() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const dot = el.querySelector('[data-dot="true"]')
    const tl = gsap.timeline({ repeat: -1 })
    tl.fromTo(
      dot,
      { y: -6, opacity: 0.55 },
      { y: 10, opacity: 0.95, duration: 1.2, ease: 'power2.inOut' },
    ).to(dot, { y: -6, opacity: 0.55, duration: 0.9, ease: 'power2.inOut' })
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-4 py-2 backdrop-blur-xl">
        <div className="relative h-9 w-6 rounded-full border border-[rgb(var(--text)/0.18)]">
          <div
            data-dot="true"
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[rgb(var(--text))]"
          />
        </div>
        <div className="text-xs tracking-[0.22em] text-[rgb(var(--muted))]">
          SCROLL TO EXPLORE
        </div>
      </div>
    </div>
  )
}

