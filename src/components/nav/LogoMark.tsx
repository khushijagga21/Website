import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useMagnetic } from '../../hooks/useMagnetic'
import arqoLogo from '../../assets/arqo-logo-cropped.png'

type LogoMarkProps = {
  compact?: boolean
}

export function LogoMark({ compact = false }: LogoMarkProps) {
  const wrapRef = useMagnetic<HTMLAnchorElement>({ strength: 0.08, scale: 1.02 })
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img || compact) return

    gsap.fromTo(
      img,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 },
    )
  }, [compact])

  return (
    <Link
      ref={wrapRef}
      to="/"
      className="group relative inline-flex flex-col items-start justify-center"
      aria-label="ARQO Design Collective — Home"
      data-cursor="hover"
    >
      <img
        ref={imgRef}
        src={arqoLogo}
        alt="ARQO Design Collective"
        className={
          compact
            ? 'h-8 w-auto object-contain sm:h-9'
            : 'h-10 w-auto object-contain sm:h-11'
        }
        style={{
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
        draggable={false}
        decoding="async"
      />
      <span
        className={[
          'mt-1 max-w-[11rem] whitespace-nowrap font-normal tracking-[0.16em] text-[rgb(var(--text))]',
          compact ? 'text-[8px] sm:text-[9px]' : 'text-[9px] sm:text-[10px]',
        ].join(' ')}
      >
        DESIGN COLLECTIVE
      </span>
    </Link>
  )
}
