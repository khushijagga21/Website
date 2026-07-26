import { Link } from 'react-router-dom'
import { useMagnetic } from '../hooks/useMagnetic'
import { SimplePageHero } from '../components/pages/SimplePageHero'
import { AboutSections } from '../components/pages/AboutSections'
import { ScrollHighlightText } from '../components/ui/ScrollHighlightText'

export function About() {
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18, scale: 1.03 })

  return (
    <>
      <SimplePageHero
        label="ABOUT ARQO"
        title="Who We Are"
        description="ARQO Design Collective is an architecture studio creating sustainable, climate-responsive spaces that are functional, refined and meaningful."
      />

      <AboutSections />

      <section className="mx-auto max-w-6xl px-6 pb-28 md:pb-36">
        <ScrollHighlightText text="We design for time, climate, and the people who will live inside the work." />

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            ref={ctaRef}
            to="/services"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,rgb(var(--accent)),rgb(var(--glow)))] px-8 py-3.5 text-sm tracking-[0.16em] text-[rgb(var(--bg))]"
            style={{ boxShadow: '0 18px 50px rgb(var(--shadow))' }}
          >
            <span className="relative z-10">View Our Services</span>
            <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.20),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
          </Link>
          <Link
            to="/contact"
            data-cursor="hover"
            className="text-sm tracking-[0.14em] text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--text))]"
          >
            Start a conversation →
          </Link>
        </div>
      </section>
    </>
  )
}
