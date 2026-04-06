import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './index.css'

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
)
const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
)
const IconPlug = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
  </svg>
)
const IconBrain = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
  </svg>
)
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)
const IconCheckLg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
)
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
)

// Module icons
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
)
const IconMoney = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
  </svg>
)
const IconMagnify = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
  </svg>
)
const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
)
const IconAcademic = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
)
const IconBolt = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
)
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)
const IconCog = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
)
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
  </svg>
)

// ─── All 10 Modules data ──────────────────────────────────────────────────────
const MODULES = [
  {
    num: '01',
    icon: <IconShield />,
    title: 'Контроль CRM и дисциплины',
    color: '#00F5A0',
    features: [
      'Контроль CRM 24/7',
      'Почасовой отчёт по действиям менеджеров',
      'Контроль скорости ответа (SLA)',
      'Контроль выполнения задач',
      'Контроль заполнения полей CRM',
      'Выявление фейковой активности',
      'Контроль статусов сделок',
    ],
  },
  {
    num: '02',
    icon: <IconMoney />,
    title: 'Управление выручкой',
    color: '#F59E0B',
    features: [
      'Поиск зависших лидов',
      'Список «кого дожать сегодня»',
      'Выявление потерянных лидов',
      'Рекомендации по дожиму',
      'Генерация сообщений для дожима',
      'Сценарии повторного контакта',
    ],
  },
  {
    num: '03',
    icon: <IconMagnify />,
    title: 'Аналитика и диагностика',
    color: '#7B61FF',
    features: [
      'Анализ воронки продаж',
      'Выявление узких мест',
      'Анализ причин отказов',
      'Анализ качества лидов (по источникам)',
      'Анализ эффективности менеджеров',
      'Прогноз выполнения плана',
      'Выявление точек потери денег',
    ],
  },
  {
    num: '04',
    icon: <IconChat />,
    title: 'Анализ коммуникации',
    color: '#6B8EFF',
    features: [
      'Анализ переписок (чаты)',
      'Анализ звонков (если подключено)',
      'Выявление ошибок в диалогах',
      'Оценка качества общения',
      'Анализ чатов за последние 24 часа',
      'Выявление недожима',
      'Рекомендации по улучшению сообщений',
    ],
  },
  {
    num: '05',
    icon: <IconAcademic />,
    title: 'Обучение и развитие',
    color: '#00C4D4',
    features: [
      'Персональные рекомендации каждому менеджеру',
      'Разбор конкретных диалогов',
      'Подсказки «как написать лучше»',
      'Улучшение скриптов',
      'Отслеживание роста менеджеров',
      'Сравнение эффективности сотрудников',
    ],
  },
  {
    num: '06',
    icon: <IconBolt />,
    title: 'Автоматические действия',
    color: '#EF4444',
    features: [
      'Автоматическая постановка задач',
      'Автоматические напоминания',
      'Автоматический дожим лидов',
      'Запуск сценариев при бездействии',
      'Уведомления о проблемах в CRM',
      'Авто-реакция на просадку показателей',
    ],
  },
  {
    num: '07',
    icon: <IconUsers />,
    title: 'Рекрутинг и подбор',
    color: '#A78BFA',
    features: [
      'Отбор кандидатов по профилю',
      'Анализ тестовых заданий',
      'Оценка кандидатов',
      'Прогноз потенциала менеджера',
      'Передача подходящих кандидатов HR',
    ],
  },
  {
    num: '08',
    icon: <IconCog />,
    title: 'Управление системой продаж',
    color: '#34D399',
    features: [
      'Выявление слабых этапов воронки',
      'Рекомендации по улучшению процесса',
      'Антикризисный режим при падении продаж',
      'Контроль выполнения плана',
      'Формирование ежедневных задач для выполнения плана',
    ],
  },
  {
    num: '09',
    icon: <IconGlobe />,
    title: 'Визуализация и интерфейс',
    color: '#60A5FA',
    features: [
      'Динамическая воронка продаж',
      'Визуализация зависших лидов',
      'Отчёты в понятном формате',
      'Прозрачность всех процессов',
      'Демонстрация действий менеджеров',
    ],
  },
  {
    num: '10',
    icon: <IconTrophy />,
    title: 'Контроль без собственника',
    color: '#F472B6',
    features: [
      'Полный контроль отдела без вмешательства',
      'Снижение зависимости от РОПа',
      'Исключение человеческого фактора',
      'Стабильная работа без «просадок настроения»',
    ],
  },
]

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    const duration = 2000
    const steps = 60
    const increment = numeric / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= numeric) {
        setCount(numeric)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

// ─── Live Funnel ──────────────────────────────────────────────────────────────
const FUNNEL_STAGES = [
  { label: 'Лиды', count: 120, color: '#7B61FF', width: 100 },
  { label: 'Квалификация', count: 84, color: '#6B8EFF', width: 82 },
  { label: 'Предложение', count: 51, color: '#00C4D4', width: 64 },
  { label: 'Переговоры', count: 28, color: '#00D4A0', width: 46 },
  { label: 'Закрыто', count: 18, color: '#00F5A0', width: 30 },
]

function LiveFunnel({ interactive = false }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000)
    return () => clearInterval(id)
  }, [])
  const stuckStage = tick % FUNNEL_STAGES.length

  return (
    <div className="relative w-full select-none">
      <div className="space-y-2">
        {FUNNEL_STAGES.map((stage, i) => {
          const isStuck = i === stuckStage
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-24 text-right text-xs text-slate-400 shrink-0">{stage.label}</div>
              <div className="flex-1 relative h-10 rounded-lg overflow-hidden bg-slate-800/60">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-lg flex items-center px-3"
                  style={{ backgroundColor: isStuck ? '#EF444420' : stage.color + '20', borderLeft: `3px solid ${isStuck ? '#EF4444' : stage.color}` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.width}%` }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                >
                  <span className="text-xs font-semibold" style={{ color: isStuck ? '#EF4444' : stage.color }}>
                    {stage.count} сделок
                  </span>
                </motion.div>
                {isStuck && (
                  <motion.div
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-red-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                    <span className="text-red-400 text-xs font-medium">Внимание!</span>
                  </motion.div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {interactive && (
          <motion.div
            key={stuckStage}
            className="absolute right-0 top-0 mt-1 mr-1 rounded-xl px-3 py-2 shadow-lg max-w-xs"
            style={{ background: '#0D1526', border: '1px solid rgba(239,68,68,0.3)' }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
              <span className="text-xs font-semibold text-[#00F5A0]">К.А.Р рекомендует</span>
            </div>
            <p className="text-xs text-slate-300">
              {stuckStage === 0 && 'Позвоните лидам из Яндекса — конверсия выше на 40%'}
              {stuckStage === 1 && 'Менеджер Иванов не отвечал клиенту 5 дней'}
              {stuckStage === 2 && 'Отправьте коммерческое предложение сегодня'}
              {stuckStage === 3 && 'Сделка висит 3 недели — нужна встреча с ЛПР'}
              {stuckStage === 4 && 'Попросите отзыв у закрытых клиентов'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="absolute left-[6rem] w-3 h-3 rounded-full bg-[#00F5A0]"
        style={{ boxShadow: '0 0 12px #00F5A0' }}
        animate={{ y: [0, 40, 80, 120, 160], opacity: [0, 1, 1, 1, 0], scale: [0.5, 1, 1, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
      />
    </div>
  )
}

// ─── Particles ────────────────────────────────────────────────────────────────
function ParticlesBg() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 1, duration: Math.random() * 10 + 8, delay: Math.random() * 5,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size,
            backgroundColor: p.id % 3 === 0 ? '#00F5A0' : p.id % 3 === 1 ? '#7B61FF' : '#6B8EFF',
            opacity: 0.4,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Module 01 Preview ───────────────────────────────────────────────────────
const MANAGERS = [
  { name: 'Иванов А.', tasks: 14, total: 15, sla: 'ok',   score: 94, fakeRisk: false },
  { name: 'Петров С.', tasks: 9,  total: 15, sla: 'warn', score: 71, fakeRisk: false },
  { name: 'Козлов Д.', tasks: 3,  total: 15, sla: 'fail', score: 28, fakeRisk: true  },
]
const SLA_COLOR = { ok: '#00F5A0', warn: '#F59E0B', fail: '#EF4444' }
const SLA_LABEL = { ok: 'В норме', warn: '3.2 ч', fail: '6.8 ч' }

function Module01Preview({ inView, delay = 0 }) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setTick(t => t + 1), 3500)
    return () => clearInterval(id)
  }, [inView])

  const alerts = [
    { color: '#EF4444', text: 'Козлов Д. — просрочен ответ клиенту (6.8 ч)' },
    { color: '#F59E0B', text: 'Петров С. — незаполнены поля в 2 сделках' },
    { color: '#EF4444', text: 'Выявлена фейковая активность: 4 задачи закрыты без действий' },
  ]
  const activeAlert = tick % alerts.length

  return (
    <motion.div
      className="mt-4 rounded-xl overflow-hidden"
      style={{ background: 'rgba(5,10,20,0.9)', border: '1px solid rgba(0,245,160,0.12)' }}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay + 1.3 }}
    >
      {/* Report header */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,245,160,0.05)' }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"
            animate={{ opacity: [1,0.3,1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
          <span className="text-xs font-semibold text-[#00F5A0]">К.А.Р · Отчёт сегодня 09:00</span>
        </div>
        <span className="text-xs text-slate-600 font-mono">LIVE</span>
      </div>

      {/* Manager table */}
      <div className="px-3 pt-2 pb-1">
        <div className="grid grid-cols-4 gap-1 mb-1 px-1">
          {['Менеджер', 'Задачи', 'SLA', 'Балл'].map(h => (
            <span key={h} className="text-xs text-slate-600 font-medium">{h}</span>
          ))}
        </div>
        {MANAGERS.map((m, i) => (
          <motion.div
            key={m.name}
            className="grid grid-cols-4 gap-1 items-center rounded-lg px-1 py-1.5 mb-0.5"
            style={{ background: m.sla === 'fail' ? 'rgba(239,68,68,0.05)' : 'transparent' }}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 1.45 + i * 0.1 }}
          >
            {/* Name */}
            <div className="flex items-center gap-1.5 min-w-0">
              {m.fakeRisk && (
                <svg viewBox="0 0 24 24" fill="#EF4444" className="w-2.5 h-2.5 shrink-0">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              )}
              <span className="text-xs text-slate-300 truncate">{m.name}</span>
            </div>
            {/* Tasks */}
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-white">{m.tasks}</span>
              <span className="text-xs text-slate-600">/{m.total}</span>
            </div>
            {/* SLA */}
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: SLA_COLOR[m.sla] }} />
              <span className="text-xs" style={{ color: SLA_COLOR[m.sla] }}>{SLA_LABEL[m.sla]}</span>
            </div>
            {/* Score bar */}
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: m.score > 80 ? '#00F5A0' : m.score > 50 ? '#F59E0B' : '#EF4444' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${m.score}%` } : {}}
                  transition={{ duration: 0.8, delay: delay + 1.6 + i * 0.1 }}
                />
              </div>
              <span className="text-xs font-mono" style={{ color: m.score > 80 ? '#00F5A0' : m.score > 50 ? '#F59E0B' : '#EF4444' }}>
                {m.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rotating alert */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAlert}
          className="mx-3 mb-2.5 mt-1 flex items-start gap-2 px-2.5 py-2 rounded-lg"
          style={{ background: `${alerts[activeAlert].color}10`, border: `1px solid ${alerts[activeAlert].color}25` }}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-0.5"
            style={{ backgroundColor: alerts[activeAlert].color }}
            animate={{ opacity: [1,0.4,1] }} transition={{ repeat: Infinity, duration: 1 }}
          />
          <span className="text-xs leading-relaxed" style={{ color: alerts[activeAlert].color }}>
            {alerts[activeAlert].text}
          </span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Module Previews 02–10 ───────────────────────────────────────────────────

function PreviewRow({ label, value, color, bar, inView, delay }) {
  return (
    <motion.div className="flex items-center justify-between gap-2"
      initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay }}>
      <span className="text-xs text-slate-400 truncate flex-1">{label}</span>
      {bar !== undefined ? (
        <div className="flex items-center gap-1.5 w-24 shrink-0">
          <div className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: color }}
              initial={{ width: 0 }} animate={inView ? { width: `${bar}%` } : {}}
              transition={{ duration: 0.7, delay: delay + 0.1 }} />
          </div>
          <span className="text-xs font-mono w-6 text-right" style={{ color }}>{value}</span>
        </div>
      ) : (
        <span className="text-xs font-semibold shrink-0" style={{ color }}>{value}</span>
      )}
    </motion.div>
  )
}

