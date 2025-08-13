import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomeFooter(){
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto my-12 max-w-7xl px-4" role="contentinfo">
      {/* Hairline superior */}
      <div aria-hidden className="mb-2 h-[2px] w-full rounded-full bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />

      <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-md shadow-[0_10px_40px_rgba(16,185,129,0.10)]">
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 md:px-8 md:py-7">
          {/* Columna izquierda: Bittech (texto debajo del logo) */}
          <div className="flex flex-col items-center">
            <a
              href="https://www.bittechnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Bittech Network website"
            >
              <img src="/bitlogo1.svg" alt="Bittech Network Logo" className="h-28 w-28 object-contain" />
            </a>
            <p className="mt-2 text-sm font-semibold text-slate-800">Bittech Network UK LLP</p>
            <p className="text-xs text-slate-500">Product &amp; Data Infrastructure</p>
          </div>

          {/* Columna centro: enlaces y, debajo, el claim con © */}
          <div className="flex flex-col items-center text-center">
            <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-2 text-[0.95rem] font-semibold">
              <a className="text-emerald-600 underline underline-offset-4" href="/about">{t('home.footer.about')}</a>
              <span className="text-slate-300">·</span>
              <a className="text-emerald-600 underline underline-offset-4" href="/contact">{t('home.footer.contact')}</a>
              <span className="text-slate-300">·</span>
              <a className="text-emerald-600 underline underline-offset-4" href="/privacy">{t('home.footer.privacy')}</a>
              <span className="text-slate-300">·</span>
              <a className="text-emerald-600 underline underline-offset-4" href="/terms">{t('home.footer.terms')}</a>
            </nav>

            {/* Claim debajo de los links (como pediste) */}
            <p className="mt-3 text-[0.95rem] font-semibold text-slate-700">
              © {year} CityEasy – Smart Urban Safety for Southeast Asia
            </p>
          </div>

          {/* Columna derecha: CityEasy con texto debajo del logo */}
          <div className="flex flex-col items-center md:items-end">
            <img src="/city.svg" alt="CityEasy logo" className="h-28 w-28 object-contain" />
            <div className="mt-1 text-sm font-semibold text-slate-800">CityEasy.org</div>
            <div className="text-xs text-slate-500">A Bittech Network UK LLP product</div>
          </div>
        </div>

        {/* Única línea legal (sin repeticiones) */}
        <div className="border-t border-slate-200/60 px-6 py-3 text-center text-xs text-slate-500 md:px-8">
          © {year} Bittech Network UK LLP · All rights reserved
        </div>
      </div>
    </footer>
  )
}
