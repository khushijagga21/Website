import { useRef } from 'react'
import { SplitText, useSplitReveal } from '../components/ui/SplitText'
import { SectionLabel } from '../components/ui/SectionLabel'

export function Projects() {
  const ref = useRef<HTMLElement | null>(null)
  useSplitReveal(ref)

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80svh] flex-col items-center justify-center px-6 py-32 text-center md:py-40"
    >
      <div data-hero-extra>
        <SectionLabel>PROJECTS</SectionLabel>
      </div>

      <h1 className="mt-6 font-[var(--font-display)] text-[clamp(2rem,5.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.01em]">
        <SplitText text="Coming Soon" word />
      </h1>

      <div
        data-hero-extra
        className="mt-8 h-px w-24 bg-[linear-gradient(90deg,transparent,rgb(var(--accent)),transparent)]"
      />

      <p
        data-hero-extra
        className="mt-8 max-w-md text-base font-light leading-[1.85] text-[rgb(var(--muted))] md:text-lg"
      >
        Our portfolio is being curated. Check back soon to explore the spaces we&apos;ve shaped
        with purpose and craft.
      </p>
    </section>
  )
}
