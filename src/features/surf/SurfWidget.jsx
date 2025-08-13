// src/features/surf/SurfWidget.jsx
import React from 'react'

const BASE = (import.meta.env.VITE_SURF_API_URL || 'http://localhost:5000/api/surf').replace(/\/$/, '')
const SPOTS = (import.meta.env.VITE_SURF_SPOTS || 'Batu Bolong')
  .split(',').map(s => s.trim()).filter(Boolean)
const LANG = import.meta.env.VITE_SURF_LANG || 'en'
const TTL  = 120 * 60 * 1000 // 120 min

export default function SurfWidget() {
  const [spot, setSpot] = React.useState(SPOTS[0] || 'Batu Bolong')
  const [map, setMap] = React.useState({})
  const [updatedAt, setUpdatedAt] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const fetchSpot = async (s) => {
    const enc = encodeURIComponent(s)
    // 1) forma legacy exacta de tu widget antiguo
    const u1 = `${BASE}/${enc}?lang=${encodeURIComponent(LANG)}`
    // 2) variante “latest”
    const u2 = `${BASE}/latest?spot=${enc}&lang=${encodeURIComponent(LANG)}`
    // 3) fallback sin /api
    const baseNoApi = BASE.replace(/\/api\/surf$/, '')
    const u3 = `${baseNoApi}/surf/${enc}?lang=${encodeURIComponent(LANG)}`

    const candidates = [u1, u2]
    if (baseNoApi !== BASE) candidates.push(u3)

    let lastErr = null
    for (const url of candidates) {
      try {
        console.debug('[Surf] GET', url)
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) { lastErr = new Error(`${res.status} ${res.statusText}`); continue }
        const json = await res.json()
        return json
      } catch (e) {
        lastErr = e
      }
    }
    throw lastErr || new Error('All surf endpoints failed')
  }

  const refresh = async () => {
    setLoading(true); setError(null)
    try {
      // cache global por spot map
      const cached = JSON.parse(localStorage.getItem('surfDataMap') || '{}')
      const ts     = parseInt(localStorage.getItem('surfUpdatedAt') || '0', 10)
      const now    = Date.now()

      // si cache valido y tiene todos los spots
      const hasAll = SPOTS.every(s => cached[s])
      if (ts && now - ts < TTL && hasAll) {
        setMap(cached); setUpdatedAt(new Date(ts)); setLoading(false); return
      }

      const fresh = { ...(hasAll ? cached : {}) }
      for (const s of SPOTS) {
        try { fresh[s] = await fetchSpot(s) } catch { /* ignora spot roto */ }
      }
      setMap(fresh)
      setUpdatedAt(new Date())
      localStorage.setItem('surfDataMap', JSON.stringify(fresh))
      localStorage.setItem('surfUpdatedAt', Date.now().toString())
    } catch (e) {
      setError(e?.message || 'Failed to fetch surf data')
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    refresh()
    const id = setInterval(refresh, TTL)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = map[spot]

  // normalización por si campos cambian nombre
  const m = current?.data || {}
  const wave   = firstNum(m.wave_height, m.swh, m.waveHeight, m.wave)
  const period = firstNum(m.wave_period, m.tp, m.period)
  const swell  = firstNum(m.swell_wave_height, m.swell, m.swellHeight)
  const dir    = firstNum(m.wave_direction, m.direction, m.dir)
  const wind   = firstNum(m.wind_wave_direction, m.wind_direction, m.wind)

  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold">
          AI Surf Report <span className="text-slate-400 text-sm">(updated every 2 h)</span>
        </h3>
        {SPOTS.length > 1 ? (
          <select
            className="rounded-lg border px-3 py-2 text-sm"
            value={spot}
            onChange={(e)=>setSpot(e.target.value)}
          >
            {SPOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          <div className="text-sm font-semibold text-slate-600">{spot}</div>
        )}
      </div>

      {updatedAt && (
        <p className="mb-3 text-xs text-slate-500">
          Last fetch: {updatedAt.toLocaleTimeString()}
        </p>
      )}

      {loading && <p className="text-sm text-slate-600">Loading…</p>}
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
          Error: {error}
        </div>
      )}

      {!loading && !error && current && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <Metric label="Wave Height" value={fmt(wave, ' m')} />
            <Metric label="Period"      value={fmt(period, ' s')} />
            <Metric label="Swell"       value={fmt(swell, ' m')} />
            <Metric label="Dir"         value={fmt(dir, '°')} />
            <Metric label="Wind"        value={fmt(wind)} />
          </div>

          {current.advice && (
            <div className="prose prose-sm mt-4 max-w-none rounded-xl border bg-white/70 p-3">
              {Array.isArray(current.advice)
                ? current.advice.map((line, i) => <p key={i} className="mb-1">{line}</p>)
                : <p>{String(current.advice)}</p>}
            </div>
          )}
        </>
      )}

      {!loading && !error && !current && (
        <p className="text-sm text-slate-500">No surf data for this spot.</p>
      )}

      <p className="mt-4 text-xs text-slate-400">Powered by CityEasy</p>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border bg-slate-50/60 p-3 text-center">
      <div className="text-xs font-semibold text-slate-500">{label}</div>
      <div className="text-lg font-extrabold text-slate-900">{value ?? '—'}</div>
    </div>
  )
}

function fmt(v, unit='') {
  if (v == null) return null
  if (typeof v === 'number') return `${Math.round(v * 10) / 10}${unit}`
  return String(v)
}
function firstNum(...xs){
  for (const x of xs) if (typeof x === 'number') return x
  return xs.find(x => x != null) ?? null
}

