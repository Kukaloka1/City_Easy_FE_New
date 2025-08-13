import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CityCard({ city, onClick }) {
  const { t } = useTranslation()
  const disabled = !city.active

  return (
    <button
      onClick={() => !disabled && onClick?.(city.slug)}
      disabled={disabled}
      className={[
        'flex w-[210px] min-h-[312px] flex-col items-center rounded-2xl border-[2.8px] bg-white px-4 py-5',
        'transition will-change-transform shadow-[0_6px_32px_rgba(0,199,177,0.15)]',
        disabled
          ? 'opacity-60 cursor-not-allowed grayscale-[0.35] border-dashed shadow-none'
          : 'hover:-translate-y-[7px] hover:scale-[1.045] hover:shadow-[0_12px_56px_rgba(0,199,177,0.23)]',
      ].join(' ')}
      style={{ borderColor: city.brandColor }}
      aria-disabled={disabled}
    >
      <div className="h-[110px] w-[110px] mb-4 grid place-items-center">
        <img
          src={`/${city.slug}.svg`}
          alt={city.name}
          className="h-full w-full object-contain rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.07)]"
        />
      </div>
      <div className="text-[1.32em] font-extrabold text-[#1e374a] tracking-[-0.03em]">{city.name}</div>
      <div className="text-[1.02em] font-semibold" style={{ color: city.brandColor }}>
        {t(city.sloganKey)}
      </div>
      <div className="text-[0.98em] text-[#71797f]">{city.country}</div>

      {disabled && (
        <span className="mt-3 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
          Coming soon
        </span>
      )}
    </button>
  )
}
