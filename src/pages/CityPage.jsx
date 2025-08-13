import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cities } from '@/cities/config'
import MapPlaceholder from '@/features/map/MapPlaceholder'

export default function CityPage(){
  const { slug } = useParams()
  const { t } = useTranslation()
  const city = useMemo(()=> cities[slug], [slug])

  if(!city){
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">City not found</h1>
        <p className="mt-2 text-slate-600">The city “{slug}” is not configured yet.</p>
        <Link to="/dashboard" className="mt-4 inline-block rounded-lg border px-4 py-2 font-semibold hover:bg-slate-50">← Back to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/dashboard" className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50">← {t('bali.changeCity')}</Link>
        <div className="flex items-center gap-2">
          {city.features.surf && (
            <a href="#surf" className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">AI Surf</a>
          )}
          <a href="#report" className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">{t('bali.buttons.report')}</a>
        </div>
      </div>

      <header className="mb-6">
        <h1 className="text-3xl font-extrabold" dangerouslySetInnerHTML={{ __html: t('bali.header.title') }} />
        <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('bali.header.subtitle') }} />
      </header>

      {/* Mapa */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t('bali.sections.mapTitle')}</h2>
        <MapPlaceholder city={city} />
      </section>

      {/* Summary / Recent (placeholders) */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="text-lg font-bold">{t('bali.sections.summaryTitle')}</h3>
          <p className="mt-2 text-slate-500">AI summary every 15 min will show here.</p>
        </div>
        <div className="rounded-xl border bg-white p-4">
          <h3 className="text-lg font-bold">{t('bali.sections.recentTitle')}</h3>
          <p className="mt-2 text-slate-500">Recent incidents list will show here.</p>
        </div>
      </section>

      {/* Surf only if enabled */}
      {city.features.surf && (
        <section id="surf" className="mt-8 rounded-xl border bg-white p-4">
          <h3 className="text-lg font-bold">{t('surf.title')}</h3>
          <p className="mt-2 text-slate-500">{t('surf.hint')}</p>
        </section>
      )}
    </div>
  )
}
