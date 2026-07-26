import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { LogoMark } from './LogoMark'
import { ThemeToggle } from '../ui/ThemeToggle'
import { useMagnetic } from '../../hooks/useMagnetic'

const NAV = [
  { label: 'Home', to: '/', section: 'home' },
  { label: 'About', to: '/about', section: 'about' },
  { label: 'Services', to: '/services', section: 'services' },
  { label: 'Projects', to: '/projects', section: 'projects' },
  { label: 'Contact', to: '/contact', section: 'contact' },
] as const

const SECTION_TO_PATH: Record<string, string> = {
  home: '/',
  about: '/about',
  services: '/services',
  projects: '/projects',
  contact: '/contact',
}

function NavLink({
  label,
  to,
  active,
}: {
  label: string
  to: string
  active: boolean
}) {
  const ref = useMagnetic<HTMLAnchorElement>({ strength: 0.14, scale: 1.02 })

  return (
    <Link
      ref={ref}
      to={to}
      className={[
        'relative px-3 py-2 text-[10px] tracking-[0.2em] transition-all duration-300 md:text-[11px]',
        active
          ? 'text-[rgb(var(--text))]'
          : 'text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]',
      ].join(' ')}
      data-cursor="hover"
    >
      {label.toUpperCase()}
      {active && (
        <motion.span
          layoutId="nav-active"
          className="absolute -bottom-0.5 left-3 right-3 h-px bg-[rgb(var(--accent))]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
    </Link>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activePath, setActivePath] = useState('/')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Sync active highlight with route; on Home, scroll-spy overrides below
  useEffect(() => {
    setActivePath(location.pathname)
  }, [location.pathname])

  // Scroll-spy: highlight nav as home sections enter view
  useEffect(() => {
    if (location.pathname !== '/') return

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-section]'),
    )
    if (!sections.length) return

    const ratios = new Map<string, number>()

    const pickActive = () => {
      let best = 'home'
      let bestRatio = -1
      for (const [id, ratio] of ratios) {
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      }
      if (bestRatio >= 0) {
        setActivePath(SECTION_TO_PATH[best] ?? '/')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-nav-section')
          if (!id) continue
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        pickActive()
      },
      {
        // Prefer the section sitting in the upper-middle of the viewport
        rootMargin: '-18% 0px -52% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const showBar = scrolled || !isHome

  return (
    <>
      <header
        className={[
          'fixed left-0 right-0 top-0 z-50 transition-all duration-500',
          showBar
            ? 'translate-y-0 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.85)] opacity-100 backdrop-blur-xl'
            : 'pointer-events-none -translate-y-full bg-transparent opacity-0',
        ].join(' ')}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
          <LogoMark compact />

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.label}
                label={n.label}
                to={n.to}
                active={activePath === n.to}
              />
            ))}
            <div className="ml-4 border-l border-[rgb(var(--border))] pl-4">
              <ThemeToggle />
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              data-cursor="hover"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))]"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[rgb(var(--bg)/0.9)] backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-[72px] flex flex-col gap-2 px-6"
            >
              {NAV.map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={[
                      'block border-b border-[rgb(var(--border))] py-4 font-[var(--font-display)] text-xl font-normal',
                      activePath === n.to ? 'text-[rgb(var(--accent))]' : '',
                    ].join(' ')}
                    data-cursor="hover"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
