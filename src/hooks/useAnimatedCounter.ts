import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/dom'

gsap.registerPlugin(ScrollTrigger)

export function useAnimatedCounter(
  end: number,
  suffix = '',
  duration = 2,
) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (ref.current) ref.current.textContent = `${end}${suffix}`
      return
    }
    const el = ref.current
    if (!el) return

    const obj = { val: 0 }
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.val)}${suffix}`
        },
      })
    })

    return () => ctx.revert()
  }, [end, suffix, duration])

  return ref
}
