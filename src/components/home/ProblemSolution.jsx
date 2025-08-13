import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProblemSolution(){
  const { t } = useTranslation()
  return (
    <section className="mx-auto my-16 max-w-6xl rounded-2xl border border-white/60 bg-white/60 p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,.15)] backdrop-blur md:grid md:grid-cols-2 md:gap-6" data-aos="fade-up">
      <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
        <h3 className="mb-4 text-[1.4rem] font-black uppercase tracking-tight">{t('home.gapTitle')}</h3>
        <ul className="space-y-3">
          <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">{t('home.gapLi1')}</li>
          <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">{t('home.gapLi2')}</li>
          <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">{t('home.gapLi3')}</li>
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur md:mt-0">
        <h3 className="mb-4 text-[1.4rem] font-black uppercase tracking-tight">{t('home.solutionTitle')}</h3>
        <ul className="space-y-3">
          <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi1') }} />
          <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi2') }} />
          <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi3') }} />
        </ul>
      </div>

      <div className="col-span-2 mt-8 text-center">
        <h4 className="text-[1.2rem] font-black uppercase tracking-widest text-lime-500">{t('home.missionTitle')}</h4>
        <p className="mx-auto mt-3 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">{t('home.missionP1')}</p>
        <p className="mx-auto mt-2 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">{t('home.missionP2')}</p>
      </div>
    </section>
  )
}
