// src/components/home/CtaBanner.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CtaBanner({ onCTA, isLoading }) {
  const { t } = useTranslation()

  return (
    <section
      className="relative mx-auto my-16 max-w-3xl"
      data-aos="fade-up"
    >
      {/* Borde degradado */}
      <div className="relative overflow-hidden rounded-3xl p-[0px] bg-gradient-to-r from-[#2563eb] via-[#00C7B1] to-[#2563eb] shadow-[0_14px_50px_rgba(37,99,235,0.25),0_6px_20px_rgba(0,199,177,0.25)]">
        {/* Card glass interior */}
        <div className="relative rounded-[calc(1.5rem-2px)] bg-gradient-to-br from-[#2563eb] to-[#0ea5a3]">
          {/* Overlay vidrio para legibilidad */}
          <div className="relative z-10 rounded-[calc(1.5rem-2px)] bg-white/5 backdrop-blur-md px-8 py-10 text-center text-white">
            <h2 className="text-2xl md:text-[2rem] font-black uppercase tracking-[0.15em] drop-shadow-[0_3px_18px_rgba(0,0,0,0.28)]">
              {t('home.ctaBlockTitle')}
            </h2>

            <button
              onClick={onCTA}
              disabled={isLoading}
              className="group relative mt-6 inline-flex items-center justify-center gap-3 rounded-xl border-2 border-white/90 bg-white px-7 py-3
                         text-[1.05rem] font-black uppercase tracking-wide text-blue-700 transition
                         hover:text-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {/* Shine */}
              <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                <span className="absolute -left-full top-0 h-full w-1/3 rotate-12 bg-white/40 blur-sm transition-all duration-500 group-hover:left-full" />
              </span>

              {/* Spinner cuando isLoading */}
              {isLoading && (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
              )}

              <span>{isLoading ? t('home.loading') : t('home.ctaBlockBtn')}</span>
            </button>
          </div>

          {/* Blobs decorativos */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
        </div>
      </div>

      {/* Ola inferior (sutil) */}
      <div className="pointer-events-none absolute -bottom-8 left-1/2 h-[70px] w-[120%] -translate-x-1/2 opacity-90">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <path fill="#f7fafc" fillOpacity="1" d="M0,288L1440,96L1440,320L0,320Z" />
        </svg>
      </div>
    </section>
  )
}

