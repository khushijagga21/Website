import arqoLogoLight from '../../assets/arqo-logo-premium.png'
import arqoLogoDark from '../../assets/arqo-logo-premium-dark.png'
import { useTheme } from '../theme/useTheme'

type BrandLogoProps = {
  className?: string
  hero?: boolean
  alt?: string
}

/** Theme-aware ARQO mark — light/relax use ink outlines; dark uses a light rim. */
export function BrandLogo({
  className = '',
  hero = false,
  alt = 'ARQO Design Collective',
}: BrandLogoProps) {
  const { theme } = useTheme()
  const src = theme === 'dark' ? arqoLogoDark : arqoLogoLight

  return (
    <img
      key={src}
      src={src}
      alt={alt}
      className={['arqo-logo', hero ? 'arqo-logo--hero' : '', className].filter(Boolean).join(' ')}
      draggable={false}
      decoding="async"
    />
  )
}
