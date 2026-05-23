import { useState, useEffect, useRef } from 'react'

// Drop types: ₸ symbols, amoCRM badges, Bitrix24 badges
function pickType() {
  const r = Math.random()
  if (r < 0.7) return 'tenge'
  if (r < 0.85) return 'amocrm'
  return 'bitrix24'
}

function makeDrops(count) {
  const drops = []
  for (let i = 0; i < count; i++) {
    const type = pickType()
    drops.push({
      id: i,
      type,
      left: Math.random() * 100,
      // Tenge characters are larger than logo badges
      size: type === 'tenge' ? 18 + Math.random() * 42 : 11 + Math.random() * 6,
      duration: 9 + Math.random() * 11,
      delay: -Math.random() * 24,
      drift: (Math.random() - 0.5) * 80,
      rotate: (Math.random() - 0.5) * 220,
      opacity: type === 'tenge' ? 0.18 + Math.random() * 0.32 : 0.35 + Math.random() * 0.3,
      // For tenge: green vs gold
      tone: Math.random() > 0.7 ? 'gold' : 'green',
    })
  }
  return drops
}

function DropContent({ type }) {
  if (type === 'tenge') return '₸'
  if (type === 'amocrm') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 9px',
          borderRadius: 8,
          background: 'rgba(0, 132, 255, 0.12)',
          border: '1px solid rgba(0, 132, 255, 0.45)',
          color: '#3DA9FC',
          letterSpacing: '0.02em',
        }}
      >
        <svg viewBox="0 0 24 24" width="0.9em" height="0.9em" fill="currentColor" aria-hidden="true">
          <path d="M12 3a9 9 0 109 9c0-.55-.05-1.09-.13-1.62A6 6 0 1112 6a3 3 0 100 6 1 1 0 100-2 1 1 0 010-2 5 5 0 11-5 5 1 1 0 11-2 0 7 7 0 1014 0 9 9 0 00-7-8.78V3z" />
        </svg>
        amoCRM
      </span>
    )
  }
  // bitrix24
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 9px',
        borderRadius: 8,
        background: 'rgba(0, 174, 239, 0.12)',
        border: '1px solid rgba(0, 174, 239, 0.45)',
        color: '#3CD0FF',
        letterSpacing: '0.02em',
      }}
    >
      <svg viewBox="0 0 24 24" width="0.9em" height="0.9em" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 17a7 7 0 110-14 7 7 0 010 14zm-1.5-4h3v-2h-3v-2h3V9h-5v8h5v-2h-3v-2z" />
      </svg>
      Bitrix24
    </span>
  )
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
      {drops.map((d) => {
        const isTenge = d.type === 'tenge'
        const tengeColor = d.tone === 'gold' ? '#F5C84B' : '#00F5A0'
        const tengeShadow =
          d.tone === 'gold'
            ? '0 0 14px rgba(245, 200, 75, 0.45)'
            : '0 0 14px rgba(0, 245, 160, 0.45)'
        const crmShadow =
          d.type === 'amocrm'
            ? '0 0 14px rgba(0, 132, 255, 0.45)'
            : '0 0 14px rgba(0, 174, 239, 0.45)'

        return (
          <span
            key={d.id}
            className="tenge-drop"
            style={{
              left: `${d.left}%`,
              fontSize: `${d.size}px`,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`,
              animationPlayState: active ? 'running' : 'paused',
              color: isTenge ? tengeColor : 'inherit',
              opacity: d.opacity,
              textShadow: isTenge ? tengeShadow : 'none',
              filter: isTenge ? undefined : `drop-shadow(${crmShadow})`,
              fontWeight: isTenge ? 900 : 600,
              '--tenge-drift': `${d.drift}px`,
              '--tenge-rot': `${d.rotate}deg`,
              '--fall-distance': `${fallDistance}px`,
            }}
          >
            <DropContent type={d.type} />
          </span>
        )
      })}
    </div>
  )
}
