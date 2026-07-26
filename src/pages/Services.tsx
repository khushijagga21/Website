import { useScrollReveal } from '../hooks/useScrollReveal'
import { SERVICES } from '../config/services'

export function Services() {
  const heroRef = useScrollReveal<HTMLElement>({ stagger: 0.08, variant: 'fade-up' })
  const gridRef = useScrollReveal<HTMLElement>({ stagger: 0.08, variant: 'fade-up' })

  return (
    <>
      <section ref={heroRef} className="mx-auto max-w-6xl px-6 pb-10 pt-28 md:pb-14 md:pt-32">
        <p data-reveal className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">
          WHAT WE DO
        </p>
        <h1
          data-reveal
          className="mt-4 font-[var(--font-display)] text-[clamp(2.2rem,5vw,3.5rem)] font-normal tracking-[-0.02em]"
        >
          Our Services
        </h1>
        <div
          data-reveal
          className="mt-5 h-px w-16 bg-[linear-gradient(90deg,rgb(var(--accent)),transparent)]"
        />
      </section>

      <section ref={gridRef} className="mx-auto max-w-7xl px-6 pb-28 md:pb-36">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.num}
                data-reveal
                className="group relative overflow-hidden rounded-[26px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-8 backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1.5 md:p-10"
                style={{
                  boxShadow: '0 0 0 1px rgb(var(--border)), 0 28px 70px rgb(var(--shadow))',
                }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, rgb(${service.tint} / 0.4), transparent 70%)`,
                  }}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span className="font-[var(--font-display)] text-4xl font-normal text-[rgb(var(--text)/0.1)]">
                    {service.num}
                  </span>
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[rgb(var(--border))] text-xl"
                    style={{
                      color: `rgb(${service.tint})`,
                      background: `rgb(${service.tint} / 0.1)`,
                    }}
                  >
                    <Icon />
                  </span>
                </div>

                <h2 className="relative mt-5 font-[var(--font-display)] text-xl font-normal md:text-2xl">
                  {service.title}
                </h2>
                <p className="relative mt-3 text-sm font-light leading-[1.75] text-[rgb(var(--muted))]">
                  {service.description}
                </p>

                <div
                  className="relative mt-6 h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16"
                  style={{
                    background: `rgb(${service.tint})`,
                    boxShadow: `0 0 14px rgb(${service.tint} / 0.6)`,
                  }}
                />
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
