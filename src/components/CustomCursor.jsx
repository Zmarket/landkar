import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    document.body.classList.add('cursor-none')

    const dot = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: dot.x, y: dot.y }
    let target = { x: dot.x, y: dot.y }
    let scale = 1
    let targetScale = 1
    let raf

    const tick = () => {
      dot.x += (target.x - dot.x) * 0.55
      dot.y += (target.y - dot.y) * 0.55
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      scale += (targetScale - scale) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onMove = (e) => {
      target = { x: e.clientX, y: e.clientY }
      setHidden(false)
    }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const isInteractive = (el) =>
      el &&
      (el.matches?.('a, button, input, textarea, [data-magnetic], [data-cursor="hover"]') ||
        el.closest?.('a, button, input, textarea, [data-magnetic], [data-cursor="hover"]'))

    const onOver = (e) => {
      if (isInteractive(e.target)) targetScale = 2.4
    }
    const onOut = (e) => {
      if (isInteractive(e.target)) targetScale = 1
    }
    const onDown = () => { targetScale = Math.max(0.7, targetScale * 0.7) }
    const onUp = () => { targetScale = isInteractive(document.elementFromPoint(target.x, target.y)) ? 2.4 : 1 }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    window.addEventListener('mouseover', onOver, true)
    window.addEventListener('mouseout', onOut, true)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('mouseover', onOver, true)
      window.removeEventListener('mouseout', onOut, true)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.body.classList.remove('cursor-none')
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-ring"
        style={{ opacity: hidden ? 0 : 1 }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-dot"
        style={{ opacity: hidden ? 0 : 1 }}
      />
    </>
  )
}
