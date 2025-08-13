import React, { useMemo, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cities } from '@/cities/config'
import { getRecentIncidents, createIncident } from '@/features/incidents/api'
import IncidentSummary from '@/features/incidents/IncidentSummary'
import RecentIncidents from '@/features/incidents/RecentIncidents'
import SurfWidget from '@/features/surf/SurfWidget'
import TutorialSlider from '@/features/tutorial/TutorialSlider'
import HeatMap from '@/features/map/HeatMap'
import SecurityReport from '@/features/security/SecurityReport'
import Modal from '@/components/ui/Modal'
import SupportCityEasy from '@/features/support/SupportCityEasy'

export default function CityPage() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const city = useMemo(() => cities[slug], [slug])

  // UI state
  const [showTutorial, setShowTutorial] = useState(false)
  const [openReport, setOpenReport] = useState(false)

  // data
  const [incidents, setIncidents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // location para el form
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  // submit state
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!city) return
    let cancelled = false

    async function load() {
      try {
        setLoading(true); setError(null)
        const items = await getRecentIncidents(city.slug, 20)
        if (!cancelled) setIncidents(Array.isArray(items) ? items : [])
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load incidents')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const id = setInterval(load, 5 * 60 * 1000) // refresh cada 5 min
    return () => { cancelled = true; clearInterval(id) }
  }, [city])

  if (!city) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">City not found</h1>
        <p className="mt-2 text-slate-600">The city “{slug}” is not configured yet.</p>
        <Link to="/dashboard" className="mt-4 inline-block rounded-lg border px-4 py-2 font-semibold hover:bg-slate-50">← Back to Dashboard</Link>
      </div>
    )
  }

  const askLocationThenOpen = () => {
    if (!navigator.geolocation) {
      alert(t('bali.errors.noGeolocation'))
      return
    }
    const opts = { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        setOpenReport(true)
      },
      () => alert(t('bali.errors.enableLocation')),
      opts
    )
  }

  const onSubmitReport = async (payload) => {
    try {
      setSubmitting(true)
      await createIncident(payload)
      const items = await getRecentIncidents(city.slug, 20)
      setIncidents(Array.isArray(items) ? items : [])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Top bar */}
      <div className="mb-2 flex items-center justify-between">
        <Link to="/dashboard" className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50">
          ← {t('bali.changeCity')}
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTutorial(true)}
            className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50"
          >
            {t('bali.buttons.tutorial')}
          </button>
          {city.features.surf && (
            <a href="#surf" className="rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">AI Surf</a>
          )}
          <button
            onClick={askLocationThenOpen}
            className="rounded-lg border bg-slate-900 px-3 py-1 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {t('bali.buttons.report')}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-3xl font-extrabold" dangerouslySetInnerHTML={{ __html: t('bali.header.title') }} />
        <p className="text-slate-600" dangerouslySetInnerHTML={{ __html: t('bali.header.subtitle') }} />
      </header>

      {/* Mapa */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold">{t('bali.sections.mapTitle')}</h2>
        <HeatMap
          incidents={incidents}
          center={city.center || undefined}
          interactive={!(openReport || showTutorial)}
        />
      </section>

      {/* Incident Summary – ancho completo (cinta horizontal) */}
      <section className="rounded-xl border bg-white p-4">
        <h3 className="mb-3 text-lg font-bold">{t('bali.sections.summaryTitle')}</h3>
        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : (
          <IncidentSummary incidents={incidents} />
        )}
      </section>

      {/* Recent Incidents – ancho completo (masonry) */}
      <section className="rounded-xl border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{t('bali.sections.recentTitle')}</h3>
        </div>
        {error && <p className="mb-2 text-sm text-rose-600">Error: {error}</p>}
        {loading ? (
          <p className="text-slate-500">Loading…</p>
        ) : (
          <RecentIncidents incidents={incidents} layout="uniform" />

        )}
      </section>

      {/* AI Safety Summary */}
      <section>
        <SecurityReport />
      </section>

      {/* Surf opcional */}
      {city.features.surf && (
        <section id="surf">
          <SurfWidget />
        </section>
      )}

      {/* Support */}
      <section>
        <SupportCityEasy />
      </section>

      {/* Tutorial modal */}
      {showTutorial && (
        <Modal isOpen={showTutorial} onClose={() => setShowTutorial(false)} title={t('bali.buttons.tutorial')}>
          <TutorialSlider onClose={() => setShowTutorial(false)} />
        </Modal>
      )}

      {/* Report modal */}
      <Modal isOpen={openReport} onClose={() => setOpenReport(false)} title={t('report.title')}>
        <ReportFormLazy
          onSubmit={onSubmitReport}
          isSubmitting={submitting}
          lat={lat}
          lng={lng}
          onClose={() => setOpenReport(false)}
        />
      </Modal>
    </div>
  )
}

// code-splitting del formulario
function ReportFormLazy(props) {
  const [C, setC] = useState(null)
  useEffect(() => { import('@/features/report/ReportForm').then(m => setC(() => m.default)) }, [])
  if (!C) return <div className="p-3 text-slate-500">Loading form…</div>
  return <C {...props} />
}
