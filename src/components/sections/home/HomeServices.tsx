import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useTilt3D } from '../../../hooks/useTilt3D'
import { SERVICES } from '../../../config/services'

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const tiltRef = useTilt3D<HTMLDivElement>({ max: 12, scale: 1.04 })
  const Icon = service.icon

  return (
    <div data-reveal style={{ perspective: '1000px' }}>
      <div
        ref={tiltRef}
        className="group relative h-full overflow-hidden rounded-[26px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-8 backdrop-blur-xl md:p-10"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 0 1px rgb(var(--border)), 0 28px 70px rgb(var(--shadow))',
        }}
      >
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, rgb(${service.tint} / 0.4), transparent 70%)` }}
        />

        <div className="flex items-start justify-between gap-3" style={{ transform: 'translateZ(40px)' }}>
          <span className="font-[var(--font-display)] text-4xl font-normal text-[rgb(var(--text)/0.1)]">
            {service.num}
          </span>
          <span
            className="grid h-10 w-10 place-items-center rounded-xl border border-[rgb(var(--border))] text-lg"
            style={{
              color: `rgb(${service.tint})`,
              background: `rgb(${service.tint} / 0.1)`,
            }}
          >
            <Icon />
          </span>
        </div>

        <h3
          className="mt-5 font-[var(--font-display)] text-xl font-normal md:text-2xl"
          style={{ transform: 'translateZ(30px)' }}
        >
          {service.title}
        </h3>
        <p
          className="mt-3 text-sm font-light leading-[1.75] text-[rgb(var(--muted))]"
          style={{ transform: 'translateZ(20px)' }}
        >
          {service.description}
        </p>

        <div
          className="mt-6 h-1 w-10 rounded-full"
          style={{
            background: `rgb(${service.tint})`,
            boxShadow: `0 0 14px rgb(${service.tint} / 0.6)`,
            transform: 'translateZ(50px)',
          }}
        />
      </div>
    </div>
  )
}

export function HomeServices() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1, variant: 'scale' })

  return (
    <section ref={ref} data-nav-section="services" className="mx-auto max-w-7xl px-6 py-24 md:py-36">
      <div className="section-divider mb-20" />

      <div data-reveal className="mb-16">
        <div className="text-[11px] tracking-[0.38em] text-[rgb(var(--muted))]">WHAT WE DO</div>
        <h2 className="mt-4 font-[var(--font-display)] text-[var(--text-h2)] font-normal tracking-[-0.01em]">
          Our Services
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <ServiceCard key={s.num} service={s} />
        ))}
      </div>

      <div data-reveal className="mt-14 text-center">
        <Link
          to="/services"
          data-cursor="hover"
          className="group inline-flex items-center gap-2 text-sm tracking-[0.18em] text-[rgb(var(--muted))] transition-colors duration-300 hover:text-[rgb(var(--text))]"
        >
          VIEW ALL SERVICES
          <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}
