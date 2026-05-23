import { useState, useEffect, useRef } from 'react'

function makeDrops(count) {
  const drops = []
  for (let i = 0; i < count; i++) {
    drops.push({
      id: i,
      left: Math.random() * 100,
      size: 18 + Math.random() * 42,
      duration: 7 + Math.random() * 8,
      delay: -Math.random() * 18,
      drift: (Math.random() - 0.5) * 80,
      rotate: (Math.random() - 0.5) * 220,
      opacity: 0.18 + Math.random() * 0.32,
      tone: Math.random() > 0.7 ? 'gold' : 'green',
    })
  }
  return drops
}

export default function TengeRain({ count = 42 }) {
  const [active, setActive] = useState(false)
  const containerRef = useRef(null)
  const [drops] = useState(() => makeDrops(count))
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const el = containerRef.current

    const ro = new ResizeObserver(() => {
      setHeight(el.offsetHeight)
    })
    ro.observe(el)
    setHeight(el.offsetHeight)

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setActive(e.isIntersecting)
      },
      { threshold: 0.02 }
    )
    io.observe(el)

    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const fallDistance = Math.max(height + 220, 1200)

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {drops.map((d) => (
        <span
          key={d.id}
          className="tenge-drop"
          style={{
            left: `${d.left}%`,
            fontSize: `${d.size}px`,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
            animationPlayState: active ? 'running' : 'paused',
            color: d.tone === 'gold' ? '#F5C84B' : '#00F5A0',
            opacity: d.opacity,
            textShadow:
              d.tone === 'gold'
                ? '0 0 14px rgba(245, 200, 75, 0.45)'
                : '0 0 14px rgba(0, 245, 160, 0.45)',
            '--tenge-drift': `${d.drift}px`,
            '--tenge-rot': `${d.rotate}deg`,
            '--fall-distance': `${fallDistance}px`,
          }}
        >
          ₸
        </span>
      ))}
    </div>
  )
}
