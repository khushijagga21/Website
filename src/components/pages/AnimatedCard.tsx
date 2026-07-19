type AnimatedCardProps = {
  title: string
  description: string
  tag?: string
}

export function AnimatedCard({ title, description, tag }: AnimatedCardProps) {
  return (
    <article
      data-reveal
      className="group relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--glass))] p-6 backdrop-blur-xl transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1.5 md:p-8"
      style={{
        boxShadow: '0 0 0 1px rgb(var(--border)), 0 24px 60px rgb(var(--shadow))',
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-16 bg-[radial-gradient(circle_at_30%_30%,rgb(var(--glow)/0.25),transparent_60%)]" />
      </div>

      <div className="relative">
        {tag && (
          <span className="text-[10px] tracking-[0.3em] text-[rgb(var(--muted))]">
            {tag.toUpperCase()}
          </span>
        )}
        <h3 className="mt-2 font-[var(--font-display)] text-xl font-normal tracking-[-0.01em] md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 text-sm font-light leading-[1.75] text-[rgb(var(--muted))] md:text-base">
          {description}
        </p>
        <div className="mt-5 h-px w-0 bg-[linear-gradient(90deg,rgb(var(--accent)),transparent)] transition-all duration-500 group-hover:w-full" />
      </div>
    </article>
  )
}
