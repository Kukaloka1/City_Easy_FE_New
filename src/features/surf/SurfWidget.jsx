import React from 'react'
import { useTranslation } from 'react-i18next'

export default function SurfWidget(){
  const { t } = useTranslation()
  const [data, setData] = React.useState(null)
  const [err, setErr] = React.useState(null)

  const spots = (import.meta.env.VITE_SURF_SPOTS || '').split(',').map(s=>s.trim()).filter(Boolean)
  const lang  = import.meta.env.VITE_SURF_LANG || 'en'
  const base  = import.meta.env.VITE_SURF_API_URL

  React.useEffect(()=>{
    let cancelled = false
    async function run(){
      if(!base || !spots.length) return
      try{
        const url = `${base}?spot=${encodeURIComponent(spots[0])}&lang=${encodeURIComponent(lang)}`
        const res = await fetch(url)
        if(!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        if(!cancelled) setData(json)
      }catch(e){ if(!cancelled) setErr(e.message) }
    }
    run()
    return ()=>{ cancelled = true }
  }, [base, spots.join(','), lang])

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="text-lg font-bold">{t('surf.title')} <span className="text-xs font-semibold text-slate-400">({t('surf.refresh')})</span></h3>
      {!base && <p className="mt-2 text-slate-500">Surf API not configured.</p>}
      {err && <p className="mt-2 text-rose-600 text-sm">Error: {err}</p>}
      {data ? (
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div><span className="font-semibold">{t('surf.waveHeight')}:</span> {data.waveHeight ?? '—'}</div>
          <div><span className="font-semibold">{t('surf.period')}:</span> {data.period ?? '—'}</div>
          <div><span className="font-semibold">{t('surf.swell')}:</span> {data.swell ?? '—'} {data.dir && `(${t('surf.dir')}: ${data.dir})`}</div>
          <div><span className="font-semibold">{t('surf.wind')}:</span> {data.wind ?? '—'}</div>
          <div className="col-span-2 text-xs text-slate-500">{t('surf.lastFetch', { time: data.time || '--:--' })}</div>
        </div>
      ) : (!err && base) ? (
        <p className="mt-2 text-slate-500">Loading…</p>
      ) : null}
      <div className="mt-3 text-xs text-slate-400">{t('surf.powered')} CityEasy</div>
    </div>
  )
}
