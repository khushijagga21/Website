import { useContext } from 'react'
import { ThemeContext, type ThemeId } from './ThemeProvider'

export type { ThemeId }

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
