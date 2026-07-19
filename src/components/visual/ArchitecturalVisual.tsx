import { useParallax } from '../../hooks/useScrollReveal'

export function ArchitecturalVisual({ className = '' }: { className?: string }) {
  const parallaxRef = useParallax<HTMLDivElement>(0.12)

  return (
    <div
      ref={parallaxRef}
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-[rgb(var(--border))] ${className}`}
      style={{
        boxShadow:
          '0 0 0 1px rgb(var(--border)), 0 40px 100px rgb(var(--shadow))',
      }}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgb(var(--surface2)),rgb(var(--bg2)))]" />

      {/* Architectural grid */}
      <div className="absolute inset-0 opacity-[0.22]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgb(var(--text)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--text)/0.06)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Geometric composition */}
      <div className="absolute inset-0 flex items-end justify-center p-8">
        <div className="relative h-[72%] w-[78%]">
          {/* Main volume */}
          <div
            className="absolute bottom-0 left-[8%] h-[85%] w-[42%] rounded-t-sm border border-[rgb(var(--border))] bg-[rgb(var(--glass))] backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(180deg, rgb(var(--glass)), rgb(var(--surface2)/0.8))',
              boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.08)',
            }}
          >
            <div className="absolute inset-x-3 top-6 h-[55%] border border-[rgb(var(--accent)/0.25)] bg-[rgb(var(--accent)/0.06)]" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-[rgb(var(--terracotta)/0.35)]" />
          </div>

          {/* Secondary tower */}
          <div
            className="absolute bottom-0 right-[6%] h-[95%] w-[38%] rounded-t-sm border border-[rgb(var(--border))]"
            style={{
              background:
                'linear-gradient(180deg, rgb(var(--steel)/0.25), rgb(var(--charcoal)/0.15))',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-2 right-2 h-px bg-[rgb(var(--text)/0.12)]"
                style={{ top: `${12 + i * 10}%` }}
              />
            ))}
          </div>

          {/* Cantilever */}
          <div
            className="absolute left-[4%] top-[18%] h-2 w-[72%] rounded-full"
            style={{
              background:
                'linear-gradient(90deg, rgb(var(--gold)), rgb(var(--terracotta)/0.6))',
              boxShadow: '0 8px 32px rgb(var(--glow)/0.35)',
            }}
          />

          {/* Glow orb */}
          <div className="absolute -right-4 top-[12%] h-24 w-24 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.45),transparent_70%)] blur-2xl" />
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute left-6 top-6 text-[10px] tracking-[0.3em] text-[rgb(var(--muted))]">
        ARQO / 2024
      </div>
      <div className="grain" />
    </div>
  )
}

export function ArchitecturalPanel({ tall = false }: { tall?: boolean }) {
  const ref = useParallax<HTMLDivElement>(0.08)

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-[24px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] backdrop-blur-xl ${tall ? 'min-h-[420px]' : 'min-h-[280px]'}`}
      style={{
        boxShadow:
          '0 0 0 1px rgb(var(--border)), 0 32px 80px rgb(var(--shadow))',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(var(--glow)/0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgb(var(--accent2)/0.12),transparent_50%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <line x1="0" y1="220" x2="400" y2="220" stroke="rgb(var(--text))" strokeWidth="0.5" opacity="0.2" />
        <line x1="80" y1="0" x2="80" y2="300" stroke="rgb(var(--text))" strokeWidth="0.5" opacity="0.15" />
        <line x1="200" y1="0" x2="200" y2="300" stroke="rgb(var(--text))" strokeWidth="0.5" opacity="0.15" />
        <line x1="320" y1="0" x2="320" y2="300" stroke="rgb(var(--text))" strokeWidth="0.5" opacity="0.15" />
        <rect x="60" y="120" width="100" height="100" fill="none" stroke="rgb(var(--accent))" strokeWidth="1" opacity="0.4" />
        <rect x="180" y="80" width="80" height="140" fill="none" stroke="rgb(var(--glow))" strokeWidth="1" opacity="0.35" />
        <polygon points="280,200 360,200 320,140" fill="rgb(var(--accent2)/0.2)" stroke="rgb(var(--accent2))" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <div className="grain" />
    </div>
  )
}