function PreviewShell({ color, title, children, inView, delay }) {
  return (
    <motion.div className="mt-4 rounded-xl overflow-hidden"
      style={{ background: 'rgba(5,10,20,0.9)', border: `1px solid ${color}18` }}
      initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay + 1.3 }}>
      <div className="flex items-center gap-2 px-3 py-2"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: `${color}08` }}>
        <motion.div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }}
          animate={{ opacity: [1,0.3,1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
        <span className="text-xs font-semibold" style={{ color }}>{title}</span>
      </div>
      <div className="px-3 py-2.5 space-y-2">{children}</div>
    </motion.div>
  )
}

// M02 — Управление выручкой: список «кого дожать сегодня»
function Module02Preview({ inView, delay = 0 }) {
  const leads = [
    { name: 'ТОО Технострой', sum: '480 000 ₸', stage: 'Переговоры', urgency: 'hot', days: 1 },
    { name: 'ИП Сейткали', sum: '210 000 ₸', stage: 'КП отправлено', urgency: 'warm', days: 3 },
    { name: 'Ромашка ООО', sum: '95 000 ₸', stage: 'Зависла', urgency: 'cold', days: 8 },
  ]
  const urg = { hot: '#00F5A0', warm: '#F59E0B', cold: '#EF4444' }
  const urgLabel = { hot: 'Горячий', warm: 'Тёплый', cold: 'Теряем' }
  return (
    <PreviewShell color="#F59E0B" title="К.А.Р · Дожать сегодня" inView={inView} delay={delay}>
      {leads.map((l, i) => (
        <motion.div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5"
          style={{ background: `${urg[l.urgency]}08`, border: `1px solid ${urg[l.urgency]}18` }}
          initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 1.45 + i * 0.1 }}>
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: urg[l.urgency] }} />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">{l.name}</p>
            <p className="text-xs text-slate-500">{l.stage} · {l.days} дн.</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold" style={{ color: urg[l.urgency] }}>{l.sum}</p>
            <p className="text-xs" style={{ color: urg[l.urgency] }}>{urgLabel[l.urgency]}</p>
          </div>
        </motion.div>
      ))}
      <motion.div className="text-xs text-center pt-1" style={{ color: '#F59E0B' }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 1.9 }}>
        Потенциал сегодня: <span className="font-bold">785 000 ₸</span>
      </motion.div>
    </PreviewShell>
  )
}

// M03 — Аналитика: воронка с узким местом
function Module03Preview({ inView, delay = 0 }) {
  const stages = [
    { label: 'Лиды', pct: 100, conv: null, color: '#7B61FF' },
    { label: 'Квалифик.', pct: 71, conv: '71%', color: '#6B8EFF' },
    { label: 'Предложение', pct: 42, conv: '59%', color: '#00C4D4', bottleneck: true },
    { label: 'Переговоры', pct: 23, conv: '55%', color: '#00D4A0' },
    { label: 'Закрыто', pct: 13, conv: '57%', color: '#00F5A0' },
  ]
  return (
    <PreviewShell color="#7B61FF" title="К.А.Р · Диагностика воронки" inView={inView} delay={delay}>
      {stages.map((s, i) => (
        <motion.div key={i} className="flex items-center gap-2"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.4 + i * 0.08 }}>
          <span className="text-xs text-slate-500 w-20 shrink-0 truncate">{s.label}</span>
          <div className="flex-1 h-4 rounded bg-slate-800/60 overflow-hidden relative">
            <motion.div className="h-full rounded flex items-center px-1.5"
              style={{ backgroundColor: s.bottleneck ? '#EF444430' : `${s.color}25`, borderLeft: `2px solid ${s.bottleneck ? '#EF4444' : s.color}` }}
              initial={{ width: 0 }} animate={inView ? { width: `${s.pct}%` } : {}}
              transition={{ duration: 0.7, delay: delay + 1.5 + i * 0.08 }}>
              {s.bottleneck && <span className="text-xs text-red-400 font-semibold whitespace-nowrap">⚠ Узкое место</span>}
            </motion.div>
          </div>
          {s.conv && <span className="text-xs w-8 text-right shrink-0" style={{ color: s.bottleneck ? '#EF4444' : s.color }}>{s.conv}</span>}
        </motion.div>
      ))}
    </PreviewShell>
  )
}

