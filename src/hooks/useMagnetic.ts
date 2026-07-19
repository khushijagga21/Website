import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { clamp, prefersReducedMotion } from '../utils/dom'

type Opts = {
  strength?: number
  scale?: number
}

export function useMagnetic<T extends HTMLElement>(opts: Opts = {}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return

    const strength = opts.strength ?? 0.25
    const scale = opts.scale ?? 1.02

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      const nx = clamp(dx / (r.width / 2), -1, 1)
      const ny = clamp(dy / (r.height / 2), -1, 1)

      gsap.to(el, {
        duration: 0.6,
        ease: 'power3.out',
        x: nx * r.width * strength,
        y: ny * r.height * strength,
        scale,
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        duration: 0.8,
        ease: 'power3.out',
        x: 0,
        y: 0,
        scale: 1,
      })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [opts.scale, opts.strength])

  return ref
}

