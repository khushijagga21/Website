import type { IconType } from 'react-icons'
import { FiHome, FiBriefcase, FiLayout, FiCompass } from 'react-icons/fi'

export const SERVICES = [
  {
    num: '01',
    title: 'Residential',
    description: 'Bespoke homes shaped by lifestyle and landscape.',
    icon: FiHome,
    tint: 'var(--terracotta)',
  },
  {
    num: '02',
    title: 'Commercial',
    description: 'Workspaces that elevate brand through spatial clarity.',
    icon: FiBriefcase,
    tint: 'var(--steel)',
  },
  {
    num: '03',
    title: 'Interior',
    description: 'Holistic interiors—furniture, light, and material as one.',
    icon: FiLayout,
    tint: 'var(--sage)',
  },
  {
    num: '04',
    title: 'Consultation',
    description: 'Expert guidance from concept to completion.',
    icon: FiCompass,
    tint: 'var(--gold)',
  },
] as const satisfies ReadonlyArray<{
  num: string
  title: string
  description: string
  icon: IconType
  tint: string
}>