// M04 — Анализ коммуникации
function Module04Preview({ inView, delay = 0 }) {
  const chats = [
    { manager: 'Иванов А.', score: 88, errors: 0, label: 'Отлично' },
    { manager: 'Петров С.', score: 62, errors: 2, label: 'Недожим' },
    { manager: 'Козлов Д.', score: 31, errors: 5, label: 'Критично' },
  ]
  const col = (s) => s > 75 ? '#00F5A0' : s > 50 ? '#F59E0B' : '#EF4444'
  return (
    <PreviewShell color="#6B8EFF" title="К.А.Р · Качество диалогов за 24 ч" inView={inView} delay={delay}>
      {chats.map((c, i) => (
        <motion.div key={i} className="space-y-1"
          initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 1.45 + i * 0.12 }}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-300">{c.manager}</span>
            <div className="flex items-center gap-2">
              {c.errors > 0 && <span className="text-xs text-red-400">{c.errors} ошибки</span>}
              <span className="text-xs font-bold" style={{ color: col(c.score) }}>{c.label}</span>
            </div>
          </div>
          <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: col(c.score) }}
              initial={{ width: 0 }} animate={inView ? { width: `${c.score}%` } : {}}
              transition={{ duration: 0.7, delay: delay + 1.55 + i * 0.12 }} />
          </div>
        </motion.div>
      ))}
      <motion.div className="mt-1 rounded-lg px-2 py-1.5 text-xs"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 1.9 }}>
        Козлов Д. — выявлен недожим в 3 диалогах. Рекомендация готова.
      </motion.div>
    </PreviewShell>
  )
}

// M05 — Обучение: персональные рекомендации
function Module05Preview({ inView, delay = 0 }) {
  const tips = [
    { manager: 'Петров С.', tip: 'Добавьте вопрос о бюджете в 3-е сообщение', impact: '+12% конверсия' },
    { manager: 'Козлов Д.', tip: 'Не закрывайте звонок без следующего шага', impact: '+23% конверсия' },
  ]
  const growth = [
    { name: 'Иванов А.', was: 71, now: 94 },
    { name: 'Петров С.', was: 55, now: 71 },
    { name: 'Козлов Д.', was: 28, now: 28 },
  ]
  return (
    <PreviewShell color="#00C4D4" title="К.А.Р · Персональный разбор" inView={inView} delay={delay}>
      <div className="space-y-1.5 mb-2">
        {growth.map((g, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 1.4 + i * 0.1 }}>
            <span className="text-xs text-slate-400 w-20 shrink-0">{g.name}</span>
            <div className="flex-1 relative h-3 rounded-full bg-slate-800 overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 rounded-full bg-slate-700"
                initial={{ width: 0 }} animate={inView ? { width: `${g.was}%` } : {}}
                transition={{ duration: 0.5, delay: delay + 1.5 + i * 0.1 }} />
              <motion.div className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: g.now > g.was ? 'rgba(0,245,160,0.5)' : 'rgba(239,68,68,0.4)' }}
                initial={{ width: 0 }} animate={inView ? { width: `${g.now}%` } : {}}
                transition={{ duration: 0.8, delay: delay + 1.7 + i * 0.1 }} />
            </div>
            <span className="text-xs font-bold shrink-0" style={{ color: g.now > g.was ? '#00F5A0' : '#EF4444' }}>
              {g.now > g.was ? `+${g.now - g.was}` : '—'}
            </span>
          </motion.div>
        ))}
      </div>
      {tips.map((t, i) => (
        <motion.div key={i} className="rounded-lg px-2 py-1.5"
          style={{ background: 'rgba(0,196,212,0.06)', border: '1px solid rgba(0,196,212,0.15)' }}
          initial={{ opacity: 0, y: 6 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + 1.8 + i * 0.12 }}>
          <p className="text-xs font-semibold text-white mb-0.5">{t.manager}</p>
          <p className="text-xs text-slate-400">{t.tip}</p>
          <p className="text-xs mt-0.5 font-semibold" style={{ color: '#00C4D4' }}>{t.impact}</p>
        </motion.div>
      ))}
    </PreviewShell>
  )
}

// M06 — Автоматические действия: лог за сегодня
function Module06Preview({ inView, delay = 0 }) {
  const actions = [
    { time: '08:00', text: 'Поставлено 12 задач на дожим', color: '#00F5A0', icon: '✓' },
    { time: '09:15', text: 'Напоминание отправлено: Иванов А. — ТОО Астана', color: '#6B8EFF', icon: '↗' },
    { time: '10:40', text: 'Запущен сценарий при бездействии: Козлов Д.', color: '#F59E0B', icon: '⚡' },
    { time: '11:02', text: 'Авто-реакция: просадка Козлов —28 баллов', color: '#EF4444', icon: '!' },
  ]
  return (
    <PreviewShell color="#EF4444" title="К.А.Р · Авто-действия сегодня" inView={inView} delay={delay}>
      {actions.map((a, i) => (
        <motion.div key={i} className="flex items-start gap-2"
          initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 1.4 + i * 0.1 }}>
          <span className="text-xs font-mono text-slate-600 shrink-0 mt-0.5">{a.time}</span>
          <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs"
            style={{ background: `${a.color}18`, color: a.color }}>{a.icon}</div>
          <span className="text-xs text-slate-300 leading-relaxed">{a.text}</span>
        </motion.div>
      ))}
      <motion.div className="text-center text-xs pt-1 font-semibold" style={{ color: '#EF4444' }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 2 }}>
        Всего авто-действий: <span className="text-white">38</span> за сегодня
      </motion.div>
    </PreviewShell>
  )
}

// M07 — Рекрутинг: оценка кандидатов
function Module07Preview({ inView, delay = 0 }) {
  const candidates = [
    { name: 'Ахметов Б.', score: 87, potential: 'Высокий', status: 'pass', fit: 'Рекомендован' },
    { name: 'Смирнова К.', score: 74, potential: 'Средний', status: 'warn', fit: 'На рассмотрении' },
    { name: 'Джаксыбеков Н.', score: 41, potential: 'Низкий', status: 'fail', fit: 'Отклонён' },
  ]
  const col = { pass: '#00F5A0', warn: '#F59E0B', fail: '#EF4444' }
  return (
    <PreviewShell color="#A78BFA" title="К.А.Р · Оценка кандидатов" inView={inView} delay={delay}>
      {candidates.map((c, i) => (
        <motion.div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5"
          style={{ background: `${col[c.status]}06`, border: `1px solid ${col[c.status]}18` }}
          initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 1.45 + i * 0.12 }}>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white">{c.name}</p>
            <p className="text-xs text-slate-500">Потенциал: {c.potential}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-black" style={{ color: col[c.status] }}>{c.score}</p>
            <p className="text-xs" style={{ color: col[c.status] }}>{c.fit}</p>
          </div>
        </motion.div>
      ))}
    </PreviewShell>
  )
}

// M08 — Управление системой: здоровье воронки
function Module08Preview({ inView, delay = 0 }) {
  const metrics = [
    { label: 'Скорость воронки', value: '72%', bar: 72, color: '#34D399' },
    { label: 'Слабый этап: Предложение', value: '31%', bar: 31, color: '#EF4444' },
    { label: 'Выполнение плана', value: '68%', bar: 68, color: '#F59E0B' },
    { label: 'Качество процессов', value: '81%', bar: 81, color: '#34D399' },
  ]
  return (
    <PreviewShell color="#34D399" title="К.А.Р · Здоровье системы продаж" inView={inView} delay={delay}>
      <div className="space-y-2">
        {metrics.map((m, i) => (
          <PreviewRow key={i} label={m.label} value={m.value} color={m.color} bar={m.bar} inView={inView} delay={delay + 1.4 + i * 0.1} />
        ))}
      </div>
      <motion.div className="mt-2 rounded-lg px-2 py-1.5 text-xs"
        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 1.9 }}>
        Рекомендация: усилить этап «Предложение» — здесь теряется 41% лидов
      </motion.div>
    </PreviewShell>
  )
}

// M09 — Визуализация: мини-дашборд
function Module09Preview({ inView, delay = 0 }) {
  const stages = [
    { label: 'Лиды', val: 120, color: '#7B61FF', w: 100 },
    { label: 'В работе', val: 84, color: '#6B8EFF', w: 70 },
    { label: 'Зависших', val: 23, color: '#EF4444', w: 19 },
    { label: 'Закрыто', val: 18, color: '#00F5A0', w: 15 },
  ]
  return (
    <PreviewShell color="#60A5FA" title="К.А.Р · Дашборд воронки" inView={inView} delay={delay}>
      <div className="space-y-2">
        {stages.map((s, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 1.4 + i * 0.1 }}>
            <span className="text-xs text-slate-500 w-16 shrink-0">{s.label}</span>
            <div className="flex-1 h-5 rounded bg-slate-800/60 overflow-hidden">
              <motion.div className="h-full rounded flex items-center px-2"
                style={{ backgroundColor: `${s.color}25`, borderLeft: `2px solid ${s.color}` }}
                initial={{ width: 0 }} animate={inView ? { width: `${s.w}%` } : {}}
                transition={{ duration: 0.8, delay: delay + 1.5 + i * 0.1 }}>
                <span className="text-xs font-semibold" style={{ color: s.color }}>{s.val}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div className="grid grid-cols-2 gap-2 mt-2"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 1.95 }}>
        {[{ l: 'Конверсия', v: '15%', c: '#00F5A0' }, { l: 'Зависших', v: '23', c: '#EF4444' }].map((s) => (
          <div key={s.l} className="rounded-lg px-2 py-1.5 text-center"
            style={{ background: `${s.c}08`, border: `1px solid ${s.c}18` }}>
            <p className="text-base font-black" style={{ color: s.c }}>{s.v}</p>
            <p className="text-xs text-slate-500">{s.l}</p>
          </div>
        ))}
      </motion.div>
    </PreviewShell>
  )
}

