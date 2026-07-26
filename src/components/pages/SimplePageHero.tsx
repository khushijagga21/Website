import { useRef } from 'react'
import { SplitText, useSplitReveal } from '../ui/SplitText'
import { SectionLabel } from '../ui/SectionLabel'

type SimplePageHeroProps = {
  label: string
  title?: string
  description: string
}

export function SimplePageHero({ label, title, description }: SimplePageHeroProps) {
  const ref = useRef<HTMLElement | null>(null)
  useSplitReveal(ref)

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <div data-hero-extra>
        <SectionLabel>{label}</SectionLabel>
      </div>

      {title ? (
        <h1 className="mt-6 font-[var(--font-display)] text-[var(--text-h1)] font-normal leading-[1.08] tracking-[-0.01em]">
          <SplitText text={title} word />
        </h1>
      ) : null}

      <div
        data-hero-extra
        className={`${title ? 'mt-6' : 'mt-5'} h-px max-w-xs origin-left bg-[linear-gradient(90deg,rgb(var(--accent)),rgb(var(--glow)),transparent)]`}
      />

      <p
        data-hero-extra
        className="mt-8 max-w-2xl text-[var(--text-body-lg)] font-normal leading-[1.75] text-[rgb(var(--muted))]"
      >
        {description}
      </p>
    </section>
  )
}
