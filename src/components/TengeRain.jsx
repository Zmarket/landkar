import { useState, useEffect, useRef } from 'react'

function makeDrops(count) {
  const drops = []
  for (let i = 0; i < count; i++) {
    drops.push({
      id: i,
      left: Math.random() * 100,
      size: 18 + Math.random() * 38,
      duration: 8 + Math.random() * 9,
      delay: -Math.random() * 12,
      drift: (Math.random() - 0.5) * 60,
      rotate: (Math.random() - 0.5) * 180,
      opacity: 0.18 + Math.random() * 0.32,
      tone: Math.random() > 0.7 ? 'gold' : 'green',
    })
  }
  return drops
}

export default function TengeRain({ count = 22 }) {
  const [active, setActive] = useState(false)
  const sectionRef = useRef(null)
  const [drops] = useState(() => makeDrops(count))

  useEffect(() => {
    if (!sectionRef.current) return
    const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setActive(e.isIntersecting)
      },
      { threshold: 0.05 }
    )
    io.observe(sectionRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
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
          }}
        >
          ₸
        </span>
      ))}
    </div>
  )
}
