import React from 'react'
import { timeAgo } from '@/utils/datetime'
import { useTranslation } from 'react-i18next'

const typeColor = (t) => ({
  accident: 'bg-orange-100 text-orange-700 border-orange-200',
  traffic:  'bg-amber-100  text-amber-700  border-amber-200',
  crime:    'bg-red-100    text-red-700    border-red-200',
  disaster: 'bg-green-100  text-green-700  border-green-200',
  weather:  'bg-sky-100    text-sky-700    border-sky-200',
}[t] || 'bg-slate-100 text-slate-700 border-slate-200')

const typeLabelKey = (t) => ({
  accident: 'incidentTypes.accident',
  traffic:  'incidentTypes.traffic',
  crime:    'incidentTypes.crime',
  disaster: 'incidentTypes.disaster',
  weather:  'incidentTypes.weather',
}[t] || 'incidentTypes.total')

/** Tarjeta con alto uniforme (md+) y scroll interno en el contenido */
function UniformCard({ it, t }) {
  return (
    <article className="group flex h-auto flex-col rounded-2xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:h-[420px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-bold ${typeColor(it.type)}`}>
          {t(typeLabelKey(it.type))}
        </span>
        <span className="text-xs font-semibold text-slate-500">{timeAgo(it.timestamp)} {t('bali.timeAgo')}</span>
      </div>

      {/* Contenido desplazable (no se corta) */}
      <div className="mt-2 space-y-3 overflow-visible md:overflow-y-auto md:[scrollbar-width:thin] md:pr-1 md:grow md:max-h-[230px]">
        {it.description && (
          <p className="text-[0.98rem] leading-6 text-slate-900 whitespace-pre-wrap">
            {it.description}
          </p>
        )}
        {it.photoURL && (
          <div className="overflow-hidden rounded-xl">
            <img
              src={it.photoURL}
              alt="Incident"
              loading="lazy"
              className="w-full object-cover"
              style={{ aspectRatio: '16 / 9' }}
            />
          </div>
        )}
      </div>

      {/* Meta fijo al pie */}
      <div className="mt-3 space-y-1 text-xs">
        <div className="font-medium text-slate-700 break-words">{it.location || '—'}</div>
        <div className="text-slate-600">
          {it.latitude && it.longitude ? (
            <span className="inline-flex items-center gap-1">
              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                {Number(it.latitude).toFixed(5)}, {Number(it.longitude).toFixed(5)}
              </span>
            </span>
          ) : t('bali.noCoords')}
        </div>
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {t('bali.reportedOn')} {new Date(it.timestamp).toLocaleString()}
          </span>
        </div>
      </div>
    </article>
  )
}

/** Masonry (por si quieres mantenerlo disponible) */
function Masonry({ incidents, t }) {
  return (
    <div className="columns-1 sm:columns-2 xl:columns-3 gap-4 [column-fill:_balance]">
      {incidents.map((it) => (
        <article key={it.id} className="mb-4 break-inside-avoid rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-xs font-bold ${typeColor(it.type)}`}>
              {t(typeLabelKey(it.type))}
            </span>
            <span className="text-xs font-semibold text-slate-500">{timeAgo(it.timestamp)} {t('bali.timeAgo')}</span>
          </div>
          {it.description && (
            <p className="mt-2 text-[0.98rem] leading-6 text-slate-900 whitespace-pre-wrap">{it.description}</p>
          )}
          {it.photoURL && (
            <div className="mt-3 overflow-hidden rounded-xl">
              <img src={it.photoURL} alt="Incident" loading="lazy" className="w-full object-cover" style={{ aspectRatio: '16 / 9' }} />
            </div>
          )}
          <div className="mt-3 text-xs text-slate-600">
            <div className="font-medium break-words">{it.location || '—'}</div>
            <div className="mt-1 text-slate-500">
              {it.latitude && it.longitude ? `${Number(it.latitude).toFixed(5)}, ${Number(it.longitude).toFixed(5)}` : t('bali.noCoords')}
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              {t('bali.reportedOn')} {new Date(it.timestamp).toLocaleString()}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function RecentIncidents({ incidents = [], layout = 'uniform' }) {
  const { t } = useTranslation()

  if (!incidents.length) {
    return <div className="rounded-xl border bg-white p-4 text-slate-500">No recent incidents.</div>
  }

  if (layout === 'masonry') {
    return <Masonry incidents={incidents} t={t} />
  }

  // layout "uniform": tarjetas iguales en grid responsivo
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {incidents.map((it) => <UniformCard key={it.id} it={it} t={t} />)}
    </div>
  )
}

