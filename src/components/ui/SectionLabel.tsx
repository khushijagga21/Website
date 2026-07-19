type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.38em] text-[rgb(var(--muted))] ${className}`}
    >
      <span className="h-px w-8 bg-[linear-gradient(90deg,rgb(var(--accent)),transparent)]" />
      {children}
    </div>
  )
}
