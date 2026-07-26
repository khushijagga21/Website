import { useScrollReveal } from '../../hooks/useScrollReveal'
import founderPhoto from '../../assets/founder.jpg'

export const FOUNDER = {
  name: 'Khushank Kathuria',
  title: 'Architect & Founder',
  description:
    'I am Khushank Kathuria, Architect and founder of ARQO Design Collective. My role extends beyond designing spaces—I become a partner throughout the entire journey. By staying actively involved in every decision, coordinating design with construction, and maintaining clear communication, I help transform ideas into well-executed spaces with confidence and clarity.',
}

export function FounderSection() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12, variant: 'fade-up' })

  return (
    <section
      ref={ref}
      className="mx-auto flex min-h-[80svh] max-w-6xl flex-col justify-center px-6 py-20 md:py-28"
    >
      <div className="section-divider mb-14" />

      <p data-reveal className="mb-10 text-[11px] tracking-[0.32em] text-[rgb(var(--muted))] md:mb-12">
        THE FOUNDER
      </p>

      {/* Shae-inspired: photo left, name/title right */}
      <div data-reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:gap-10 md:gap-16">
        <div
          className="relative aspect-[3/4] w-full max-w-[220px] shrink-0 overflow-hidden sm:max-w-[250px] md:max-w-[290px]"
          style={{
            // Top-left / bottom-left / bottom-right rounded; top-right sharp
            borderRadius: '120px 8px 120px 120px',
            boxShadow: '0 0 0 1px rgb(var(--border)), 0 32px 80px rgb(var(--shadow))',
          }}
        >
          <img
            src={founderPhoto}
            alt={FOUNDER.name}
            className="h-full w-full object-cover object-[center_22%]"
          />
        </div>

        <div className="max-w-md pb-1 sm:pb-8 md:pb-14">
          <h2 className="font-[var(--font-display)] text-[clamp(1.9rem,4.5vw,3rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[rgb(var(--text))]">
            {FOUNDER.name.toUpperCase()},
          </h2>
          <p className="mt-3 text-[12px] tracking-[0.32em] text-[rgb(var(--muted))] md:mt-4 md:text-[13px]">
            {FOUNDER.title.toUpperCase()}
          </p>
        </div>
      </div>

      <p
        data-reveal
        className="mt-10 max-w-3xl text-[15px] font-normal leading-[1.9] text-[rgb(var(--muted))] md:mt-12 md:text-lg md:leading-[1.85]"
      >
        {FOUNDER.description}
      </p>
    </section>
  )
}
