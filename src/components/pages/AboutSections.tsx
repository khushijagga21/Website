import type { IconType } from 'react-icons'
import { FiSun, FiFeather, FiMoon, FiCompass, FiGrid, FiShield } from 'react-icons/fi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { FounderSection } from './FounderSection'

const PRINCIPLES: {
  title: string
  description: string
  icon: IconType
  tint: string
}[] = [
  {
    title: 'Climate Responsive',
    description:
      'Designing buildings that work with the local climate to improve comfort and reduce energy demand.',
    icon: FiSun,
    tint: 'var(--gold)',
  },
  {
    title: 'Sustainable Thinking',
    description:
      'Thoughtful design and material choices that minimize environmental impact wherever possible.',
    icon: FiFeather,
    tint: 'var(--sage)',
  },
  {
    title: 'Timeless Design',
    description:
      'Creating spaces that remain relevant and beautiful for years to come, beyond trends.',
    icon: FiMoon,
    tint: 'var(--steel)',
  },
  {
    title: 'Cost-Conscious Planning',
    description:
      'Delivering efficient design solutions that maximize value without compromising quality.',
    icon: FiCompass,
    tint: 'var(--terracotta)',
  },
  {
    title: 'Functional Living',
    description: 'Planning spaces that are intuitive, flexible and tailored to everyday life.',
    icon: FiGrid,
    tint: 'var(--accent2)',
  },
  {
    title: 'Built to Last',
    description:
      'Focusing on durable materials, quality detailing and long-term performance to stand the test of time.',
    icon: FiShield,
    tint: 'var(--accent)',
  },
]

export function StudioStory() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'fade-up' })

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 pb-8 md:pb-12">
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
              ARQO Design Collective is an architecture studio creating sustainable,
              climate-responsive spaces that are functional, refined and meaningful.
            </p>
            <p className="text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--muted))]">
              We believe every project should respect its surroundings while improving the way
              people live, work and experience space.
            </p>
            <p className="text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--text))]">
              Every project is unique, and so is our approach.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ArqoMeaning() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'fade-up' })

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <div className="section-divider mb-12 md:mb-14" />

      <div data-reveal className="mb-10 max-w-2xl md:mb-12">
        <p className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">THE NAME</p>
        <h2 className="mt-3 font-[var(--font-display)] text-[clamp(1.6rem,3.2vw,2.35rem)] font-normal tracking-[-0.01em]">
          What Does ARQO Mean?
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <article
          data-reveal
          className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-7 backdrop-blur-xl md:p-9"
          style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 24px 60px rgb(var(--shadow))' }}
        >
          <p className="font-[var(--font-display)] text-4xl font-normal tracking-[-0.02em] text-[rgb(var(--accent))] md:text-5xl">
            ARQ
          </p>
          <p className="mt-4 text-[11px] tracking-[0.28em] text-[rgb(var(--muted))]">ARCHITECTURE</p>
          <p className="mt-3 text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--muted))]">
            ARQ Represents Architecture—the art and science of creating meaningful spaces.
          </p>
        </article>

        <article
          data-reveal
          className="rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-7 backdrop-blur-xl md:p-9"
          style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 24px 60px rgb(var(--shadow))' }}
        >
          <p className="font-[var(--font-display)] text-4xl font-normal tracking-[-0.02em] text-[rgb(var(--glow))] md:text-5xl">
            O
          </p>
          <p className="mt-4 text-[11px] tracking-[0.28em] text-[rgb(var(--muted))]">EARTH</p>
          <p className="mt-3 text-[var(--text-body-lg)] font-normal leading-[1.85] text-[rgb(var(--muted))]">
            O Represents Earth. It symbolizes sustainability, low-carbon design, environmental
            responsibility and the idea that every project should contribute positively to the
            planet.
          </p>
        </article>
      </div>

      <p
        data-reveal
        className="mt-8 max-w-3xl font-[var(--font-display)] text-lg font-normal italic leading-[1.6] text-[rgb(var(--text))] md:mt-10 md:text-xl"
      >
        Together, ARQO reflects architecture designed with the Earth at its core.
      </p>
    </section>
  )
}

export function DesignPrinciples() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'blur-up' })

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="section-divider mb-14" />

      <div data-reveal className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
        <h2 className="font-[var(--font-display)] text-[clamp(1.7rem,3.4vw,2.5rem)] font-normal tracking-[-0.01em]">
          Our Design Principles
        </h2>
        <p className="mt-4 text-[15px] leading-[1.75] text-[rgb(var(--muted))]">
          Guiding principles that shape our decisions and ensure every project delivers long-term
          value.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
        {PRINCIPLES.map((item) => {
          const Icon = item.icon
          return (
            <article key={item.title} data-reveal className="group text-center">
              <div className="mb-5 flex justify-center">
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgb(var(--border))] text-2xl backdrop-blur-xl transition-transform duration-500 group-hover:-translate-y-1"
                  style={{
                    color: `rgb(${item.tint})`,
                    background: `linear-gradient(145deg, rgb(${item.tint} / 0.1), rgb(var(--glass)))`,
                    boxShadow: '0 0 0 1px rgb(var(--border)), 0 16px 40px rgb(var(--shadow))',
                  }}
                >
                  <Icon />
                </span>
              </div>
              <h3 className="text-[11px] tracking-[0.28em] text-[rgb(var(--text))]">
                {item.title.toUpperCase()}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-[1.8] text-[rgb(var(--muted))]">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

/** Full About body — same on Home scroll and /about page */
export function AboutSections() {
  return (
    <div data-nav-section="about">
      <StudioStory />
      <ArqoMeaning />
      <FounderSection />
      <DesignPrinciples />
    </div>
  )
}
