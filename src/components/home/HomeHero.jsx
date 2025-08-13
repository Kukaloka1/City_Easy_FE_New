import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomeHero({ onCTA, isLoading }) {
  const { t } = useTranslation()
  return (
    <section className="relative grid min-h-[74vh] items-center overflow-hidden" data-aos="fade-up">
      
      {/* BG logo izq */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[56vw] flex items-center justify-center">
          <img src="/city.svg" alt="CityEasy Logo" className="w-[70%] opacity-[0.31] -mr-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-end px-4">
        <div className="w-full md:w-[54vw] py-16">
          <h1 className="text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.95] tracking-[-.03em] text-blue-600 drop-shadow-[0_2px_8px_rgba(0,199,177,0.09)]">
            <span className="block">{t('home.hero.title.part1')}</span>{' '}
            <span className="block">{t('home.hero.title.part2')}</span>
            <span className="mt-2 inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-1 text-[0.55em] font-black text-slate-100 shadow-[0_12px_36px_rgba(37,99,235,0.14),0_2px_9px_rgba(37,99,235,1)]">
              {t('home.hero.yellowSubtitle')}
            </span>
          </h1>

          <h2 className="mt-4 text-[clamp(1.3rem,3.2vw,2.07rem)] font-extrabold text-lime-500 tracking-[-0.02em] drop-shadow-[0_1px_5px_rgba(0,199,177,0.2)]">
            {t('home.hero.subtitle')}
          </h2>

          <p className="mt-2 text-[1.05rem] font-medium leading-relaxed text-slate-800"
             dangerouslySetInnerHTML={{ __html: t('home.hero.tagline1') }} />
          <p className="mt-3 text-[1.05rem] font-medium leading-relaxed text-slate-800"
             dangerouslySetInnerHTML={{ __html: t('home.hero.tagline2') }} />

          <button
            onClick={onCTA}
            disabled={isLoading}
            className="mt-6 inline-flex select-none items-center justify-center rounded-md border-2 border-teal-400 bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 text-[1.05rem] font-black uppercase tracking-wider text-white shadow-[0_6px_22px_rgba(30,70,150,0.14)] transition-transform duration-200 hover:scale-105 hover:from-blue-600 hover:to-teal-500"
          >
            {isLoading ? t('home.loading') : t('home.ctaPrimary')}
          </button>
        </div>
      </div>
    </section>
  )
}
