import React from 'react'
import { useTranslation } from 'react-i18next'

export default function IncidentSummary({ incidents=[] }){
  const { t } = useTranslation()
  const count = (k) => incidents.filter(i => i.type === k).length
  const stats = [
    { key:'total',     label: t('incidentTypes.total'),     value: incidents.length },
    { key:'accident',  label: t('incidentTypes.accident'),  value: count('accident') },
    { key:'traffic',   label: t('incidentTypes.traffic'),   value: count('traffic') },
    { key:'crime',     label: t('incidentTypes.crime'),     value: count('crime') },
    { key:'disaster',  label: t('incidentTypes.disaster'),  value: count('disaster') },
    { key:'weather',   label: t('incidentTypes.weather'),   value: count('weather') },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {stats.map(s=>(
        <div key={s.key} className="rounded-xl border bg-white px-4 py-3 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">{s.label}</div>
          <div className="text-2xl font-black tracking-tight">{s.value}</div>
        </div>
      ))}
    </div>
  )
}
