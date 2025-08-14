// src/components/home/HomeFooter.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function HomeFooter(){
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto mt-20 max-w-7xl px-4" role="contentinfo">
      {/* Franja de marcas: logo izq • nav + claim centro • logo der */}
      <div className="grid grid-cols-1 gap-10 py-10 md:grid-cols-3 md:items-start">

        {/* Bittech (izquierda) */}
        <div className="order-1 flex w-full flex-col items-center text-center md:items-center">
          <a
            href="https://www.bittechnetwork.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bittech Network website"
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
          >
            <img src="/bitlogo1.svg" alt="Bittech Network Logo" className="block h-28 w-28 object-contain" />
          </a>
          <p className="mt-2 text-sm font-semibold text-slate-900">Bittech Network UK LLP</p>
          <p className="text-xs text-slate-500">Product &amp; Data Infrastructure</p>
        </div>

        {/* Centro: chips + claim (JUSTO EN EL MEDIO) */}
        <div className="order-2 flex flex-col items-center justify-center text-center">
          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <a
              href="/about"
              className="rounded-full border border-slate-300 px-3.5 py-1.5 text-slate-700 transition
                         hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              {t('home.footer.about')}
            </a>
            <a
              href="/contact"
              className="rounded-full border border-slate-300 px-3.5 py-1.5 text-slate-700 transition
                         hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              {t('home.footer.contact')}
            </a>
            <a
              href="/privacy"
              className="rounded-full border border-slate-300 px-3.5 py-1.5 text-slate-700 transition
                         hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              {t('home.footer.privacy')}
            </a>
            <a
              href="/terms"
              className="rounded-full border border-slate-300 px-3.5 py-1.5 text-slate-700 transition
                         hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50"
            >
              {t('home.footer.terms')}
            </a>
          </nav>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            © {year} CityEasy – Smart Urban Safety for Southeast Asia
          </p>
        </div>

        {/* CityEasy (derecha) */}
        <div className="order-3 flex w-full flex-col items-center text-center md:items-center">
          <img src="/city.svg" alt="CityEasy logo" className="block h-28 w-28 object-contain" />
          <div className="mt-2 text-sm font-semibold text-slate-900">CityEasy.org</div>
          <div className="text-xs text-slate-500">A Bittech Network UK LLP product</div>
        </div>
      </div>

      {/* Legal inferior */}
      <div className="border-t border-slate-200 py-4">
        <p className="text-center text-xs text-slate-500">
          © {year} Bittech Network UK LLP · All rights reserved
        </p>
      </div>
    </footer>
  )
}


