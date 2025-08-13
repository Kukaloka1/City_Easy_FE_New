import React, { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cities } from '@/cities/config'
import { getRecentIncidents } from '@/features/incidents/api'
import IncidentSummary from '@/features/incidents/IncidentSummary'
import RecentIncidents from '@/features/incidents/RecentIncidents'
import SurfWidget from '@/features/surf/SurfWidget'
import TutorialSlider from '@/features/tutorial/TutorialSlider'
import MapPlaceholder from '@/features/map/MapPlaceholder'

export default function CityPage(){
  const { slug } = useParams()
  const { t } = useTranslation()
  const city = useMemo(()=> cities[slug], [slug])
  const [showTutorial, setShowTutorial] = useState(false)
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    if(!city) return
    let cancelled = false
    async function load(){
      try{
        setLoading(true); setError(null)
        const items = await getRecentIncidents(city.slug, 20)
        if(!cancelled) setIncidents(items)
      }catch(e){ if(!cancelled) setError(e.message) }
      finally{ if(!cancelled) setLoading(false) }
    }
    load()
    const id = setInterval(load, 5*60*1000) // refresh cada 5 min
    return ()=>{ cancelled = true; clearInterval(id) }
  }, [city])

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
          <button onClick={()=> setShowTutorial(true)} className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">
            {t('bali.buttons.tutorial')}
          </button>
          {city.features.surf && (
            <a href="#surf" className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">AI Surf</a>
          )}
          <a href="#report" className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">
            {t('bali.buttons.report')}
          </a>
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

      {/* Summary + Recent */}
      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 text-lg font-bold">{t('bali.sections.summaryTitle')}</h3>
          {loading ? <p className="text-slate-500">Loading…</p> : <IncidentSummary incidents={incidents} />}
        </div>

        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 text-lg font-bold">{t('bali.sections.recentTitle')}</h3>
          {error && <p className="mb-2 text-sm text-rose-600">Error: {error}</p>}
          {loading && <p className="text-slate-500">Loading…</p>}
          {!loading && <RecentIncidents incidents={incidents} />}
        </div>
      </section>

      {/* Surf opcional */}
      {city.features.surf && (
        <section id="surf" className="mt-8">
          <SurfWidget />
        </section>
      )}

      {/* Support */}
      <section className="mt-8">
        <div className="rounded-xl border bg-white p-4">
          <h3 className="mb-3 text-lg font-bold">Support CityEasy</h3>
          <p className="mb-4 text-slate-600">{t('bali.donation.note')}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-3">
              <div className="font-semibold">Bitcoin</div>
              <code className="mt-1 block truncate rounded bg-slate-50 px-2 py-1 text-sm">
                {import.meta.env.VITE_BTC_ADDRESS || 'bc1qm4pn5yv94qgmc0js9pmurcp32dldfpt9ap04lj'}
              </code>
            </div>
            <div className="rounded-lg border p-3">
              <div className="font-semibold">Lightning</div>
              <code className="mt-1 block truncate rounded bg-slate-50 px-2 py-1 text-sm">
                {import.meta.env.VITE_LIGHTNING_ADDRESS || 'coylaborer25@walletofsatoshi.com'}
              </code>
            </div>
          </div>
        </div>
      </section>

      {showTutorial && <TutorialSlider onClose={()=> setShowTutorial(false)} />}
    </div>
  )
}
