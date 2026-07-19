import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AnimatedCard } from '../components/pages/AnimatedCard'
import { useMagnetic } from '../hooks/useMagnetic'

const SERVICES = [
  {
    tag: 'Residential',
    title: 'Private Homes',
    description:
      'Bespoke residences designed around lifestyle, light, and landscape—with luxury finishes and timeless form.',
  },
  {
    tag: 'Commercial',
    title: 'Workspaces',
    description:
      'Offices and retail environments that elevate brand identity through spatial clarity and premium materials.',
  },
  {
    tag: 'Interior',
    title: 'Interior Architecture',
    description:
      'Holistic interior design—furniture, lighting, and material palettes crafted as one cohesive experience.',
  },
  {
    tag: 'Consulting',
    title: 'Design Consultation',
    description:
      'Expert guidance on feasibility, concept development, and design direction for your next project.',
  },
]

const STEPS = ['Discover', 'Design', 'Deliver']

export function Services() {
  const sectionRef = useScrollReveal<HTMLElement>({ stagger: 0.1 })
  const stepsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.12 })
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.18, scale: 1.03 })

  return (
    <>
      <section ref={sectionRef} className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
        <div className="section-divider mb-16" />
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <AnimatedCard key={service.title} {...service} />
          ))}
        </div>
      </section>

      <section ref={stepsRef} className="mx-auto max-w-6xl px-6 pb-32">
        <div
          className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-8 backdrop-blur-xl md:p-12"
          style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 32px 80px rgb(var(--shadow))' }}
        >
          <p data-reveal className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">
            HOW WE WORK
          </p>
          <h2
            data-reveal
            className="mt-4 font-[var(--font-display)] text-[var(--text-h2)] font-normal tracking-[-0.01em]"
          >
            Simple process. Exceptional results.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step} data-reveal>
                <span className="font-[var(--font-display)] text-4xl font-normal text-[rgb(var(--accent)/0.35)]">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-lg font-normal">{step}</h3>
                <div className="mt-4 h-px w-12 bg-[linear-gradient(90deg,rgb(var(--accent)),transparent)]" />
              </div>
            ))}
          </div>
        </div>

        <div data-reveal className="mt-16 text-center">
          <Link
            ref={ctaRef}
            to="/contact"
            data-cursor="hover"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-8 py-3.5 text-sm tracking-[0.18em] backdrop-blur-xl"
            style={{ boxShadow: '0 18px 50px rgb(var(--shadow))' }}
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(var(--accent)/0.15),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
          </Link>
        </div>
      </section>
    </>
  )
}
