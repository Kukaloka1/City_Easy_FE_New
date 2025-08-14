import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProblemSolution() {
  const { t } = useTranslation()

  const problems = [t('home.gapLi1'), t('home.gapLi2'), t('home.gapLi3')]
  const solutionKeys = ['home.solutionLi1', 'home.solutionLi2', 'home.solutionLi3']

  return (
    <section
      className="relative mx-auto my-16 max-w-7xl px-4"
      data-aos="fade-up"
    >
      {/* marco suave y coherente con el hero */}
      <div className="rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_22px_60px_rgba(2,6,23,0.08)] backdrop-blur sm:p-10">
        <div className="grid gap-6 md:grid-cols-2">
          {/* PROBLEMA */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_10px_36px_rgba(2,6,23,0.06)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-rose-50/60 px-3 py-1 text-[0.78rem] font-semibold text-rose-700">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              {t('home.gapTitle')}
            </div>

            <h3 className="relative mt-3 text-[1.6rem] font-black tracking-[-0.02em] text-slate-900">
              {t('home.gapSubtitle')}
              <span aria-hidden className="accent-underline-thin absolute -bottom-2 left-0 h-1 w-40 rounded-full" />
            </h3>

            <ul className="mt-6 space-y-3">
              {problems.map((item, i) => (
                <li key={i} className="relative pl-6">
                  <span className="absolute left-0 top-[0.62rem] h-2 w-2 rounded-full bg-rose-500 ring-4 ring-rose-100/70" />
                  <span className="text-[1.03rem] font-semibold text-slate-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* SOLUCIÓN */}
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_10px_36px_rgba(2,6,23,0.06)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-emerald-50/70 px-3 py-1 text-[0.78rem] font-semibold text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {t('home.solutionTitle')}
            </div>

            <h3 className="relative mt-3 text-[1.6rem] font-black tracking-[-0.02em] text-slate-900">
              {t('home.solutionSubtitle')}
              <span aria-hidden className="accent-underline-thin absolute -bottom-2 left-0 h-1 w-48 rounded-full" />
            </h3>

            <ul className="mt-6 space-y-3">
              {solutionKeys.map((k) => (
                <li key={k} className="relative pl-7">
                  {/* check SVG sin dependencias */}
                  <span className="absolute left-0 top-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-emerald-100/80">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
                      <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z" />
                    </svg>
                  </span>
                  <span
                    className="text-[1.03rem] font-semibold text-slate-800"
                    dangerouslySetInnerHTML={{ __html: t(k) }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MISIÓN */}
        <div className="mt-10 text-center">
          <h4 className="text-xs font-black uppercase tracking-[0.28em] text-emerald-600">
            {t('home.missionTitle')}
          </h4>
          <p className="mx-auto mt-3 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">
            {t('home.missionP1')}
          </p>
          <p className="mx-auto mt-2 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">
            {t('home.missionP2')}
          </p>
        </div>
      </div>
    </section>
  )
}

