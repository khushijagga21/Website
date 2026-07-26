import { AnimatePresence, motion } from 'framer-motion'
import { FiMoon, FiSun, FiCoffee } from 'react-icons/fi'
import { useTheme, type ThemeId } from '../theme/useTheme'
import { useMagnetic } from '../../hooks/useMagnetic'

const MODES: { id: ThemeId; label: string; Icon: typeof FiSun }[] = [
  { id: 'light', label: 'Light', Icon: FiSun },
  { id: 'dark', label: 'Dark', Icon: FiMoon },
  { id: 'relax', label: 'Relax', Icon: FiCoffee },
]

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.16, scale: 1.03 })
  const active = MODES.find((m) => m.id === theme) ?? MODES[0]
  const Icon = active.Icon

  return (
    <button
      ref={ref}
      type="button"
      onClick={cycleTheme}
      data-cursor="hover"
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-3 py-2 text-sm text-[rgb(var(--text))] backdrop-blur-xl"
      style={{
        boxShadow: '0 0 0 1px rgb(var(--border)), 0 18px 40px rgb(var(--shadow))',
        transition: 'background-color 700ms var(--ease-soft), border-color 700ms var(--ease-soft), color 700ms var(--ease-soft), box-shadow 700ms var(--ease-soft)',
      }}
      aria-label={`Theme: ${active.label}. Click to switch.`}
      title="Switch theme"
    >
      <span className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[rgb(var(--text)/0.06)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -40, opacity: 0, scale: 0.7, y: 6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1, y: 0 }}
            exit={{ rotate: 30, opacity: 0, scale: 0.75, y: -6 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 grid place-items-center"
          >
            <Icon />
          </motion.span>
        </AnimatePresence>
      </span>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hidden min-w-[2.8rem] sm:inline"
        >
          {active.label}
        </motion.span>
      </AnimatePresence>

      {/* Mode dots — shows which of the 3 themes is active */}
      <span className="ml-0.5 hidden items-center gap-1 sm:inline-flex" aria-hidden>
        {MODES.map((m) => (
          <span
            key={m.id}
            className="h-1.5 w-1.5 rounded-full transition-all duration-500"
            style={{
              background:
                m.id === theme
                  ? 'rgb(var(--accent))'
                  : 'rgb(var(--text) / 0.18)',
              transform: m.id === theme ? 'scale(1.25)' : 'scale(1)',
              boxShadow: m.id === theme ? '0 0 10px rgb(var(--accent) / 0.45)' : 'none',
            }}
          />
        ))}
      </span>

      <span className="pointer-events-none absolute -inset-px rounded-full opacity-0 blur-md transition-opacity duration-700 group-hover:opacity-100">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(var(--glow)/0.4),transparent_60%)]" />
      </span>
    </button>
  )
}
