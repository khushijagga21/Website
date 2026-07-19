import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiCoffee } from 'react-icons/fi'
import { useTheme } from '../theme/useTheme'
import { useMagnetic } from '../../hooks/useMagnetic'

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.18, scale: 1.03 })

  const Icon = theme === 'dark' ? FiMoon : theme === 'relax' ? FiCoffee : FiSun

  return (
    <button
      ref={ref}
      type="button"
      onClick={cycleTheme}
      data-cursor="hover"
      className="group relative inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-3 py-2 text-sm text-[rgb(var(--text))] backdrop-blur-xl transition-colors duration-300 hover:bg-[rgb(var(--glass))]"
      style={{
        boxShadow:
          '0 0 0 1px rgb(var(--border)), 0 18px 40px rgb(var(--shadow))',
      }}
      aria-label="Toggle theme"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -25, opacity: 0, y: 2 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        exit={{ rotate: 25, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgb(var(--text)/0.06)]"
      >
        <Icon />
      </motion.span>
      <span className="hidden sm:inline">
        {theme === 'dark' ? 'Dark' : theme === 'relax' ? 'Relax' : 'Light'}
      </span>
      <span className="absolute -inset-px rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgb(var(--glow)/0.45),transparent_60%)]" />
      </span>
    </button>
  )
}

