import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../../hooks/useScrollReveal'
import { useMagnetic } from '../../../hooks/useMagnetic'
import { contactLinks } from '../../../config/contact'

export function HomeContact() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.1 })
  const ctaRef = useMagnetic<HTMLAnchorElement>({ strength: 0.2, scale: 1.04 })

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-28 pb-40 md:py-40 md:pb-52">
      <div className="section-divider mb-20" />

      <div
        data-reveal
        className="relative overflow-hidden rounded-[36px] border border-[rgb(var(--border))] px-8 py-20 text-center backdrop-blur-xl md:px-16 md:py-28"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--glass)), rgb(var(--surface2)/0.5))',
          boxShadow: '0 0 0 1px rgb(var(--border)), 0 48px 120px rgb(var(--shadow))',
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.16),transparent_65%)] blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--accent)/0.12),transparent_65%)] blur-3xl" />
        </div>

        <div className="relative">
          <p className="text-[10px] tracking-[0.35em] text-[rgb(var(--muted))] md:text-[11px]">
            GET IN TOUCH
          </p>
          <h2 className="mt-5 font-[var(--font-display)] text-[clamp(1.875rem,4vw,3rem)] font-normal leading-[1.12] tracking-[-0.01em]">
            Let&apos;s shape your
            <br />
            <span className="italic text-[rgb(var(--accent))]">next space.</span>
          </h2>

          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
            <a
              ref={ctaRef}
              href={contactLinks.whatsapp('Hello ARQO, I would like to discuss a project.')}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,rgb(var(--accent)),rgb(var(--glow)))] px-9 py-3.5 text-[13px] tracking-[0.16em] text-[rgb(var(--bg))] md:px-10 md:py-4 md:text-sm"
              style={{ boxShadow: '0 20px 60px rgb(var(--shadow))' }}
            >
              <span className="relative z-10">Start a Project</span>
              <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.22),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
            </a>
            <Link
              to="/contact"
              data-cursor="hover"
              className="text-[13px] tracking-[0.14em] text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--text))] md:text-sm"
            >
              All contact options →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
