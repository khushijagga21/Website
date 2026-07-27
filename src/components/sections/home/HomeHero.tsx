import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { BrandLogo } from '../../brand/BrandLogo'
import { useMagnetic } from '../../../hooks/useMagnetic'
import { prefersReducedMotion } from '../../../utils/dom'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
]

function HeroCallout({ label, to }: { label: string; to: string }) {
  const ref = useMagnetic<HTMLAnchorElement>({ strength: 0.28, scale: 1.04 })
  return (
    <Link
      ref={ref}
      to={to}
      data-hero-btn
      data-cursor="hover"
      className="group relative inline-flex items-center px-1 py-1 text-[10px] tracking-[0.24em] text-[rgb(var(--muted))] transition-colors duration-300 hover:text-[rgb(var(--text))] md:text-[11px]"
    >
      <span className="relative">
        {label.toUpperCase()}
        <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[rgb(var(--accent))] transition-all duration-500 group-hover:w-full" />
      </span>
    </Link>
  )
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const logoWrapRef = useRef<HTMLDivElement | null>(null)
  const nameRef = useRef<HTMLParagraphElement | null>(null)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(
        [logoWrapRef.current, nameRef.current, lineRef.current, scrollRef.current, '[data-hero-btn]'],
        { opacity: 1, y: 0, scaleX: 1, scale: 1 },
      )
      return
    }

    const buttons = el.querySelectorAll('[data-hero-btn]')

    // Animate wrapper (not the image) so logo stays crisp — no blur filters on the PNG
    gsap.set(logoWrapRef.current, {
      scale: 0.92,
      y: 18,
      opacity: 0,
    })
    gsap.set(nameRef.current, { opacity: 0, y: 14 })
    gsap.set(lineRef.current, { scaleX: 0, opacity: 0 })
    gsap.set(buttons, { y: 22, opacity: 0 })
    gsap.set(scrollRef.current, { opacity: 0, y: 10 })

    const tl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power3.out' } })
    tl.to(logoWrapRef.current, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 1.25,
      ease: 'power4.out',
    })
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.9 }, '-=0.7')
      .to(lineRef.current, { scaleX: 1, opacity: 1, duration: 1.1 }, '-=0.65')
      .to(buttons, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, '-=0.5')
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .add(() => {
        // Soft float on wrapper only (no 3D rotate on the bitmap)
        gsap.to(logoWrapRef.current, {
          y: -8,
          duration: 3.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

    // Very subtle parallax — X only so the float tween and edges stay clean
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      gsap.to(logoWrapRef.current, {
        x: nx * 5,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    window.addEventListener('pointermove', onMove)

    return () => {
      tl.kill()
      window.removeEventListener('pointermove', onMove)
      gsap.killTweensOf(logoWrapRef.current)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      data-nav-section="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgb(var(--glow)/0.16),transparent_55%),radial-gradient(circle_at_20%_80%,rgb(var(--accent2)/0.12),transparent_55%),radial-gradient(circle_at_80%_75%,rgb(var(--accent)/0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(circle_at_50%_42%,black,transparent_72%)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--text)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--text)/0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        </div>
      </div>

      <div
        ref={logoWrapRef}
        className="relative z-10 flex flex-col items-center"
      >
        <BrandLogo
          hero
          className="h-auto w-[min(78vw,520px)] object-contain"
        />
        <p
          ref={nameRef}
          className="mt-5 flex items-center gap-3 text-[11px] tracking-[0.36em] text-[rgb(var(--text))] md:mt-6 md:text-xs"
        >
          <span className="h-px w-8 bg-[rgb(var(--text)/0.35)] md:w-10" aria-hidden />
          DESIGN COLLECTIVE
          <span className="h-px w-8 bg-[rgb(var(--text)/0.35)] md:w-10" aria-hidden />
        </p>
      </div>

      <div
        ref={lineRef}
        className="relative z-10 mt-8 h-px w-[min(70vw,480px)] origin-center bg-[linear-gradient(90deg,transparent,rgb(var(--accent)/0.65),rgb(var(--glow)/0.65),rgb(var(--accent2)/0.65),transparent)] md:mt-10"
      />

      <nav className="relative z-10 mt-9 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {NAV.map((n, i) => (
          <div key={n.label} className="flex items-center gap-4 md:gap-6">
            {i > 0 && (
              <span
                data-hero-btn
                className="h-4 w-px bg-[linear-gradient(180deg,transparent,rgb(var(--text)/0.4),transparent)] md:h-5"
              />
            )}
            <HeroCallout label={n.label} to={n.to} />
          </div>
        ))}
      </nav>

      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.38em] text-[rgb(var(--muted))]">
          SCROLL TO EXPLORE
        </span>
        <div className="h-10 w-px bg-[linear-gradient(180deg,rgb(var(--accent)),transparent)]" />
      </div>
    </section>
  )
}
