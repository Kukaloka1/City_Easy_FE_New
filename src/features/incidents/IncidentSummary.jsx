// src/features/incidents/IncidentSummary.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function IncidentSummary({ incidents = [], dayLabel }) {
  const { t } = useTranslation()

  // 1 sola pasada
  const counts = incidents.reduce((acc, it) => {
    acc.total++
    if (acc[it.type] !== undefined) acc[it.type]++
    return acc
  }, { total:0, accident:0, traffic:0, crime:0, disaster:0, weather:0 })

  const stats = [
    { key:'total',    label: t('incidentTypes.total'),    value: counts.total },
    { key:'accident', label: t('incidentTypes.accident'), value: counts.accident },
    { key:'traffic',  label: t('incidentTypes.traffic'),  value: counts.traffic },
    { key:'crime',    label: t('incidentTypes.crime'),    value: counts.crime },
    { key:'disaster', label: t('incidentTypes.disaster'), value: counts.disaster },
    { key:'weather',  label: t('incidentTypes.weather'),  value: counts.weather },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      {dayLabel && (
        <div className="mb-2 text-xs font-semibold text-slate-500">
          {dayLabel}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map(s => (
          <div key={s.key} className="rounded-2xl border bg-white px-4 py-4 text-center shadow-sm">
            <div className="text-xs font-semibold text-slate-500">{s.label}</div>
            <div className="mt-1 text-2xl font-black tracking-tight">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}



