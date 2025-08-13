import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CtaBanner({ onCTA, isLoading }) {
  const { t } = useTranslation()
  return (
    <section className="relative mx-auto my-16 max-w-xl overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-600 p-8 text-center text-white shadow-[0_6px_24px_rgba(0,199,177,0.31)]" data-aos="fade-up">
      <h2 className="text-2xl font-black uppercase tracking-wider">{t('home.ctaBlockTitle')}</h2>
      <button
        onClick={onCTA}
        disabled={isLoading}
        className="mt-4 inline-block rounded-md border-2 border-white bg-white px-6 py-3 text-[1.05rem] font-black uppercase tracking-wide text-blue-600 transition hover:bg-teal-500 hover:text-white"
      >
        {isLoading ? t('home.loading') : t('home.ctaBlockBtn')}
      </button>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-[90px] w-[120%] -translate-x-1/2">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <path fill="#f7fafc" fillOpacity="1" d="M0,288L1440,96L1440,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  )
}
