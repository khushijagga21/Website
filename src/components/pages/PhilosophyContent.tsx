import { useScrollReveal } from '../../hooks/useScrollReveal'
import { ScrollHighlightText } from '../ui/ScrollHighlightText'

const QUESTIONS = [
  'How does it respond to the climate?',
  'How much energy will it consume?',
  'How long will it last?',
  'Can it be built responsibly?',
  'Can beauty coexist with sustainability?',
]

export function PhilosophyContent() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.08 })

  return (
    <section ref={ref} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div data-reveal className="mb-8 text-[11px] tracking-[0.38em] text-[rgb(var(--muted))]">
        OUR PHILOSOPHY
      </div>

      <ScrollHighlightText text="At ARQO Design Collective, we believe architecture should solve problems—not create them." />

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
        <p
          data-reveal
          className="text-sm font-light leading-[1.85] text-[rgb(var(--muted))] md:text-base"
        >
          Every project is approached through a balance of climate, context, materiality and
          human experience to create spaces that are timeless, efficient and environmentally
          responsible.
        </p>
        <p
          data-reveal
          className="text-sm font-light leading-[1.85] text-[rgb(var(--muted))] md:text-base"
        >
          Whether it&apos;s a modern residence, boutique hospitality project or commercial
          space, our goal is to reduce environmental impact while enhancing the way people live.
        </p>
      </div>

      <div
        data-reveal
        className="mt-10 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-6 backdrop-blur-xl md:p-8"
        style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 20px 50px rgb(var(--shadow))' }}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-start md:gap-10">
          <div>
            <p className="text-sm font-light italic leading-[1.7] text-[rgb(var(--muted))] md:text-base">
              Instead of asking
            </p>
            <p className="mt-1 font-[var(--font-display)] text-lg font-normal leading-snug md:text-xl">
              &ldquo;How beautiful can a building look?&rdquo;
            </p>
            <p className="mt-4 text-[11px] tracking-[0.28em] text-[rgb(var(--accent))]">
              WE ASK
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {QUESTIONS.map((q) => (
              <li
                key={q}
                className="flex items-start gap-2 text-sm font-light leading-snug text-[rgb(var(--muted))]"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--accent))]" />
                {q}
              </li>
            ))}
          </ul>
        </div>

        <p
          data-reveal
          className="mt-6 border-t border-[rgb(var(--border))] pt-5 font-[var(--font-display)] text-base font-normal italic text-[rgb(var(--text))] md:text-lg"
        >
          That&apos;s where ARQO begins.
        </p>
      </div>
    </section>
  )
}
