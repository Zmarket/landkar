import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  'ИНИЦИАЛИЗАЦИЯ',
  'ПОДКЛЮЧЕНИЕ К CRM',
  'АНАЛИЗ ВОРОНКИ',
  'ЗАГРУЗКА МОДУЛЕЙ',
  'СИНХРОНИЗАЦИЯ',
  'К.А.Р ГОТОВ',
]

const TOTAL_MS = 3600
const REVEAL_HOLD_MS = 1000
const EXIT_MS = 700

const ACTIVE_GRADIENT = 'linear-gradient(135deg, #00F5A0 0%, #6B8EFF 50%, #7B61FF 100%)'
const IDLE_GRADIENT = 'linear-gradient(135deg, #1f2937, #374151)'

function DollarSlot({ active, scale = 1 }) {
  return (
    <motion.span
      style={{
        display: 'inline-block',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 900,
        lineHeight: 1,
        fontSize: `clamp(${48 * scale}px, ${11 * scale}vw, ${130 * scale}px)`,
        background: active ? ACTIVE_GRADIENT : IDLE_GRADIENT,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: active ? 'drop-shadow(0 0 22px rgba(0, 245, 160, 0.45))' : 'none',
        opacity: active ? 1 : 0.22,
        transition: 'background 0.4s ease, filter 0.4s ease, opacity 0.4s ease',
      }}
      animate={{ scale: active ? 1 : 0.82 }}
      transition={{ type: 'spring', stiffness: 280, damping: 13 }}
    >
      $
    </motion.span>
  )
}

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading') // loading | reveal | exiting
  const startRef = useRef(0)
  const rafRef = useRef(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    startRef.current = performance.now()

    const tick = () => {
      const elapsed = performance.now() - startRef.current
      const pct = Math.min(100, (elapsed / TOTAL_MS) * 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (phase !== 'reveal') return
    const t = setTimeout(() => setPhase('exiting'), REVEAL_HOLD_MS)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'exiting') return
    const t = setTimeout(() => onDone?.(), EXIT_MS)
    return () => clearTimeout(t)
  }, [phase, onDone])

  const stageIdx = Math.min(STAGES.length - 1, Math.floor((progress / 100) * STAGES.length))
  const intProgress = Math.floor(progress)
  const pctStr = String(intProgress).padStart(3, '0')

  const dollarCount = progress >= 100 ? 3 : progress >= 62 ? 2 : progress >= 32 ? 1 : 0
  const isReveal = phase === 'reveal' || phase === 'exiting'

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background:
          'radial-gradient(ellipse at 50% 50%, rgba(0,245,160,0.08) 0%, transparent 60%), #0A0E1A',
        fontFamily: 'Inter, sans-serif',
      }}
      initial={{ opacity: 1 }}
      animate={phase === 'exiting' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: EXIT_MS / 1000, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 grid-bg" aria-hidden="true" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
            style={{ background: 'linear-gradient(135deg,#00F5A0,#7B61FF)', color: '#0A0E1A' }}
          >
            К
          </div>
          <span className="text-xs tracking-[0.3em] text-slate-400 font-mono">К.А.Р</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.span
            key={stageIdx}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25 }}
            className="text-xs tracking-[0.3em] font-mono"
            style={{ color: '#00F5A0' }}
          >
            {STAGES[stageIdx]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Center stack */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Counter — fades as we enter reveal */}
          <motion.div
            className="font-black tabular-nums leading-none"
            style={{
              fontSize: 'clamp(56px, 12vw, 150px)',
              color: '#F1F5F9',
              letterSpacing: '-0.04em',
            }}
            animate={{
              opacity: isReveal ? 0 : 1,
              y: isReveal ? -30 : 0,
              filter: isReveal ? 'blur(8px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {pctStr}
            <span style={{ color: '#00F5A0' }}>%</span>
          </motion.div>

          {/* Dollar row — grows in reveal */}
          <motion.div
            className="flex items-center"
            style={{ gap: 'clamp(12px, 3vw, 36px)' }}
            animate={{
              scale: isReveal ? 1.55 : 1,
              y: isReveal ? -40 : 0,
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          >
            {[0, 1, 2].map((i) => (
              <DollarSlot key={i} active={i < dollarCount} />
            ))}
          </motion.div>

          {/* Tagline — hides in reveal */}
          <motion.p
            className="text-xs tracking-[0.4em] text-slate-500 font-mono uppercase text-center"
            animate={{ opacity: isReveal ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            Контроль · Аналитика · Рост
          </motion.p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 px-6 md:px-12 pb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-[0.3em] text-slate-500 font-mono">LOADING</span>
          <span className="text-xs tracking-[0.3em] text-slate-400 font-mono tabular-nums">
            {pctStr} / 100
          </span>
        </div>
        <div className="relative h-[2px] w-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="absolute inset-y-0 left-0"
            style={{
              background: 'linear-gradient(90deg, #00F5A0, #6B8EFF, #7B61FF)',
              boxShadow: '0 0 12px rgba(0,245,160,0.6)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15, ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] tracking-[0.3em] text-slate-600 font-mono">
          <span>SYSTEM K.A.R</span>
          <span>v.1.0</span>
        </div>
      </div>
    </motion.div>
  )
}
