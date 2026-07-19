import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { SimplePageHero } from '../components/pages/SimplePageHero'
import { AnimatedCard } from '../components/pages/AnimatedCard'
import { PhilosophyContent } from '../components/pages/PhilosophyContent'
import { useMagnetic } from '../hooks/useMagnetic'

const VALUES = [
  {
    tag: 'Vision',
    title: 'Purposeful Design',
    description:
      'Every project begins with understanding how space should feel—then we shape form around that emotion.',
  },
  {
    tag: 'Craft',
    title: 'Material Honesty',
    description:
      'We select materials that age beautifully, balancing warmth, texture, and architectural precision.',
  },
  {
    tag: 'Detail',
    title: 'Quiet Luxury',
    description:
      'Refinement lives in the details—light, proportion, and junctions crafted with obsessive care.',
  },
]

export function About() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.12 })
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18, scale: 1.03 })

  return (
    <>
      <SimplePageHero
        label="ABOUT ARQO"
        title="Who We Are"
        description="A premium architecture studio shaping modern spaces with luxury, minimalism, and innovation."
      />

      <PhilosophyContent />

      <section ref={sectionRef} className="mx-auto max-w-6xl px-6 pb-32">
        <div className="section-divider mb-16" />

        <div className="grid gap-4 md:grid-cols-3">
          {VALUES.map((item) => (
            <AnimatedCard key={item.title} {...item} />
          ))}
        </div>

        <div data-reveal className="mt-20 text-center">
          <Link
            ref={ctaRef}
            to="/services"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,rgb(var(--accent)),rgb(var(--glow)))] px-8 py-3.5 text-sm tracking-[0.18em] text-[rgb(var(--bg))]"
            style={{ boxShadow: '0 18px 50px rgb(var(--shadow))' }}
          >
            <span className="relative z-10">View Our Services</span>
            <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.20),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
          </Link>
        </div>
      </section>
    </>
  )
}
