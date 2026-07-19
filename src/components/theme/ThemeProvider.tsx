import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
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

function readInitialTheme(): ThemeId {
  const raw = localStorage.getItem(LS_KEY)
  if (raw === 'light' || raw === 'dark' || raw === 'relax') return raw
  return 'light'
}

function setHtmlTheme(t: ThemeId) {
  document.documentElement.dataset.theme = t
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'light'
    return readInitialTheme()
  })

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t)
    localStorage.setItem(LS_KEY, t)
  }, [])

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = ORDER[(ORDER.indexOf(prev) + 1) % ORDER.length] ?? 'light'
      localStorage.setItem(LS_KEY, next)
      return next
    })
  }, [])

  useEffect(() => {
    // Ensure attribute exists at hydration time.
    setHtmlTheme(theme)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    // Animate a handful of the most visible tokens between themes.
    // We animate computed colors by tweening CSS variables via GSAP.
    const computed = getComputedStyle(root)
    const get = (name: string) => computed.getPropertyValue(name).trim()

    // Set the new theme instantly, then animate vars towards its values from the previous snapshot.
    const prev = {
      bg: get('--bg'),
      bg2: get('--bg2'),
      surface: get('--surface'),
      text: get('--text'),
      muted: get('--muted'),
      glass: get('--glass'),
    }

    setHtmlTheme(theme)

    const nextComputed = getComputedStyle(root)
    const next = {
      bg: nextComputed.getPropertyValue('--bg').trim(),
      bg2: nextComputed.getPropertyValue('--bg2').trim(),
      surface: nextComputed.getPropertyValue('--surface').trim(),
      text: nextComputed.getPropertyValue('--text').trim(),
      muted: nextComputed.getPropertyValue('--muted').trim(),
      glass: nextComputed.getPropertyValue('--glass').trim(),
    }

    gsap.killTweensOf(root)
    gsap.set(root, {
      '--bg': prev.bg,
      '--bg2': prev.bg2,
      '--surface': prev.surface,
      '--text': prev.text,
      '--muted': prev.muted,
      '--glass': prev.glass,
    } as gsap.TweenVars)

    gsap.to(root, {
      duration: 0.85,
      ease: 'power3.out',
      '--bg': next.bg,
      '--bg2': next.bg2,
      '--surface': next.surface,
      '--text': next.text,
      '--muted': next.muted,
      '--glass': next.glass,
    } as gsap.TweenVars)
  }, [theme])

  const value = useMemo<ThemeCtx>(() => ({ theme, setTheme, cycleTheme }), [
    theme,
    setTheme,
    cycleTheme,
  ])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

