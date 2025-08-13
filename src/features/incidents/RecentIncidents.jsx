import React from 'react'
import { timeAgo } from '@/utils/datetime'
import { useTranslation } from 'react-i18next'

const typeColor = (t) => ({
  accident: 'bg-orange-100 text-orange-700 border-orange-200',
  traffic: 'bg-amber-100 text-amber-700 border-amber-200',
  crime: 'bg-red-100 text-red-700 border-red-200',
  disaster: 'bg-green-100 text-green-700 border-green-200',
  weather: 'bg-sky-100 text-sky-700 border-sky-200',
}[t] || 'bg-slate-100 text-slate-700 border-slate-200')

const typeLabelKey = (t) => ({
  accident: 'incidentTypes.accident',
  traffic: 'incidentTypes.traffic',
  crime: 'incidentTypes.crime',
  disaster: 'incidentTypes.disaster',
  weather: 'incidentTypes.weather',
}[t] || 'incidentTypes.total')

export default function RecentIncidents({ incidents = [] }) {
  const { t } = useTranslation()
  if (!incidents.length) {
    return <div className="rounded-xl border bg-white p-4 text-slate-500">No recent incidents.</div>
  }
  return (
    <div className="space-y-3">
      {incidents.map((it) => (
        <article key={it.id} className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-bold ${typeColor(it.type)}`}>
              {t(typeLabelKey(it.type))}
            </span>
            <span className="text-xs font-semibold text-slate-500">{timeAgo(it.timestamp)} {t('bali.timeAgo')}</span>
          </div>
          {it.description && (
            <p className="mt-2 text-[0.98rem] leading-6 text-slate-800">{it.description}</p>
          )}
          {it.photoURL && (
            <div className="mt-3 overflow-hidden rounded-xl">
              <img
                src={it.photoURL}
                alt="Incident"
                loading="lazy"
                className="h-64 w-full object-cover"   // máx 256px de alto
                style={{ aspectRatio: '16 / 9' }}       // recorta elegante
              />
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span className="truncate max-w-[60%]">{it.location || '—'}</span>
            <span>
              {it.latitude && it.longitude ? `${Number(it.latitude).toFixed(5)}, ${Number(it.longitude).toFixed(5)}` : t('bali.noCoords')}
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {t('bali.reportedOn')} {new Date(it.timestamp).toLocaleString()}
          </div>
        </article>
      ))}
    </div>
  )
}