// M10 — Контроль без собственника: сводка для владельца
function Module10Preview({ inView, delay = 0 }) {
  const checks = [
    { label: 'Все задачи поставлены', ok: true },
    { label: 'SLA соблюдается: 2/3', ok: false },
    { label: 'План выполнен на 68%', ok: false },
    { label: 'Фейковой активности нет', ok: true },
    { label: 'Слабый этап под контролем', ok: true },
  ]
  return (
    <PreviewShell color="#F472B6" title="К.А.Р · Сводка для собственника" inView={inView} delay={delay}>
      <div className="space-y-1.5">
        {checks.map((c, i) => (
          <motion.div key={i} className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 1.4 + i * 0.1 }}>
            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{ background: c.ok ? 'rgba(0,245,160,0.15)' : 'rgba(239,68,68,0.15)' }}>
              <span className="text-xs" style={{ color: c.ok ? '#00F5A0' : '#EF4444' }}>{c.ok ? '✓' : '!'}</span>
            </div>
            <span className="text-xs" style={{ color: c.ok ? '#94A3B8' : '#F1F5F9' }}>{c.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="mt-3 rounded-xl px-3 py-2.5 text-center"
        style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.2)' }}
        initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 2 }}>
        <p className="text-xs text-slate-400 mb-0.5">Отдел работает без вас</p>
        <p className="text-sm font-black" style={{ color: '#F472B6' }}>Вмешательство не требуется</p>
      </motion.div>
    </PreviewShell>
  )
}

const MODULE_PREVIEWS = {
  '01': (inView, delay) => <Module01Preview inView={inView} delay={delay} />,
  '02': (inView, delay) => <Module02Preview inView={inView} delay={delay} />,
  '03': (inView, delay) => <Module03Preview inView={inView} delay={delay} />,
  '04': (inView, delay) => <Module04Preview inView={inView} delay={delay} />,
  '05': (inView, delay) => <Module05Preview inView={inView} delay={delay} />,
  '06': (inView, delay) => <Module06Preview inView={inView} delay={delay} />,
  '07': (inView, delay) => <Module07Preview inView={inView} delay={delay} />,
  '08': (inView, delay) => <Module08Preview inView={inView} delay={delay} />,
  '09': (inView, delay) => <Module09Preview inView={inView} delay={delay} />,
  '10': (inView, delay) => <Module10Preview inView={inView} delay={delay} />,
}

