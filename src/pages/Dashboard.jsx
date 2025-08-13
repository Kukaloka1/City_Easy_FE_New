import React from 'react'
import { useTranslation } from 'react-i18next'
import { cityList } from '@/cities/config'
import CityCard from '@/components/city/CityCard'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const { t } = useTranslation()
  const nav = useNavigate()

  const onCitySelect = (slug) => nav(`/city/${slug}`)

  return (
    <div className="min-h-screen bg-[#f8fafd] py-14">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center px-3">
        <h1 className="mb-3 text-center text-[3.2rem] font-black leading-none tracking-[-0.03em] text-[#101828]">
          <span dangerouslySetInnerHTML={{ __html: t('dashboard.title') }} />
        </h1>
        <p className="mb-10 text-center text-[1.25rem] font-semibold text-[#474a53]">
          {t('dashboard.subtitle.line1')}<br />{t('dashboard.subtitle.line2')}
        </p>

        <div className="grid w-full max-w-[1100px] grid-cols-1 justify-items-center gap-y-8 gap-x-9 sm:grid-cols-2 md:grid-cols-3">
          {cityList.map((city)=>(
            <CityCard key={city.slug} city={city} onClick={onCitySelect} />
          ))}
        </div>

        <div className="mt-8 text-center text-[1.11rem] text-[#6d7e88]">
          <span dangerouslySetInnerHTML={{ __html: t('dashboard.contact') }} />
        </div>
      </div>
    </div>
  )
}
