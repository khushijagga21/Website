import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ArchitectScene } from '../../three/ArchitectScene'
import { useScrollReveal } from '../../../hooks/useScrollReveal'

export function HomeShowcase() {
  const ref = useScrollReveal<HTMLElement>({ stagger: 0.12, variant: 'blur-up' })

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-6 py-24 md:py-36">
      <div className="section-divider mb-20" />

      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div data-reveal className="text-[11px] tracking-[0.38em] text-[rgb(var(--muted))]">
            SIGNATURE FORM
          </div>
          <h2
            data-reveal
            className="mt-4 font-[var(--font-display)] text-[clamp(1.75rem,3.6vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.01em]"
          >
            Sculpted in
            <br />
            <span className="italic text-[rgb(var(--accent))]">three dimensions.</span>
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-md text-[var(--text-body)] font-normal leading-[1.8] text-[rgb(var(--muted))]"
          >
            Move your cursor across the model. Every ARQO structure begins as a
            living form—studied in light, mass, and shadow before it ever meets a
            site.
          </p>
          <div data-reveal className="mt-8 flex gap-8">
            {[
              { k: 'Massing', v: 'Studied' },
              { k: 'Light', v: 'Cinematic' },
              { k: 'Detail', v: 'Obsessive' },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-[10px] tracking-[0.3em] text-[rgb(var(--muted))]">
                  {s.k.toUpperCase()}
                </div>
                <div className="mt-1 font-[var(--font-display)] text-base font-normal">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            data-reveal
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] backdrop-blur-xl"
            style={{
              boxShadow: '0 0 0 1px rgb(var(--border)), 0 48px 120px rgb(var(--shadow))',
            }}
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--glow)/0.16),transparent_55%)]" />

            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-[11px] tracking-[0.3em] text-[rgb(var(--muted))]">
                  LOADING MODEL…
                </div>
              }
            >
              <Canvas
                dpr={[1, 1.8]}
                camera={{ position: [2.6, 2.1, 3.35], fov: 45 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <ArchitectScene />
              </Canvas>
            </Suspense>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-4">
              <span className="text-[10px] tracking-[0.28em] text-[rgb(var(--muted))]">
                INTERACTIVE 3D
              </span>
              <span className="text-[10px] tracking-[0.28em] text-[rgb(var(--muted))]">
                MOVE CURSOR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
