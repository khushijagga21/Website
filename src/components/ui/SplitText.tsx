import { useLayoutEffect, useMemo } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../utils/dom'

type SplitTextProps = {
  text: string
  className?: string
  as?: 'span' | 'div'
  word?: boolean
}

export function SplitText({
  text,
  className = '',
  as: Tag = 'span',
  word = false,
}: SplitTextProps) {
  const parts = useMemo(
    () => (word ? text.split(' ') : text.split('')),
    [text, word],
  )

  return (
    <Tag className={className} aria-label={text}>
      {parts.map((part, i) => (
        <span
          key={`${part}-${i}`}
          className="inline-block will-change-transform"
          data-split={word ? 'word' : 'letter'}
        >
          {word ? part : part === ' ' ? '\u00A0' : part}
          {word && i < parts.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function useSplitReveal(
  containerRef: React.RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = containerRef.current
    if (!el) return

    const splits = el.querySelectorAll('[data-split]')
    const extras = el.querySelectorAll('[data-hero-extra]')

    gsap.set(splits, { y: 50, rotateX: 55, opacity: 0 })
    gsap.set(extras, { y: 24, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.1 })
    tl.to(splits, {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1.05,
      ease: 'power3.out',
      stagger: 0.018,
    }).to(
      extras,
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
      0.4,
    )

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export function useLineDraw(ref: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return

    gsap.fromTo(
      el,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.6 },
    )
  }, [ref])
}
