import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../../utils/dom'

gsap.registerPlugin(ScrollTrigger)

type ScrollHighlightTextProps = {
  text: string
  className?: string
}

export function ScrollHighlightText({ text, className = '' }: ScrollHighlightTextProps) {
  const ref = useRef<HTMLParagraphElement | null>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    const words = text.split(' ')
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="inline-block mr-[0.28em] text-[rgb(var(--text)/0.18)] transition-colors duration-150" data-word>${w}</span>`,
      )
      .join('')

    const spans = el.querySelectorAll('[data-word]')

    const ctx = gsap.context(() => {
      gsap.to(spans, {
        color: 'rgb(var(--text))',
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'top 25%',
          scrub: 0.6,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [text])

  return (
    <p
      ref={ref}
      className={`font-[var(--font-display)] text-[clamp(1.375rem,3.2vw,2.125rem)] font-normal leading-[1.4] tracking-[-0.01em] ${className}`}
    >
      {text}
    </p>
  )
}
