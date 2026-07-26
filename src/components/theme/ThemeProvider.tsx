import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'

export type ThemeId = 'light' | 'dark' | 'relax'

type ThemeCtx = {
  theme: ThemeId
  setTheme: (t: ThemeId) => void
  cycleTheme: () => void
}

export const ThemeContext = createContext<ThemeCtx | null>(null)

const LS_KEY = 'arqo-theme'
const ORDER: ThemeId[] = ['light', 'dark', 'relax']

/** Canonical theme tokens (RGB channels, optional alpha). */
const THEMES: Record<ThemeId, Record<string, string>> = {
  light: {
    bg: '255 255 255',
    bg2: '248 248 248',
    surface: '255 255 255',
    surface2: '252 251 248',
    text: '15 15 18',
    muted: '98 102 110',
    border: '0 0 0 / 0.10',
    shadow: '0 0 0 / 0.10',
    glass: '255 255 255 / 0.55',
    glow: '214 170 74',
    accent: '204 86 72',
    accent2: '78 116 139',
  },
  dark: {
    bg: '14 14 16',
    bg2: '12 12 14',
    surface: '18 18 22',
    surface2: '22 22 28',
    text: '245 246 250',
    muted: '165 170 182',
    border: '255 255 255 / 0.10',
    shadow: '0 0 0 / 0.55',
    glass: '18 18 22 / 0.55',
    glow: '78 116 139',
    accent: '214 170 74',
    accent2: '78 116 139',
  },
  relax: {
    bg: '250 245 235',
    bg2: '241 232 216',
    surface: '255 252 246',
    surface2: '250 243 232',
    text: '22 18 16',
    muted: '108 92 84',
    border: '0 0 0 / 0.10',
    shadow: '0 0 0 / 0.14',
    glass: '255 252 246 / 0.50',
    glow: '204 86 72',
    accent: '204 86 72',
    accent2: '126 151 132',
  },
}

type ParsedColor = { r: number; g: number; b: number; a: number; hasAlpha: boolean }

function parseColor(value: string): ParsedColor {
  const cleaned = value.trim()
  const withAlpha = cleaned.match(
    /^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/,
  )
  if (withAlpha) {
    return {
      r: Number(withAlpha[1]),
      g: Number(withAlpha[2]),
      b: Number(withAlpha[3]),
      a: Number(withAlpha[4]),
      hasAlpha: true,
    }
  }

  const rgb = cleaned.match(/^(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)$/)
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
      a: 1,
      hasAlpha: false,
    }
  }

  return { r: 0, g: 0, b: 0, a: 1, hasAlpha: false }
}

function formatColor(c: ParsedColor, forceAlpha: boolean) {
  const r = Math.round(c.r)
  const g = Math.round(c.g)
  const b = Math.round(c.b)
  if (forceAlpha || c.hasAlpha) {
    const a = Math.max(0, Math.min(1, Number(c.a.toFixed(3))))
    return `${r} ${g} ${b} / ${a}`
  }
  return `${r} ${g} ${b}`
}

function readInitialTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw === 'light' || raw === 'dark' || raw === 'relax') return raw
  } catch {
    /* ignore */
  }
  return 'light'
}

function setHtmlTheme(t: ThemeId) {
  document.documentElement.dataset.theme = t
  document.documentElement.style.colorScheme = t === 'dark' ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'light'
    return readInitialTheme()
  })

  const readyRef = useRef(false)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const veilRef = useRef<HTMLDivElement | null>(null)

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t)
    try {
      localStorage.setItem(LS_KEY, t)
    } catch {
      /* ignore */
    }
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length] ?? 'light'
      try {
        localStorage.setItem(LS_KEY, next)
      } catch {
        /* ignore */
      }
      return next
    })
  }, [])

  // Soft veil layer for buttery crossfades between themes
  useEffect(() => {
    const veil = document.createElement('div')
    veil.setAttribute('aria-hidden', 'true')
    veil.style.cssText = [
      'position:fixed',
      'inset:0',
      'pointer-events:none',
      'z-index:9998',
      'opacity:0',
      'background:rgb(var(--bg))',
      'transition:none',
    ].join(';')
    document.body.appendChild(veil)
    veilRef.current = veil
    return () => {
      veil.remove()
      veilRef.current = null
    }
  }, [])

  useEffect(() => {
    setHtmlTheme(theme)

    // First paint: apply instantly, no animation
    if (!readyRef.current) {
      readyRef.current = true
      const tokens = THEMES[theme]
      const root = document.documentElement
      Object.entries(tokens).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
      return
    }

    const root = document.documentElement
    const target = THEMES[theme]
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      Object.entries(target).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value)
      })
      return
    }
    const computed = getComputedStyle(root)

    type ChannelState = Record<string, number>
    const from: ChannelState = {}
    const to: ChannelState = {}
    const meta: Record<string, { hasAlpha: boolean }> = {}

    Object.keys(target).forEach((key) => {
      const currentRaw = (computed.getPropertyValue(`--${key}`).trim() || target[key]).trim()
      const current = parseColor(currentRaw)
      const next = parseColor(target[key])
      const useAlpha = current.hasAlpha || next.hasAlpha

      meta[key] = { hasAlpha: useAlpha }
      from[`${key}_r`] = current.r
      from[`${key}_g`] = current.g
      from[`${key}_b`] = current.b
      from[`${key}_a`] = current.a
      to[`${key}_r`] = next.r
      to[`${key}_g`] = next.g
      to[`${key}_b`] = next.b
      to[`${key}_a`] = next.a
    })

    tweenRef.current?.kill()

    const veil = veilRef.current
    if (veil) {
      gsap.killTweensOf(veil)
      gsap.fromTo(
        veil,
        { opacity: 0 },
        {
          opacity: 0.22,
          duration: 0.28,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        },
      )
    }

    const state = { ...from }
    tweenRef.current = gsap.to(state, {
      ...to,
      duration: 1.15,
      ease: 'power2.inOut',
      onUpdate: () => {
        Object.keys(target).forEach((key) => {
          const parsed: ParsedColor = {
            r: state[`${key}_r`],
            g: state[`${key}_g`],
            b: state[`${key}_b`],
            a: state[`${key}_a`],
            hasAlpha: meta[key].hasAlpha,
          }
          root.style.setProperty(`--${key}`, formatColor(parsed, meta[key].hasAlpha))
        })
      },
      onComplete: () => {
        Object.entries(target).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value)
        })
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [theme])

  const value = useMemo<ThemeCtx>(
    () => ({ theme, setTheme, cycleTheme }),
    [theme, setTheme, cycleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