// ─── Immersive Module Card ────────────────────────────────────────────────────
function ImmersiveModuleCard({ mod, index, fromLeft = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const delay = fromLeft ? 0 : 0.18

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl" style={{ minHeight: 260 }}>

      {/* Curtain reveal overlay */}
      <motion.div
        className="absolute inset-0 z-20 rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${mod.color}22, ${mod.color}08)`, originX: fromLeft ? 0 : 1 }}
        initial={{ scaleX: 1 }}
        animate={inView ? { scaleX: 0 } : {}}
        transition={{ duration: 0.75, delay, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Card body */}
      <motion.div
        className="relative h-full p-6 flex flex-col overflow-hidden"
        style={{
          background: 'rgba(10,16,30,0.95)',
          border: `1px solid ${mod.color}18`,
          borderRadius: 16,
          minHeight: 260,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.55 }}
        whileHover={{ borderColor: `${mod.color}50` }}
      >

        {/* Giant watermark number */}
        <motion.span
          className="absolute right-4 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
          style={{ fontSize: 120, lineHeight: 1, color: mod.color, opacity: 0 }}
          animate={inView ? { opacity: 0.04 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.7 }}
        >
          {mod.num}
        </motion.span>

        {/* Animated top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-2xl">
          <motion.div
            className="h-full"
            style={{ background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)` }}
            initial={{ x: '-100%' }}
            animate={inView ? { x: '100%' } : {}}
            transition={{ duration: 1.2, delay: delay + 0.6, ease: 'easeInOut' }}
          />
        </div>

        {/* Left accent strip */}
        <motion.div
          className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
          style={{ background: `linear-gradient(to bottom, ${mod.color}, ${mod.color}00)` }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.65, ease: 'easeOut' }}
        />

        {/* Icon + meta */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: fromLeft ? -20 : 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.65 }}
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${mod.color}15`, color: mod.color, border: `1px solid ${mod.color}30` }}>
            {mod.icon}
          </div>
          <div>
            <span className="text-xs font-mono tracking-wider" style={{ color: mod.color }}>
              МОДУЛЬ {mod.num}
            </span>
            <h3 className="text-sm font-bold text-white leading-tight">{mod.title}</h3>
          </div>
        </motion.div>

        {/* Features */}
        <ul className="space-y-1.5 flex-1">
          {mod.features.map((f, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2"
              initial={{ opacity: 0, x: fromLeft ? -12 : 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.75 + i * 0.06, ease: 'easeOut' }}
            >
              <motion.span
                className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: mod.color }}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: delay + 0.8 + i * 0.06 }}
              />
              <span className="text-xs text-slate-400 leading-relaxed">{f}</span>
            </motion.li>
          ))}
        </ul>

        {/* Module result preview */}
        {MODULE_PREVIEWS[mod.num]?.(inView, delay)}

        {/* Bottom scan line */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px"
          style={{ background: `${mod.color}30` }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 1.2 }}
        />
      </motion.div>
    </div>
  )
}

// ─── KAR Sphere ──────────────────────────────────────────────────────────────
const SPHERE_TASK_DOTS = [
  { angle: 22,  label: 'Проверка переписок',  color: '#6B8EFF', delay: 0,   dist: 205 },
  { angle: 72,  label: 'Анализ воронки',       color: '#00F5A0', delay: 0.9, dist: 190 },
  { angle: 130, label: 'Дожим лидов',          color: '#F59E0B', delay: 1.8, dist: 198 },
  { angle: 188, label: 'SLA контроль',         color: '#EF4444', delay: 2.7, dist: 185 },
  { angle: 248, label: 'Фейк активность',      color: '#A78BFA', delay: 3.6, dist: 200 },
  { angle: 308, label: 'Подбор кандидатов',    color: '#34D399', delay: 4.5, dist: 188 },
  { angle: 100, label: 'Зависшие сделки',      color: '#F472B6', delay: 5.4, dist: 195 },
  { angle: 228, label: 'Отчёт собственнику',   color: '#60A5FA', delay: 6.3, dist: 182 },
]

function KarSphere() {
  const CYCLE = 7.2
  const DOT_DUR = 2.6

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: 480, height: 480 }}>
      {/* Background glow */}
      <div className="absolute rounded-full pointer-events-none" style={{
        width: 260, height: 260,
        background: 'radial-gradient(circle, rgba(0,245,160,0.12) 0%, transparent 70%)',
        filter: 'blur(24px)',
      }} />

      {/* Sphere wireframe rings */}
      <div className="absolute" style={{ width: 270, height: 95, borderRadius: '50%', border: '1px dashed rgba(0,245,160,0.25)' }} />
      <div className="absolute" style={{ width: 270, height: 95, borderRadius: '50%', border: '1px dashed rgba(123,97,255,0.22)', transform: 'rotate(60deg)' }} />
      <div className="absolute" style={{ width: 95, height: 270, borderRadius: '50%', border: '1px dashed rgba(107,142,255,0.22)' }} />

      {/* Orbiting word: КОНТРОЛЬ — horizontal ellipse */}
      <motion.div
        className="absolute"
        style={{ width: 270, height: 95 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
      >
        <motion.span
          className="absolute font-black text-xs tracking-widest"
          style={{ top: -14, left: '50%', transform: 'translateX(-50%)', color: '#00F5A0', whiteSpace: 'nowrap' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        >
          КОНТРОЛЬ
        </motion.span>
      </motion.div>

      {/* Orbiting word: АНАЛИТИКА — tilted 60° ellipse */}
      <motion.div
        className="absolute"
        style={{ width: 270, height: 95 }}
        initial={{ rotate: 60 }}
        animate={{ rotate: 420 }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
      >
        <motion.span
          className="absolute font-black text-xs tracking-widest"
          style={{ top: -14, left: '50%', transform: 'translateX(-50%)', color: '#7B61FF', whiteSpace: 'nowrap' }}
          initial={{ rotate: -60 }}
          animate={{ rotate: -420 }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        >
          АНАЛИТИКА
        </motion.span>
      </motion.div>

      {/* Orbiting word: РОСТ — vertical ellipse */}
      <motion.div
        className="absolute"
        style={{ width: 95, height: 270 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      >
        <motion.span
          className="absolute font-black text-xs tracking-widest"
          style={{ top: -14, left: '50%', transform: 'translateX(-50%)', color: '#6B8EFF', whiteSpace: 'nowrap' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          РОСТ
        </motion.span>
      </motion.div>

      {/* Task dots flying outward from sphere */}
      {SPHERE_TASK_DOTS.map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180
        const tx = Math.cos(rad) * dot.dist
        const ty = Math.sin(rad) * dot.dist
        return (
          <motion.div
            key={i}
            className="absolute flex items-center gap-1.5 pointer-events-none"
            style={{ left: '50%', top: '50%', marginLeft: -5, marginTop: -5 }}
            animate={{
              x: [0, tx * 0.45, tx, tx],
              y: [0, ty * 0.45, ty, ty],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: DOT_DUR,
              delay: dot.delay,
              repeat: Infinity,
              repeatDelay: CYCLE - DOT_DUR,
              ease: 'easeOut',
              times: [0, 0.3, 0.7, 1],
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: dot.color, boxShadow: `0 0 8px ${dot.color}` }}
            />
            <span
              className="text-xs font-semibold whitespace-nowrap"
              style={{ color: dot.color, textShadow: `0 0 10px ${dot.color}50` }}
            >
              {dot.label}
            </span>
          </motion.div>
        )
      })}

      {/* Center: К.А.Р */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center font-black"
        style={{
          width: 112, height: 112,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00F5A0 0%, #7B61FF 100%)',
          color: '#0A0E1A',
          boxShadow: '0 0 40px rgba(0,245,160,0.35), 0 0 80px rgba(0,245,160,0.12)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span style={{ fontSize: 28, lineHeight: 1 }}>К</span>
        <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.9, letterSpacing: '0.15em', marginTop: 2 }}>А · Р</span>
      </motion.div>
    </div>
  )
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function KarLogo({ size = 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm'
  return (
    <div className="flex items-center gap-2">
      <div className={`${sz} rounded-lg flex items-center justify-center font-black`}
        style={{ background: 'linear-gradient(135deg,#00F5A0,#7B61FF)', color: '#0A0E1A' }}>
        К
      </div>
      <div className="leading-none">
        <span className="font-black text-white tracking-tight" style={{ fontSize: size === 'sm' ? 15 : 17 }}>К.А.Р</span>
        {size !== 'sm' && <p className="text-slate-500 text-xs leading-none mt-0.5">Контроль · Аналитика · Рост</p>}
      </div>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
// ─── Reviews Carousel ────────────────────────────────────────────────────────
const REVIEWS = [
  {
    name: 'Азамат К.',
    role: 'Руководитель отдела продаж, Алматы',
    text: 'Менеджеры забивали CRM как попало — половина сделок висела без статуса неделями. После К.А.Р за первую неделю нашли 23 зависших лида. Закрыли 7 из них.',
    module: 'Контроль CRM',
    color: '#00F5A0',
    stat: { value: 23, label: 'зависших лида найдено', prefix: '' },
  },
  {
    name: 'Дина Р.',
    role: 'Собственник, e-commerce',
    text: 'Я физически не могла слушать все звонки и читать все переписки. К.А.Р делает это за меня и присылает только критичное. Теперь знаю где теряем деньги.',
    module: 'Анализ коммуникации',
    color: '#6B8EFF',
    stat: { value: 3, label: 'часа экономии в день', prefix: '' },
  },
  {
    name: 'Максим Т.',
    role: 'Коммерческий директор, B2B',
    text: 'РОП уволился, продажи не упали. Система сама раздаёт задачи, контролирует скорость ответа и присылает дневной отчёт. Я даже не сразу заметил что его нет.',
    module: 'Контроль без собственника',
    color: '#F472B6',
    stat: { value: 0, label: 'просадки без РОПа', prefix: '' },
  },
  {
    name: 'Сауле Н.',
    role: 'Директор по продажам, недвижимость',
    text: 'Раньше план не выполнялся и никто не понимал почему. К.А.Р показал: 40% лидов умирали на этапе «думает». Настроили дожим — конверсия выросла на 18%.',
    module: 'Управление выручкой',
    color: '#F59E0B',
    stat: { value: 18, label: 'рост конверсии', prefix: '+', suffix: '%' },
  },
  {
    name: 'Тимур А.',
    role: 'CEO, SaaS стартап',
    text: 'Новые менеджеры раньше обучались 2 месяца. Система анализирует их диалоги и даёт персональные подсказки прямо по конкретным сделкам. Теперь выходят на результат за 3 недели.',
    module: 'Обучение и развитие',
    color: '#00C4D4',
    stat: { value: 3, label: 'недели до результата', prefix: '' },
  },
  {
    name: 'Алия М.',
    role: 'Руководитель, розничная сеть',
    text: 'Менеджеры имитировали активность — создавали задачи и сразу закрывали. К.А.Р поймал это за 2 дня. Пришлось провести серьёзный разговор с командой.',
    module: 'Контроль CRM',
    color: '#00F5A0',
    stat: { value: 2, label: 'дня до выявления фрода', prefix: '' },
  },
  {
    name: 'Руслан Б.',
    role: 'Собственник, автодилер',
    text: 'Воронка была чёрным ящиком. Теперь вижу на каком этапе и почему уходят клиенты. Оказалось — проблема в скорости ответа. Сократили с 4 часов до 20 минут.',
    module: 'Аналитика и диагностика',
    color: '#7B61FF',
    stat: { value: 80, label: 'быстрее ответ клиенту', prefix: '', suffix: '%' },
  },
  {
    name: 'Жанна С.',
    role: 'HRD, торговая компания',
    text: 'Подбор менеджеров был лотереей. К.А.Р анализирует тестовые задания и прогнозирует потенциал кандидата. Последние 4 найма — все сильные, никто не ушёл за испытательный срок.',
    module: 'Рекрутинг и подбор',
    color: '#A78BFA',
    stat: { value: 4, label: 'удачных найма подряд', prefix: '' },
  },
  {
    name: 'Ерлан Д.',
    role: 'Партнёр, юридический бизнес',
    text: 'Антикризисный режим сработал когда продажи упали на 30% в декабре. Система сама перестроила приоритеты, сформировала задачи — январь закрыли в плюс.',
    module: 'Управление системой продаж',
    color: '#34D399',
    stat: { value: 30, label: 'падение — закрыли в плюс', prefix: '-', suffix: '%' },
  },
  {
    name: 'Карина В.',
    role: 'Директор, образовательный центр',
    text: 'Отчёты раньше делались вручную и занимали 3 часа. Теперь утром открываю дашборд и за 5 минут понимаю всё что происходит в отделе. Голова свободна для стратегии.',
    module: 'Визуализация и интерфейс',
    color: '#60A5FA',
    stat: { value: 5, label: 'минут на утренний разбор', prefix: '' },
  },
  {
    name: 'Нурлан О.',
    role: 'Собственник, строительная компания',
    text: 'Задачи ставились, но никто их не выполнял вовремя. Автоматические напоминания и реакция на бездействие изменили дисциплину за 2 недели без моего участия.',
    module: 'Автоматические действия',
    color: '#EF4444',
    stat: { value: 2, label: 'недели до смены дисциплины', prefix: '' },
  },
  {
    name: 'Асель Т.',
    role: 'Руководитель продаж, медклиника',
    text: 'Думала что все менеджеры работают одинаково. К.А.Р показал разрыв в 3 раза между лучшим и худшим. Перераспределила лиды — выручка выросла без найма новых людей.',
    module: 'Аналитика и диагностика',
    color: '#7B61FF',
    stat: { value: 3, label: 'кратный разрыв выявлен', prefix: 'x' },
  },
  {
    name: 'Игорь Ф.',
    role: 'COO, логистическая компания',
    text: 'Скрипты устарели, а менеджеры всё равно их не соблюдали. Система анализирует реальные переписки и предлагает улучшенные формулировки. Конверсия переписок +22%.',
    module: 'Анализ коммуникации',
    color: '#6B8EFF',
    stat: { value: 22, label: 'конверсия переписок', prefix: '+', suffix: '%' },
  },
]

function ReviewStat({ stat, color, animKey }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(0)
    if (stat.value === 0) return
    const duration = 1200
    const steps = 40
    const increment = stat.value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [animKey, stat.value])

  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3 mt-1" style={{ background: color + '15', border: `1px solid ${color}33` }}>
      <span className="text-2xl font-bold" style={{ color }}>
        {stat.prefix}{count}{stat.suffix}
      </span>
      <span className="text-slate-400 text-xs leading-tight">{stat.label}</span>
    </div>
  )
}

function ReviewsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = REVIEWS.length

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 4000)
    return () => clearInterval(t)
  }, [paused, total])

  const prev = () => { setPaused(true); setCurrent(c => (c - 1 + total) % total) }
  const next = () => { setPaused(true); setCurrent(c => (c + 1) % total) }

  const visible = [
    REVIEWS[(current - 1 + total) % total],
    REVIEWS[current],
    REVIEWS[(current + 1) % total],
  ]

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00F5A0' }}>Отзывы</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Что говорят клиенты</h2>
          <p className="text-slate-400 mt-3 text-base">Реальные результаты от реальных компаний</p>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Prev */}
          <button onClick={prev} className="hidden md:flex shrink-0 w-10 h-10 rounded-full items-center justify-center border border-slate-700 text-slate-400 hover:border-[#00F5A0] hover:text-[#00F5A0] transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Cards */}
          <div className="flex gap-5 w-full overflow-hidden">
            {visible.map((r, i) => {
              const isCenter = i === 1
              return (
                <div
                  key={r.name + i}
                  className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-500 cursor-pointer"
                  style={{
                    flex: isCenter ? '0 0 calc(50% - 10px)' : '0 0 calc(25% - 10px)',
                    background: isCenter ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                    border: isCenter ? `1px solid ${r.color}44` : '1px solid rgba(255,255,255,0.05)',
                    opacity: isCenter ? 1 : 0.45,
                    transform: isCenter ? 'scale(1)' : 'scale(0.95)',
                    display: i === 0 ? 'none' : 'flex',
                  }}
                  onClick={() => { setPaused(true); setCurrent((current + i - 1 + total) % total) }}
                >
                  {isCenter && (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: r.color + '22', color: r.color }}>{r.module}</span>
                      </div>
                      <p className="text-slate-200 text-base leading-relaxed flex-1">"{r.text}"</p>
                      <div>
                        <p className="text-white font-semibold text-sm">{r.name}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{r.role}</p>
                      </div>
                      <ReviewStat stat={r.stat} color={r.color} animKey={current} />
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, k) => (
                          <svg key={k} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                        ))}
                      </div>
                    </>
                  )}
                  {!isCenter && (
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">"{r.text}"</p>
                  )}
                </div>
              )
            })}
          </div>

          {/* Next */}
          <button onClick={next} className="hidden md:flex shrink-0 w-10 h-10 rounded-full items-center justify-center border border-slate-700 text-slate-400 hover:border-[#00F5A0] hover:text-[#00F5A0] transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Mobile single card */}
        <div className="md:hidden mt-6 rounded-2xl p-6 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid ${REVIEWS[current].color}44` }}>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full self-start" style={{ background: REVIEWS[current].color + '22', color: REVIEWS[current].color }}>{REVIEWS[current].module}</span>
          <p className="text-slate-200 text-base leading-relaxed">"{REVIEWS[current].text}"</p>
          <div>
            <p className="text-white font-semibold text-sm">{REVIEWS[current].name}</p>
            <p className="text-slate-500 text-xs mt-0.5">{REVIEWS[current].role}</p>
          </div>
          <ReviewStat stat={REVIEWS[current].stat} color={REVIEWS[current].color} animKey={current} />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, k) => (
              <svg key={k} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <button onClick={prev} className="text-slate-400 hover:text-white transition-colors cursor-pointer">← Назад</button>
            <span className="text-slate-500 text-sm">{current + 1} / {total}</span>
            <button onClick={next} className="text-slate-400 hover:text-white transition-colors cursor-pointer">Вперёд →</button>
          </div>
        </div>

        {/* Dots */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setPaused(true); setCurrent(i) }}
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? '#00F5A0' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [formData, setFormData] = useState({ name: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = '8706819174:AAFRoPql1o6myD7PnDJOW2RsaBSup4LIwCc'
    const chatId = '1575386160'
    const text = `🚀 Новая заявка с сайта kar-sales.com\n\n👤 Имя: ${formData.name}\n📞 Телефон: ${formData.phone}`
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0E1A', color: '#F1F5F9' }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <KarLogo />
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          {[['#modules', 'Модули'], ['#how', 'Как работает'], ['#results', 'Результаты'], ['#pricing', 'Тарифы']].map(([href, label]) => (
            <a key={href} href={href} className="hover:text-white transition-colors duration-200 cursor-pointer">{label}</a>
          ))}
        </div>
        <a href="#cta" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90"
          style={{ background: '#00F5A0', color: '#0A0E1A' }}>
          Подключить К.А.Р
          <IconArrow />
        </a>
        <button className="md:hidden text-slate-400 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 flex flex-col pt-20 px-6 gap-6"
            style={{ background: 'rgba(10,14,26,0.98)', backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            {[['#modules', 'Модули'], ['#how', 'Как работает'], ['#results', 'Результаты'], ['#pricing', 'Тарифы']].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold text-white border-b border-slate-800 pb-4 cursor-pointer">{label}</a>
            ))}
            <a href="#cta" onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-lg cursor-pointer"
              style={{ background: '#00F5A0', color: '#0A0E1A' }}>
              Подключить К.А.Р
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden grid-bg">
        <ParticlesBg />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,245,160,0.08) 0%, transparent 70%)' }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ background: 'rgba(0,245,160,0.1)', border: '1px solid rgba(0,245,160,0.2)', color: '#00F5A0' }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              >
                <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                Работает с любой CRM · 10 модулей
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              >
                Система{' '}
                <span className="text-glow-green" style={{ color: '#00F5A0' }}>К.А.Р</span>
                {' '}— полный контроль отдела продаж
              </motion.h1>

              <motion.p
                className="text-base text-slate-400 leading-relaxed mb-2"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="text-slate-300 font-medium">Контроль · Аналитика · Рост</span>
              </motion.p>

              <motion.p
                className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              >
                К.А.Р анализирует воронку, контролирует менеджеров и закрывает больше сделок — без выходных, без эмоций, без просадок настроения.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
                <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base cursor-pointer transition-all duration-200 hover:opacity-90 glow-green"
                  style={{ background: '#00F5A0', color: '#0A0E1A' }}>
                  Подключить К.А.Р
                  <IconArrow />
                </a>
                <a href="#modules" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base cursor-pointer transition-all duration-200 hover:border-[#00F5A0] hover:text-[#00F5A0]"
                  style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#CBD5E1' }}>
                  Все 10 модулей
                </a>
              </motion.div>

              <motion.div className="flex items-center gap-4 mt-8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div className="flex -space-x-2">
                  {['#7B61FF', '#00F5A0', '#6B8EFF', '#00C4D4'].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                      style={{ background: c, borderColor: '#0A0E1A', color: '#0A0E1A' }}>
                      {['А', 'М', 'С', 'Д'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">{[1,2,3,4,5].map(i => <IconStar key={i} />)}</div>
                  <p className="text-xs text-slate-400">Уже используют <span className="text-white font-semibold">120+</span> компаний</p>
                </div>
              </motion.div>
            </div>

            {/* Hero funnel */}
            <motion.div className="relative"
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(0,245,160,0.15)', backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">К.А.Р Dashboard</p>
                    <p className="text-sm font-semibold text-white">Воронка продаж · Live</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs"
                    style={{ background: 'rgba(0,245,160,0.1)', color: '#00F5A0' }}>
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00F5A0]"
                      animate={{ opacity: [1,0.3,1] }} transition={{ repeat: Infinity, duration: 1.5 }} />
                    Live
                  </div>
                </div>
                <LiveFunnel interactive={true} />
                <div className="grid grid-cols-3 gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  {[
                    { label: 'Конверсия', value: '18%', color: '#00F5A0' },
                    { label: 'Проблем', value: '3', color: '#EF4444' },
                    { label: 'Задач', value: '12', color: '#7B61FF' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs text-slate-500">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -left-4 rounded-xl px-4 py-3 shadow-xl"
                style={{ background: '#111827', border: '1px solid rgba(0,245,160,0.2)' }}
                animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0,245,160,0.15)' }}>
                    <IconBolt />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">К.А.Р нашёл возможность</p>
                    <p className="text-xs text-slate-400">+12 сделок к закрытию сегодня</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7B61FF' }}>Узнаёте себя?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Почему менеджеры теряют сделки</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <IconAlert />, color: '#EF4444', title: 'Менеджеры теряют сделки', desc: 'Клиент написал — менеджер забыл ответить. Сделка ушла к конкурентам. Никто не заметил.' },
              { icon: <IconEye />, color: '#F59E0B', title: 'РОП не успевает контролировать каждого', desc: 'Руководитель тратит всё время на летучки и отчёты вместо реального контроля воронки.' },
              { icon: <IconChart />, color: '#7B61FF', title: 'Аналитика — мёртвые цифры', desc: 'CRM показывает данные, но не говорит что делать. Отчёты есть, действий — нет.' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group rounded-2xl p-6 h-full cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(17,24,39,0.6)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${card.color}15`, color: card.color, border: `1px solid ${card.color}25` }}>
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 MODULES — IMMERSIVE ── */}
      <section className="py-24 relative overflow-hidden" id="modules">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none grid-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,160,0.06) 0%, transparent 55%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Header */}
          <FadeIn className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <motion.p
                  className="text-sm font-semibold tracking-widest uppercase mb-3"
                  style={{ color: '#00F5A0' }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Полный функционал
                </motion.p>
                <motion.h2
                  className="text-4xl md:text-5xl font-black text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  10 модулей<br />
                  <span style={{ color: '#00F5A0' }}>К.А.Р</span>
                </motion.h2>
              </div>
              <motion.p
                className="text-slate-400 max-w-sm text-sm leading-relaxed md:text-right"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Система <span className="text-white font-semibold">Контроль · Аналитика · Рост</span> —
                полная замена РОПа. Каждый модуль раскрывается по мере прокрутки.
              </motion.p>
            </div>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-8 flex-wrap">
              {MODULES.map((m) => (
                <motion.div
                  key={m.num}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
                  style={{ background: `${m.color}10`, border: `1px solid ${m.color}25`, color: m.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: parseInt(m.num) * 0.05 }}
                >
                  {m.num}
                </motion.div>
              ))}
              <span className="text-slate-600 text-xs ml-1">— прокрутите вниз</span>
            </div>
          </FadeIn>

          {/* Paired rows — immersive reveal */}
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, row) => {
              const left = MODULES[row * 2]
              const right = MODULES[row * 2 + 1]
              return (
                <div key={row} className="grid md:grid-cols-2 gap-4">
                  <ImmersiveModuleCard mod={left} index={row * 2} fromLeft={true} />
                  {right && <ImmersiveModuleCard mod={right} index={row * 2 + 1} fromLeft={false} />}
                </div>
              )
            })}
          </div>

          {/* Summary bar */}
          <motion.div
            className="mt-10 rounded-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: 'rgba(10,16,30,0.95)', border: '1px solid rgba(0,245,160,0.1)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {[
              { value: '10', label: 'модулей', color: '#00F5A0' },
              { value: '60+', label: 'функций', color: '#7B61FF' },
              { value: '24/7', label: 'мониторинг', color: '#6B8EFF' },
              { value: '0', label: 'просадок настроения', color: '#F472B6' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DNA / CREATOR BLOCK ── */}
      <section className="py-24 relative overflow-hidden" id="dna">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(123,97,255,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,245,160,0.05) 0%, transparent 60%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7B61FF' }}>ДНК системы</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
              К.А.Р — это новый стандарт<br />
              <span style={{ color: '#00F5A0' }}>управления продажами.</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              К.А.Р прошёл обучение у <span className="text-white font-semibold">лучших практиков и экспертов мира</span> в области продаж, управления командой и CRM-аналитики — и всё лучшее заложено в одну систему, которая работает 24/7.
            </p>
          </FadeIn>

          {/* Sphere + Facts */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">

            {/* Left: sphere */}
            <FadeIn className="flex justify-center overflow-visible">
              <KarSphere />
            </FadeIn>

            {/* Right: 3 facts */}
            <div className="space-y-5">

              {/* Fact 1 */}
              <FadeIn delay={0.1}>
                <div className="rounded-2xl p-6"
                  style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,245,160,0.18)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,245,160,0.12)', border: '1px solid rgba(0,245,160,0.25)', color: '#00F5A0' }}>
                      <IconAcademic />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5">Обучена у лучших практиков мира</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        К.А.Р впитала опыт и методологии топовых экспертов в области продаж, управления командой и CRM — всё лучшее собрано в одной системе и работает без остановок.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Fact 2 */}
              <FadeIn delay={0.2}>
                <div className="rounded-2xl p-6"
                  style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(123,97,255,0.18)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(123,97,255,0.12)', border: '1px solid rgba(123,97,255,0.25)', color: '#7B61FF' }}>
                      <IconUsers />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5">Полноценная замена РОПа</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        К.А.Р контролирует каждого менеджера, анализирует воронку и ставит конкретные задачи — без выходных, без настроения и без отмазок. Отдел работает даже когда вас нет.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Fact 3 */}
              <FadeIn delay={0.3}>
                <div className="rounded-2xl p-6"
                  style={{ background: 'rgba(13,21,38,0.8)', border: '1px solid rgba(0,196,212,0.18)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,196,212,0.12)', border: '1px solid rgba(0,196,212,0.25)', color: '#00C4D4' }}>
                      <IconBolt />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1.5">Действия, а не отчёты</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Система не просто показывает цифры — она говорит что делать прямо сейчас: кому позвонить, кого дожать, где теряются деньги. Каждое утро менеджеры получают готовый список задач.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>

          {/* Expert skills grid */}
          <FadeIn>
            <div className="mb-6">
              <p className="text-center text-sm text-slate-500 mb-6">К.А.Р владеет навыками всех топовых специалистов</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Системные продажи', color: '#00F5A0' },
                  { name: 'Управление воронкой', color: '#7B61FF' },
                  { name: 'Работа с возражениями', color: '#6B8EFF' },
                  { name: 'Скрипты и диалоги', color: '#F59E0B' },
                  { name: 'Дисциплина и KPI', color: '#34D399' },
                  { name: 'Дожим сделок', color: '#F472B6' },
                  { name: 'Анализ эффективности', color: '#60A5FA' },
                  { name: 'Переговоры', color: '#A78BFA' },
                  { name: 'Методология Ерохина', color: '#00F5A0' },
                  { name: 'Татуировки Батырева', color: '#7B61FF' },
                  { name: 'Управление командой', color: '#F59E0B' },
                  { name: 'CRM-гигиена', color: '#34D399' },
                  { name: 'Антикризисные продажи', color: '#EF4444' },
                  { name: 'Рекрутинг продавцов', color: '#60A5FA' },
                  { name: 'Прогнозирование', color: '#F472B6' },
                ].map((skill, i) => (
                  <motion.div
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-medium cursor-default"
                    style={{ background: `${skill.color}12`, border: `1px solid ${skill.color}25`, color: skill.color }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Big quote */}
          <FadeIn delay={0.2}>
            <div className="relative rounded-3xl p-8 md:p-10 text-center overflow-hidden"
              style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(0,245,160,0.1)' }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,160,0.06) 0%, transparent 60%)' }} />
              <p className="text-4xl text-[#00F5A0] font-black mb-6 opacity-30 leading-none">"</p>
              <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed max-w-3xl mx-auto relative z-10">
                К.А.Р — это идеальный и абсолютный РОП, который никогда не устаёт, не теряет мотивацию и не уходит к конкурентам. Это концентрат лучших практик продаж, упакованный в систему, которая работает за вас.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                  style={{ background: 'linear-gradient(135deg,#00F5A0,#7B61FF)', color: '#0A0E1A' }}>К</div>
                <span className="text-slate-400 text-sm font-medium">Система К.А.Р · Контроль · Аналитика · Рост</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 relative overflow-hidden" id="how">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(123,97,255,0.05) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00F5A0' }}>Как работает</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Запуск за 4 шага</h2>
          </FadeIn>
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,160,0.3) 20%, rgba(123,97,255,0.3) 80%, transparent)' }} />
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: <IconPlug />, step: '01', title: 'Подключение к вашей CRM', desc: 'Интеграция за 15 минут. Без кода и программистов.' },
                { icon: <IconBrain />, step: '02', title: 'К.А.Р анализирует сделки', desc: 'Изучает историю, паттерны и поведение клиентов.' },
                { icon: <IconChart />, step: '03', title: 'Рекомендации каждый день', desc: 'Менеджеры получают конкретные задачи от системы каждое утро.' },
                { icon: <IconEye />, step: '04', title: 'Рост конверсии', desc: 'Вы видите результаты в дашборде в реальном времени.' },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="flex flex-col items-center text-center md:items-start md:text-left">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                        style={{ background: 'rgba(0,245,160,0.1)', border: '1px solid rgba(0,245,160,0.2)', color: '#00F5A0' }}>
                        {s.icon}
                      </div>
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-black flex items-center justify-center"
                        style={{ background: '#7B61FF', color: 'white' }}>{i + 1}</span>
                    </div>
                    <p className="text-xs font-mono text-slate-600 mb-2">{s.step}</p>
                    <h3 className="text-base font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ── */}
      <section className="py-24" id="demo">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00F5A0' }}>Живая система</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Воронка, которая дышит</h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto">К.А.Р мониторит каждую сделку 24/7 и мгновенно реагирует на проблемы</p>
          </FadeIn>
          <FadeIn>
            <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
              style={{ background: 'rgba(13,21,38,0.9)', border: '1px solid rgba(0,245,160,0.12)', backdropFilter: 'blur(12px)' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(0,245,160,0.08) 0%, transparent 70%)' }} />
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <LiveFunnel interactive={true} />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">Система работает прямо сейчас:</h3>
                  {[
                    { color: '#EF4444', text: 'Выявлена «застрявшая» сделка: Ромашка ООО', sub: '5 дней без активности · Этап: Предложение' },
                    { color: '#F59E0B', text: 'Дедлайн сегодня: КП для ИП Петров', sub: 'Менеджер Козлов не отправил материалы' },
                    { color: '#00F5A0', text: 'Рекомендация: позвоните в Технострой', sub: 'Высокая вероятность закрытия (+67%)' },
                    { color: '#7B61FF', text: 'Анализ: потеряли 2 сделки из-за цены', sub: 'Предлагаем готовый скрипт возражений' },
                  ].map((item, i) => (
                    <motion.div key={i}
                      className="flex gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5 + 1 }}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ backgroundColor: item.color }} />
                      <div>
                        <p className="text-sm font-medium text-white">{item.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-24 relative" id="results">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,160,0.04) 0%, transparent 60%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#00F5A0' }}>Результаты</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Цифры за первый месяц</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { prefix: '+', value: '34', suffix: '%', label: 'рост конверсии', sub: 'в среднем за первый месяц', color: '#00F5A0' },
              { prefix: '-', value: '60', suffix: '%', label: 'времени РОПа на рутину', sub: 'больше времени на стратегию', color: '#7B61FF' },
              { prefix: '', value: '24', suffix: '/7', label: 'мониторинг без выходных', sub: 'К.А.Р не болеет и не уходит в отпуск', color: '#6B8EFF' },
            ].map((m, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 cursor-default"
                  style={{ background: 'rgba(17,24,39,0.6)', border: `1px solid ${m.color}20`, backdropFilter: 'blur(12px)' }}>
                  <div className="text-5xl md:text-6xl font-black mb-3" style={{ color: m.color }}>
                    <AnimatedCounter prefix={m.prefix} target={m.value} suffix={m.suffix} />
                  </div>
                  <p className="text-lg font-semibold text-white mb-1">{m.label}</p>
                  <p className="text-sm text-slate-500">{m.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsCarousel />

      {/* ── PRICING ── */}
      <section className="py-24" id="pricing">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#7B61FF' }}>Стоимость</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Один тариф — весь функционал</h2>
            <p className="text-slate-400 mt-3">Тестовая неделя бесплатно — все 10 модулей запускаются сразу</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* Coming soon — Старт */}
            <FadeIn delay={0}>
              <div className="relative rounded-2xl p-6 h-full flex flex-col opacity-40 cursor-not-allowed select-none"
                style={{ background: 'rgba(17,24,39,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-10">
                  <div className="px-4 py-2 rounded-full text-xs font-bold tracking-widest"
                    style={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748B' }}>
                    COMING SOON
                  </div>
                </div>
                <p className="text-sm font-medium mb-1 text-slate-500">Старт</p>
                <p className="text-3xl font-black text-slate-600 mb-6">—</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {['До 3 менеджеров', 'Базовые модули', 'Ежемесячные отчёты'].map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <IconCheckLg />{f}
                    </li>
                  ))}
                </ul>
                <div className="w-full py-3 rounded-xl text-center text-sm text-slate-600"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Скоро
                </div>
              </div>
            </FadeIn>

            {/* MAIN PLAN */}
            <FadeIn delay={0.1}>
              <div className="relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(0,245,160,0.04)', border: '1px solid rgba(0,245,160,0.3)', backdropFilter: 'blur(12px)' }}>
                {/* Top badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap glow-green"
                  style={{ background: '#00F5A0', color: '#0A0E1A' }}>
                  Доступно сейчас
                </div>

                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ boxShadow: ['0 0 0px rgba(0,245,160,0)', '0 0 30px rgba(0,245,160,0.15)', '0 0 0px rgba(0,245,160,0)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="mb-2">
                  <p className="text-sm font-semibold tracking-wide mb-3" style={{ color: '#00F5A0' }}>Полный доступ</p>

                  {/* Free trial — 1st week */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="px-3 py-1 rounded-lg text-sm font-black"
                      style={{ background: 'rgba(0,245,160,0.15)', color: '#00F5A0', border: '1px solid rgba(0,245,160,0.3)' }}>
                      1-я неделя — 0 ₸
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" className="w-4 h-4 shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-3xl font-black text-white leading-none whitespace-nowrap">300 000 ₸</span>
                      <span className="text-slate-400 text-sm font-medium">/мес</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">≈ цена одного менеджера. К.А.Р заменяет целый отдел контроля.</p>
                </div>

                {/* Free trial highlight */}
                <div className="my-4 px-4 py-3 rounded-xl flex items-center gap-3"
                  style={{ background: 'rgba(0,245,160,0.08)', border: '1px solid rgba(0,245,160,0.2)' }}>
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-[#00F5A0] shrink-0"
                    animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <div>
                    <p className="text-sm font-bold text-white">Первая неделя — бесплатно</p>
                    <p className="text-xs text-slate-400">Все 10 модулей активны сразу — без ограничений</p>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-6">
                  {[
                    'Все 10 модулей системы К.А.Р',
                    'Контроль CRM и дисциплины 24/7',
                    'Управление выручкой и дожим',
                    'Аналитика и диагностика воронки',
                    'Анализ переписок и звонков',
                    'Обучение и развитие менеджеров',
                    'Автоматические действия',
                    'Рекрутинг и подбор кандидатов',
                    'Управление системой продаж',
                    'Визуализация и дашборд',
                    'Контроль без участия собственника',
                  ].map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-200">
                      <span className="shrink-0 mt-0.5" style={{ color: '#00F5A0' }}><IconCheckLg /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-center cursor-pointer transition-all duration-200 hover:opacity-90 glow-green block"
                  style={{ background: '#00F5A0', color: '#0A0E1A' }}>
                  Начать бесплатную неделю
                </a>
              </div>
            </FadeIn>

            {/* Coming soon — Премиум */}
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl p-6 h-full flex flex-col opacity-40 cursor-not-allowed select-none"
                style={{ background: 'rgba(17,24,39,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute inset-0 rounded-2xl flex items-center justify-center z-10">
                  <div className="px-4 py-2 rounded-full text-xs font-bold tracking-widest"
                    style={{ background: 'rgba(17,24,39,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748B' }}>
                    COMING SOON
                  </div>
                </div>
                <p className="text-sm font-medium mb-1 text-slate-500">Премиум</p>
                <p className="text-3xl font-black text-slate-600 mb-6">—</p>
                <ul className="space-y-3 flex-1 mb-6">
                  {['Мультиаккаунт', 'Кастомные интеграции', 'Персональный менеджер'].map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <IconCheckLg />{f}
                    </li>
                  ))}
                </ul>
                <div className="w-full py-3 rounded-xl text-center text-sm text-slate-600"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  Скоро
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden" id="cta">
        <div className="absolute inset-0 pointer-events-none grid-bg opacity-50" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,245,160,0.08) 0%, transparent 60%)' }} />
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(0,245,160,0.1)', border: '1px solid rgba(0,245,160,0.2)', color: '#00F5A0' }}>
              <IconBrain />
              Бесплатный аудит воронки
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Получите бесплатный аудит<br />
              <span style={{ color: '#00F5A0' }}>воронки от К.А.Р</span>
            </h2>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              Система К.А.Р проанализирует вашу воронку за 48 часов и покажет, где вы теряете деньги прямо сейчас.
            </p>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <div className="flex-1">
                  <label htmlFor="name" className="sr-only">Ваше имя</label>
                  <input id="name" type="text" placeholder="Ваше имя" required
                    value={formData.name}
                    onChange={e => setFormData(d => ({ ...d, name: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className="sr-only">Телефон</label>
                  <input id="phone" type="tel" placeholder="+7 (999) 000-00-00" required
                    value={formData.phone}
                    onChange={e => setFormData(d => ({ ...d, phone: e.target.value }))}
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>
                <button type="submit"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 hover:opacity-90 glow-green whitespace-nowrap"
                  style={{ background: '#00F5A0', color: '#0A0E1A' }}>
                  Получить аудит
                </button>
              </form>
            ) : (
              <motion.div className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ background: 'rgba(0,245,160,0.15)', border: '2px solid #00F5A0', color: '#00F5A0' }}>
                  <IconCheckLg />
                </div>
                <p className="text-xl font-bold text-white">Заявка принята!</p>
                <p className="text-slate-400">Свяжемся с вами в течение 2 часов</p>
              </motion.div>
            )}
            <p className="text-xs text-slate-600 mt-4">Без спама. Без обязательств. Только результат.</p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <KarLogo size="sm" />
          <p className="text-xs text-slate-600">© 2025 К.А.Р — Контроль · Аналитика · Рост. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors cursor-pointer">Политика конфиденциальности</a>
            <a href="#" className="hover:text-slate-400 transition-colors cursor-pointer">Условия использования</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
