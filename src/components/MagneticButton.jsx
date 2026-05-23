import { useEffect, useRef } from 'react'

export default function MagneticButton({
  strength = 0.35,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    let raf
    const state = { x: 0, y: 0, tx: 0, ty: 0 }

    const tick = () => {
      state.x += (state.tx - state.x) * 0.2
      state.y += (state.ty - state.y) * 0.2
      el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      state.tx = (e.clientX - cx) * strength
      state.ty = (e.clientY - cy) * strength
    }
    const onLeave = () => {
      state.tx = 0
      state.ty = 0
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <a
      ref={ref}
      data-magnetic="true"
      className={className}
      style={{ display: 'inline-flex', willChange: 'transform', ...style }}
      {...rest}
    >
      {children}
    </a>
  )
}
