import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { clamp, prefersReducedMotion } from '../utils/dom'

type TiltOpts = {
  max?: number
  scale?: number
  glare?: boolean
}

export function useTilt3D<T extends HTMLElement>(opts: TiltOpts = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const max = opts.max ?? 10
    const scale = opts.scale ?? 1.02

    const glare = el.querySelector<HTMLElement>('[data-glare]')

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      const rx = clamp((0.5 - py) * max * 2, -max, max)
      const ry = clamp((px - 0.5) * max * 2, -max, max)

      gsap.to(el, {
        rotateX: rx,
        rotateY: ry,
        scale,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center',
      })

      if (glare) {
        gsap.to(glare, {
          opacity: 0.9,
          duration: 0.4,
          ease: 'power2.out',
          background: `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgb(255 255 255 / 0.28), transparent 55%)`,
        })
      }
    }

    const onLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      })
      if (glare) gsap.to(glare, { opacity: 0, duration: 0.5 })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [opts.max, opts.scale])

  return ref
}
