import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomeFooter(){
  const { t } = useTranslation()
  return (
    <footer className="mx-auto my-12 flex max-w-5xl items-center justify-between gap-6 rounded-t-2xl border-t-2 border-slate-200 bg-[#F5FAFB] p-6 shadow-[0_0_44px_rgba(0,199,177,0.13)]">
      <a href="https://www.bittechnetwork.com" target="_blank" rel="noopener noreferrer">
        <img src="/bitlogo1.svg" alt="Bittech Network Logo" className="h-28 w-28 object-contain" />
      </a>
      <div className="flex flex-1 flex-col items-center gap-3 text-center">
        <div className="text-[1.05rem] font-bold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.footer.brand') }} />
        <div className="flex flex-wrap items-center justify-center gap-2 text-[1.05rem] font-bold">
          <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/about">{t('home.footer.about')}</a><span className="text-slate-300">·</span>
          <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/contact">{t('home.footer.contact')}</a><span className="text-slate-300">·</span>
          <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/privacy">{t('home.footer.privacy')}</a><span className="text-slate-300">·</span>
          <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/terms">{t('home.footer.terms')}</a>
        </div>
        <div className="text-lime-500" dangerouslySetInnerHTML={{ __html: t('home.footer.credit') }} />
      </div>
      <div className="flex flex-col items-center">
        <img src="/city.svg" alt="CityEasy Logo" className="h-28 w-28 object-contain" />
        <div className="text-sm font-semibold text-slate-600">CityEasy.org</div>
      </div>
    </footer>
  )
}
