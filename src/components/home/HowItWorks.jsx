// src/components/home/HowItWorks.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useRevealOnScroll from '@/hooks/useRevealOnScroll'
import { FaShieldAlt, FaMapMarkedAlt, FaRobot, FaBell } from 'react-icons/fa'

export default function HowItWorks() {
  const { t } = useTranslation()
  useRevealOnScroll('[data-roadmap-step]')

  const steps = useMemo(() => ([
    { n: 1, icon: <FaShieldAlt className="text-lime-500 text-3xl" />, title: t('home.how.step1.title'), desc: t('home.how.step1.desc'), html: true },
    { n: 2, icon: <FaMapMarkedAlt className="text-lime-500 text-3xl" />, title: t('home.how.step2.title'), desc: t('home.how.step2.desc'), html: true },
    { n: 3, icon: <FaRobot className="text-lime-500 text-3xl" />, title: t('home.how.step3.title'), desc: t('home.how.step3.desc'), html: true },
    { n: 4, icon: <FaBell className="text-lime-500 text-3xl" />, title: t('home.how.step4.title'), desc: t('home.how.step4.desc'), html: true },
  ]), [t])

  // Refs
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const stepRefs = useMemo(() => steps.map(() => React.createRef()), [steps.length])
  const trackRef = useRef(null)

  // State para animación
  const [active, setActive] = useState(0)
  const [dotPositions, setDotPositions] = useState([])     // posiciones Y de cada paso dentro del track
  const [trackHeight, setTrackHeight] = useState(400)      // alto del track (px)
  const [indicatorY, setIndicatorY] = useState(0)          // posición del círculo indicador
  const [fillH, setFillH] = useState(0)                    // altura del “progreso” coloreado

  // Medir posiciones de tarjetas y mapearlas al track lateral
  useEffect(() => {
    const measure = () => {
      if (!listRef.current || !trackRef.current) return

      // Y absoluto (document) del centro de cada tarjeta
      const midsAbs = stepRefs.map(ref => {
        if (!ref.current) return 0
        const r = ref.current.getBoundingClientRect()
        return window.scrollY + r.top + r.height / 2
      })

      const first = midsAbs[0]
      const last = midsAbs[midsAbs.length - 1]
      if (!first || !last) return

      // El track arranca un poco antes del primer mid y acaba un poco después del último
      const padding = 56
      const trackTopAbs = first - padding
      const tHeight = (last - first) + padding * 2
      setTrackHeight(Math.max(320, Math.round(tHeight)))

      // Posiciones relativas (dentro del track)
      const rels = midsAbs.map(y => Math.round(y - trackTopAbs))
      setDotPositions(rels)
    }

    // medir en mount + cambios de layout
    const id = setTimeout(measure, 0)
    measure()
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(id)
      window.removeEventListener('resize', measure)
    }
  }, [steps.length, stepRefs])

  // Scroll spy: detecta paso activo y mueve indicador + fill
  useEffect(() => {
    const onScroll = () => {
      if (!stepRefs.length) return

      // centro de viewport: decide paso activo
      const vc = window.scrollY + window.innerHeight / 2
      const mids = stepRefs.map(ref => {
        if (!ref.current) return 0
        const r = ref.current.getBoundingClientRect()
        return window.scrollY + r.top + r.height / 2
      })

      let best = 0, min = Infinity
      mids.forEach((y, i) => {
        const d = Math.abs(y - vc)
        if (d < min) { min = d; best = i }
      })
      setActive(best)

      // mueve indicador y progreso si ya tenemos posiciones relativas
      if (dotPositions.length) {
        const y = dotPositions[best]
        setIndicatorY(y)
        setFillH(y)
      }
    }

    onScroll()
    const handler = () => window.requestAnimationFrame(onScroll)
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [dotPositions, stepRefs])

  const scrollToStep = (i) => {
    stepRefs[i]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto my-16 max-w-6xl rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 shadow-[0_8px_36px_rgba(0,199,177,0.25)]"
      data-aos="fade-up"
    >
      <h2 className="text-center text-3xl font-black uppercase tracking-[0.1em] text-slate-900 drop-shadow-[0_2px_6px_rgba(0,199,177,0.22)]">
        {t('home.howTitle')}
      </h2>
  
      {/* Layout: timeline lateral + tarjetas */}
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[200px_1fr]">
        {/* ───────── Timeline lateral ───────── */}
        <aside className="relative hidden md:block">
          <div className="sticky top-24">
            <div
              ref={trackRef}
              className="relative select-none"
              style={{ height: `${trackHeight}px` }}
            >
              {/* línea base (detrás) */}
              <div className="absolute left-5 top-0 z-0 h-full w-1 rounded bg-slate-200" />
              {/* progreso (detrás) */}
              <div
                className="absolute left-5 top-0 z-0 w-1 rounded bg-gradient-to-b from-blue-600 to-teal-500 shadow-[0_0_18px_rgba(37,99,235,0.28)] transition-[height] duration-300"
                style={{ height: `${Math.max(0, fillH)}px` }}
              />
              {/* indicador móvil PRINCIPAL (encima) */}
              <div
                className="absolute left-5 -ml-[12px] z-30 h-6 w-6 rounded-full bg-gradient-to-br from-blue-600 to-teal-500
                           shadow-[0_6px_20px_rgba(37,99,235,0.45)] ring-4 ring-blue-300/30 transition-transform duration-300 pointer-events-none"
                style={{ transform: `translateY(${Math.max(0, indicatorY - 12)}px)` }}
                aria-hidden
              />
              {/* puntos fijos + títulos clicables (debajo del indicador) */}
              <ul className="absolute left-8 top-0 z-10 w-[180px] text-sm">
                {steps.map((s, i) => (
                  <li
                    key={i}
                    className="group absolute -translate-y-1/2 cursor-pointer"
                    style={{ top: `${dotPositions[i] || 0}px` }}
                    onClick={() => scrollToStep(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToStep(i)}
                  >
                    {/* dot de cada paso (AMARILLO) */}
                    <span className="absolute -left-8 -top-2 grid h-5 w-5 place-items-center">
                      <span
                        className={`block h-[10px] w-[10px] rounded-full border transition-all
                          ${i < active ? 'bg-amber-400 border-amber-400' : 'bg-white border-slate-300'}
                          ${i === active ? 'bg-white border-amber-500' : ''}
                        `}
                      />
                      {i === active && (
                        <>
                          <span className="absolute h-5 w-5 rounded-full ring-2 ring-amber-500/60" />
                          <span className="pointer-events-none absolute h-6 w-6 rounded-full bg-amber-400/15" />
                        </>
                      )}
                    </span>
  
                    <span className={`font-semibold transition-colors ${i === active ? 'text-slate-900' : 'text-slate-500'}`}>
                      {s.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
  
        {/* ───────── Tarjetas ───────── */}
        <div ref={listRef} className="flex flex-col gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              ref={stepRefs[i]}
              data-roadmap-step
              className={`relative rounded-xl border border-slate-200 bg-slate-900/95 p-6 text-white shadow transition-all duration-300
              ${i === active ? 'ring-2 ring-blue-600/70 scale-[1.01]' : 'opacity-95'}
            `}
            >
              {/* número burbuja */}
              <span className="absolute -left-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-lime-500 bg-slate-50 text-[0.95rem] font-black text-blue-600 shadow-[0_1px_9px_rgba(0,199,177,0.22)]">
                {s.n}
              </span>
  
              <div className="mb-2">{s.icon}</div>
              <b className="mb-1 block text-[1.12rem] font-black tracking-tight text-slate-100">{s.title}</b>
              {s.html
                ? <p className="text-[1rem] font-medium leading-7 text-white" dangerouslySetInnerHTML={{ __html: s.desc }} />
                : <p className="text-[1rem] font-medium leading-7 text-white">{s.desc}</p>}
            </div>
          ))}
        </div>
      </div>
  
      {/* Fallback móvil: línea central sencilla */}
      <div className="mt-6 md:hidden text-center text-xs text-slate-500">
        Swipe/scroll to follow the steps ▼
      </div>
    </section>
  )
  
  
}
