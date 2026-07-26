import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMagnetic } from '../hooks/useMagnetic'
import { SimplePageHero } from '../components/pages/SimplePageHero'
import { PhilosophyContent } from '../components/pages/PhilosophyContent'
import { ScrollHighlightText } from '../components/ui/ScrollHighlightText'

const VALUES = [
  {
    num: '01',
    tag: 'Vision',
    title: 'Purposeful Design',
    description:
      'Every project begins with understanding how space should feel—then we shape form around that emotion, climate, and context.',
    tint: 'var(--terracotta)',
  },
  {
    num: '02',
    tag: 'Craft',
    title: 'Material Honesty',
    description:
      'We select materials that age beautifully—balancing warmth, texture, and architectural precision that lasts for decades.',
    tint: 'var(--sage)',
  },
  {
    num: '03',
    tag: 'Detail',
    title: 'Quiet Luxury',
    description:
      'Refinement lives in the junctions—light, proportion, and finish crafted with obsessive care, never loud, always lasting.',
    tint: 'var(--steel)',
  },
]

const FOCUS = [
  { title: 'Residential', desc: 'Homes shaped around lifestyle and landscape' },
  { title: 'Hospitality', desc: 'Spaces that feel calm, curated, and memorable' },
  { title: 'Commercial', desc: 'Workspaces with clarity, identity, and flow' },
  { title: 'Interiors', desc: 'Material, furniture, and light as one system' },
]

export function About() {
  const storyRef = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'fade-up' })
  const valuesRef = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'blur-up' })
  const focusRef = useScrollReveal<HTMLElement>({ stagger: 0.08, variant: 'fade-up' })
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18, scale: 1.03 })

  return (
    <>
      <SimplePageHero
        label="ABOUT ARQO"
        title="Who We Are"
        description="ARQO Design Collective is a premium architecture studio shaping modern spaces with intention—where climate, craft, and human experience meet."
      />

      {/* Studio story */}
      <section ref={storyRef} className="mx-auto max-w-6xl px-6 pb-8 md:pb-12">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[32px] border border-[rgb(var(--border))] px-7 py-10 backdrop-blur-xl md:px-12 md:py-14"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--glass)), rgb(var(--surface2)/0.55))',
            boxShadow: '0 0 0 1px rgb(var(--border)), 0 36px 90px rgb(var(--shadow))',
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.14),transparent_65%)] blur-3xl" />
            <div className="absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.10),transparent_65%)] blur-3xl" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">THE STUDIO</p>
              <h2 className="mt-3 font-[var(--font-display)] text-[clamp(1.6rem,3.2vw,2.35rem)] font-normal leading-[1.15] tracking-[-0.01em]">
                Architecture that
                <br />
                <span className="italic text-[rgb(var(--accent))]">listens first.</span>
              </h2>
            </div>

            <div className="space-y-5 lg:col-span-7">
              <p className="text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--muted))]">
                Founded on the belief that great design should solve problems—not create them—ARQO
                works across residences, hospitality, and commercial environments with a calm,
                precise approach.
              </p>
              <p className="text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--muted))]">
                From Hisar and Zirakpur to projects further afield, we design spaces that feel
                inevitable: rooted in place, efficient in performance, and refined in every
                detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PhilosophyContent />

      {/* Values */}
      <section ref={valuesRef} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="section-divider mb-14" />

        <div data-reveal className="mb-12 max-w-2xl">
          <p className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">WHAT GUIDES US</p>
          <h2 className="mt-3 font-[var(--font-display)] text-[clamp(1.6rem,3.2vw,2.35rem)] font-normal tracking-[-0.01em]">
            Three values. One standard.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="group relative overflow-hidden rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 md:p-8"
              style={{
                boxShadow: '0 0 0 1px rgb(var(--border)), 0 24px 60px rgb(var(--shadow))',
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, rgb(${item.tint} / 0.28), transparent 70%)`,
                  }}
                />
              </div>

              <span className="font-[var(--font-display)] text-4xl font-normal text-[rgb(var(--text)/0.12)]">
                {item.num}
              </span>
              <p className="mt-4 text-[11px] tracking-[0.28em] text-[rgb(var(--muted))]">
                {item.tag.toUpperCase()}
              </p>
              <h3 className="mt-2 font-[var(--font-display)] text-xl font-normal tracking-[-0.01em] md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm font-normal leading-[1.8] text-[rgb(var(--muted))] md:text-[15px]">
                {item.description}
              </p>
              <div
                className="mt-6 h-px w-10 transition-all duration-500 group-hover:w-full"
                style={{
                  background: `linear-gradient(90deg, rgb(${item.tint}), transparent)`,
                }}
              />
            </article>
          ))}
        </div>
      </section>

      {/* Focus areas */}
      <section ref={focusRef} className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div
          data-reveal
          className="rounded-[32px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-8 backdrop-blur-xl md:p-12"
          style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 32px 80px rgb(var(--shadow))' }}
        >
          <p className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">OUR FOCUS</p>
          <h2 className="mt-3 max-w-xl font-[var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)] font-normal tracking-[-0.01em]">
            Spaces we love to shape
          </h2>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--border))] sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="bg-[rgb(var(--bg))] p-6 transition-colors duration-300 hover:bg-[rgb(var(--glass))] md:p-7"
              >
                <h3 className="font-[var(--font-display)] text-lg font-normal tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-[rgb(var(--muted))]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement + CTA */}
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
