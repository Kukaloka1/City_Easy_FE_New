import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaMapMarkedAlt, FaRobot, FaBell, FaGlobeAsia } from 'react-icons/fa'

// Paleta Google + color base (azul original de tus cards)
const GCOLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853']
const BASE_COLOR = '#2563eb' // blue-600

/** Dispara la animación cada vez que el elemento entra en viewport (subiendo o bajando) */
function useEnterViewportTrigger(ref, threshold = 0.35) {
  const [triggerKey, setTriggerKey] = React.useState(0)
  React.useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setTriggerKey(k => k + 1) }),
      { threshold }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, threshold])
  return triggerKey
}

/** Ícono que rota una vez y cicla por los colores Google, luego vuelve al color base */
function AnimatedIcon({ Icon, triggerKey }) {
  const [spin, setSpin] = React.useState(false)
  const [color, setColor] = React.useState(BASE_COLOR)

  React.useEffect(() => {
    if (!triggerKey) return
    setSpin(true)

    // Secuencia: 4 colores Google + base + base
    let step = 0
    const seq = [...GCOLORS, BASE_COLOR, BASE_COLOR]
    setColor(seq[0])

    const iv = setInterval(() => {
      step += 1
      setColor(seq[step] ?? BASE_COLOR)
      if (step >= seq.length - 1) clearInterval(iv)
    }, 140)

    const to = setTimeout(() => setSpin(false), 900) // ~1 vuelta

    return () => { clearInterval(iv); clearTimeout(to) }
  }, [triggerKey])

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full p-1.5 ${spin ? 'hiw-spin-once hiw-icon-glow' : ''}`}
      style={{ color }}
      aria-hidden="true"
    >
      <Icon className="h-9 w-9" />
    </span>
  )
}

function FeatureCard({ Icon, title, desc, html }) {
  const ref = React.useRef(null)
  const triggerKey = useEnterViewportTrigger(ref)

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur"
    >
      <div className="mb-3">
        <AnimatedIcon Icon={Icon} triggerKey={triggerKey} />
      </div>
      <h4 className="text-[1.12rem] font-black tracking-tight text-slate-900">{title}</h4>
      {html ? (
        <p
          className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      ) : (
        <p className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600">{desc}</p>
      )}
    </div>
  )
}

const items = (t) => ([
  { Icon: FaShieldAlt,   title: t('home.features.card1.title'), desc: t('home.features.card1.desc'), html: true },
  { Icon: FaMapMarkedAlt, title: t('home.features.card2.title'), desc: t('home.features.card2.desc'), html: true },
  { Icon: FaBell,        title: t('home.features.card3.title'), desc: t('home.features.card3.desc'), html: true },
  { Icon: FaRobot,       title: t('home.features.card4.title'), desc: t('home.features.card4.desc'), html: true },
  { Icon: FaBell,        title: t('home.features.card5.title'), desc: t('home.features.card5.desc'), html: true },
  { Icon: FaGlobeAsia,   title: t('home.features.card6.title'), desc: t('home.features.card6.desc'), html: true },
])

export default function FeaturesGrid(){
  const { t } = useTranslation()
  const list = items(t)
  return (
    <section className="mx-auto my-14 max-w-6xl px-4" data-aos="fade-up">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  )
}

