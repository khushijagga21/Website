import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ORDER = ['/', '/about', '/services', '/projects', '/contact'] as const

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function getDocHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
  )
}

export function ScrollRouteNavigator() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const lockRef = useRef(false)
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    lockRef.current = false
  }, [pathname])

  useEffect(() => {
    const idx = ORDER.indexOf(pathname as (typeof ORDER)[number])
    if (idx === -1) return

    const go = (dir: 1 | -1) => {
      if (lockRef.current) return
      const nextIdx = clamp(idx + dir, 0, ORDER.length - 1)
      if (nextIdx === idx) return

      lockRef.current = true
      navigate(ORDER[nextIdx])
      // Short cooldown — faster page-to-page switches
      window.setTimeout(() => {
        lockRef.current = false
      }, 380)
    }

    const atBottom = () => {
      const docH = getDocHeight()
      const y = window.scrollY + window.innerHeight
      return y >= docH - 2
    }

    const atTop = () => window.scrollY <= 0

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // allow zoom
      if (lockRef.current) return

      const dy = e.deltaY
      if (dy > 12 && atBottom()) {
        e.preventDefault()
        go(1)
      } else if (dy < -12 && atTop()) {
        e.preventDefault()
        go(-1)
      }
    }

    const onKey = (e: KeyboardEvent) => {
      if (lockRef.current) return
      if (e.key === 'PageDown' && atBottom()) {
        e.preventDefault()
        go(1)
      } else if (e.key === 'PageUp' && atTop()) {
        e.preventDefault()
        go(-1)
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null
    }

    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current
      touchStartY.current = null
      if (start == null) return
      const end = e.changedTouches[0]?.clientY
      if (end == null) return
      const delta = end - start
      // swipe up (delta negative) means go down
      if (delta < -70 && atBottom()) go(1)
      if (delta > 70 && atTop()) go(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel as any)
      window.removeEventListener('keydown', onKey as any)
      window.removeEventListener('touchstart', onTouchStart as any)
      window.removeEventListener('touchend', onTouchEnd as any)
    }
  }, [navigate, pathname])

  return null
}

