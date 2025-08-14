// src/components/home/CitiesGrid.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CITIES } from '@/data/cities'

export default function CitiesGrid(){
  const { t } = useTranslation()
  return (
    <section className="mx-auto my-16 max-w-6xl px-4" data-aos="zoom-in">
      <h2 className="text-center text-3xl font-black uppercase tracking-tight text-slate-900 drop-shadow-[0_2px_6px_rgba(0,199,177,0.3)]">
        {t('home.citiesTitle')}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-[1.05rem] font-semibold leading-relaxed text-slate-600">
        {t('home.citiesDesc1')}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map(city => (
          <div key={city.name} className="flex flex-col items-center">
            {/* SVG/imagen ligeramente más grande */}
            <div className="relative mb-6 h-48 w-48 sm:h-52 sm:w-52 md:h-56 md:w-56">
              <img
                src={city.img}
                alt={`${city.name} icon`}
                className="h-full w-full object-contain transition duration-300"
                loading="lazy"
              />
            </div>

            {/* Mantiene un leve overlap, equilibrado para el nuevo tamaño */}
            <div className="relative -mt-6 sm:-mt-7 md:-mt-8 w-full max-w-xs rounded-2xl border border-white/60 bg-white/70 p-5 text-center shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
              <span className="text-[1.2rem] font-black uppercase tracking-wide text-slate-900">
                {city.name}
              </span>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                {t(city.descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

