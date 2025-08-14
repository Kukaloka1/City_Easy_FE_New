import React from 'react'
import { useTranslation } from 'react-i18next'

// Dentro de HomeHero.jsx
const CITY_SVGS = ['/bali.svg', '/jakarta.svg', '/bangkok.svg', '/danang.svg', '/singapore.svg', '/kl.svg']
const ROTATE_MS = 4000   // cambia de ciudad cada 4s
const FADE_MS = 1200   // crossfade 1.2s
const SHOW_BLOBS = false

function RotatingCityLogos() {
  const [idx, setIdx] = React.useState(0)
  const [cycleGlow, setCycleGlow] = React.useState(false)

  // Preload (sin parpadeos)
  React.useEffect(() => {
    CITY_SVGS.forEach(src => { const i = new Image(); i.src = src })
  }, [])

  // Avance cíclico
  React.useEffect(() => {
    const step = setInterval(() => setIdx(i => (i + 1) % CITY_SVGS.length), ROTATE_MS)
    return () => clearInterval(step)
  }, [])

  // Glow muy sutil al cerrar el carrusel (reinicio elegante)
  React.useEffect(() => {
    const CYCLE_MS = CITY_SVGS.length * ROTATE_MS
    const tick = () => {
      setCycleGlow(true)
      setTimeout(() => setCycleGlow(false), 220)
    }
    const id = setInterval(tick, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />

      {/* Stack de SVGs con crossfade + Ken Burns sutil (sin rotación de reloj) */}
      <div className="absolute left-[-6%] top-1/2 hidden h-[80vh] w-[44vw] -translate-y-1/2 md:block" style={{ '--fade-ms': `${FADE_MS}ms` }}>
        {CITY_SVGS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className={`ce-logoKB absolute inset-0 w-full object-contain ${i === idx ? 'is-active' : ''}`}
          />
        ))}
      </div>

      {/* Velo suave al cerrar vuelta (elimina cualquier “seam”) */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-200 ${cycleGlow ? 'opacity-[0.06]' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(2,6,23,0.40) 0%, rgba(2,6,23,0.0) 60%)' }}
      />

      {SHOW_BLOBS && (
        <>
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-300/40 to-blue-400/40 blur-3xl" />
          <div className="absolute -right-24 bottom-[-4rem] h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/40 to-emerald-300/40 blur-3xl" />
        </>
      )}
    </div>
  )
}


export default function HomeHero({ onCTA, isLoading }) {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden" data-aos="fade-up">
      {/* BG animado con ciudades */}
      <RotatingCityLogos />

      {/* Contenido */}
      <div className="relative z-10 mx-auto grid min-h-[72vh] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2">
        {/* Texto principal */}
        <div>
          {/* Badge micro */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-[0.78rem] font-semibold text-slate-700 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            CityEasy — {t('home.hero.badge', { defaultValue: 'Real-time urban safety' })}
          </div>

          {/* Título negro con presencia + subrayado animado */}
          <h1 className="mt-3 text-[clamp(2.3rem,6vw,4.6rem)] font-black leading-[1.02] tracking-[-0.015em] text-slate-900">
            <span className="block">{t('home.hero.title.part1')}</span>
            <span className="relative block">
              {t('home.hero.title.part2')}
              <span aria-hidden className="accent-underline absolute -bottom-2 left-0 h-2 w-full rounded-full" />
            </span>
          </h1>

          {/* Subtítulo + chip */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h2 className="text-[clamp(1.1rem,2.5vw,1.65rem)] font-extrabold text-slate-700">
              {t('home.hero.subtitle')}
            </h2>
            <span className="rounded-full border border-emerald-600/20 bg-emerald-600/10 px-3 py-1 text-xs font-black tracking-wider text-emerald-700">
              {t('home.hero.yellowSubtitle')}
            </span>
          </div>

          {/* Taglines */}
          <p
            className="mt-4 max-w-prose text-[1.04rem] leading-relaxed text-slate-800"
            dangerouslySetInnerHTML={{ __html: t('home.hero.tagline1') }}
          />
          <p
            className="mt-2 max-w-prose text-[1.04rem] leading-relaxed text-slate-800"
            dangerouslySetInnerHTML={{ __html: t('home.hero.tagline2') }}
          />

          {/* CTA sólida */}
          <button
            onClick={onCTA}
            disabled={isLoading}
            className="mt-6 inline-flex select-none items-center justify-center rounded-xl border border-slate-300 bg-slate-900 px-8 py-4 text-[1.05rem] font-bold text-white shadow-[0_14px_40px_rgba(2,6,23,0.18)] active:scale-[0.98] disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" className="opacity-25" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M4 12a8 8 0 018-8" className="opacity-75" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                {t('home.loading')}
              </span>
            ) : (
              t('home.ctaPrimary')
            )}
          </button>

          {/* Bullets mini */}
          <ul className="mt-4 flex flex-wrap gap-3 text-sm text-slate-700">
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t('home.hero.point1', { defaultValue: 'Anonymous reports' })}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              {t('home.hero.point2', { defaultValue: 'Live map & alerts' })}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              {t('home.hero.point3', { defaultValue: 'AI safety summaries' })}
            </li>
          </ul>
        </div>

        {/* Snapshot derecha */}
        <div>
          <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_10px_40px_rgba(2,6,23,0.06)] backdrop-blur-md md:ml-auto">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[0.8rem] font-semibold text-slate-600">Live snapshot</span>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  {t('home.hero.badge', { defaultValue: 'Real-time' })}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <div className="text-xs font-semibold text-slate-500">{t('home.hero.metric1', { defaultValue: 'Cities' })}</div>
                  <div className="text-lg font-black text-slate-900">6</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <div className="text-xs font-semibold text-slate-500">{t('home.hero.metric2', { defaultValue: 'Reports/day' })}</div>
                  <div className="text-lg font-black text-slate-900">120+</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                  <div className="text-xs font-semibold text-slate-500">{t('home.hero.metric3', { defaultValue: 'Response' })}</div>
                  <div className="text-lg font-black text-slate-900">~15m</div>
                </div>
              </div>
            </div>

            <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white/60">
              <img src="/city.svg" alt="CityEasy" className="h-full w-full scale-[1.2] object-contain opacity-[0.18]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

