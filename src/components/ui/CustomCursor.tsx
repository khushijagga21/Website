import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../utils/dom'

const INTERACTIVE =
  'a,button,[role="button"],input,textarea,select,[data-cursor="hover"]'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion()) return
    if (window.matchMedia?.('(hover: none) and (pointer: coarse)')?.matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const x = e.clientX
      const y = e.clientY
      ringX(x)
      ringY(y)
      dotX(x)
      dotY(y)
    }

    const setHover = (hovered: boolean) => {
      gsap.to(ring, {
        duration: hovered ? 0.2 : 0.35,
        ease: 'power3.out',
        scale: hovered ? 1.55 : 1,
        opacity: hovered ? 0.9 : 0.75,
      })
      gsap.to(dot, {
        duration: hovered ? 0.2 : 0.35,
        ease: 'power3.out',
        scale: hovered ? 0.45 : 1,
        opacity: hovered ? 0.4 : 0.9,
      })
    }

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (t.closest(INTERACTIVE)) setHover(true)
    }
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      if (t.closest(INTERACTIVE)) setHover(false)
    }

    const onDown = () => {
      gsap.to(ring, { duration: 0.16, scale: 0.92, ease: 'power3.out' })
      gsap.to(dot, { duration: 0.16, scale: 0.75, ease: 'power3.out' })
    }
    const onUp = () => {
      gsap.to(ring, { duration: 0.25, scale: 1, ease: 'power3.out' })
      gsap.to(dot, { duration: 0.25, scale: 1, ease: 'power3.out' })
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('mouseover', onOver, true)
    document.addEventListener('mouseout', onOut, true)

    // Keep cursor inside viewport if alt-tab/re-enter.
    const onLeave = () => {
      gsap.to([ring, dot], { duration: 0.25, opacity: 0, ease: 'power2.out' })
    }
    const onEnter = () => {
      gsap.to([ring, dot], {
        duration: 0.25,
        opacity: 1,
        ease: 'power2.out',
      })
    }
    window.addEventListener('blur', onLeave)
    window.addEventListener('focus', onEnter)

    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('mouseover', onOver, true)
      document.removeEventListener('mouseout', onOut, true)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('focus', onEnter)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgb(var(--text)/0.24)] bg-[rgb(var(--glass))] opacity-75 backdrop-blur-xl mix-blend-difference md:block"
        style={{
          boxShadow:
            '0 0 0 1px rgb(var(--border)), 0 18px 40px rgb(var(--shadow))',
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgb(var(--text))] opacity-90 mix-blend-difference md:block"
      />
    </>
  )
}

