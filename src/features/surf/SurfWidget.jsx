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
    const u1 = `${BASE}/${enc}?lang=${encodeURIComponent(LANG)}`
    const u2 = `${BASE}/latest?spot=${enc}&lang=${encodeURIComponent(LANG)}`
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
      const cached = JSON.parse(localStorage.getItem('surfDataMap') || '{}')
      const ts     = parseInt(localStorage.getItem('surfUpdatedAt') || '0', 10)
      const now    = Date.now()

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
  const m = current?.data || {}
  const wave   = firstNum(m.wave_height, m.swh, m.waveHeight, m.wave)
  const period = firstNum(m.wave_period, m.tp, m.period)
  const swell  = firstNum(m.swell_wave_height, m.swell, m.swellHeight)
  const dir    = firstNum(m.wave_direction, m.direction, m.dir)
  const wind   = firstNum(m.wind_wave_direction, m.wind_direction, m.wind)

  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-extrabold text-slate-800">
          AI Surf Report
          <span className="ml-2 text-slate-400 text-xs font-medium">
            (updates every 2h)
          </span>
        </h3>
        {SPOTS.length > 1 ? (
          <select
            className="rounded-lg border px-3 py-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
            value={spot}
            onChange={(e) => setSpot(e.target.value)}
          >
            {SPOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        ) : (
          <div className="text-sm font-semibold text-slate-600">{spot}</div>
        )}
      </div>

      {/* Last update */}
      {updatedAt && (
        <p className="mb-3 text-xs text-slate-500 italic">
          Last updated at <span className="font-medium">{updatedAt.toLocaleTimeString()}</span>
        </p>
      )}

      {/* Loading */}
      {loading && (
        <p className="text-sm text-slate-600 animate-pulse">
          Fetching the latest ocean conditions…
        </p>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 shadow-sm">
          ⚠️ Unable to load surf data: {error}
        </div>
      )}

      {/* Data */}
      {!loading && !error && current && (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <Metric label="Wave Height" value={fmt(wave, ' m')} />
            <Metric label="Period"      value={fmt(period, ' s')} />
            <Metric label="Swell"       value={fmt(swell, ' m')} />
            <Metric label="Direction"   value={fmt(dir, '°')} />
            <Metric label="Wind"        value={fmt(wind)} />
          </div>

          {current.advice && (
            <div className="mt-4 rounded-xl border bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
              <h4 className="mb-2 text-sm font-bold text-slate-700">AI Recommendation</h4>
              {Array.isArray(current.advice)
                ? current.advice.map((line, i) => (
                    <p key={i} className="mb-1 text-sm text-slate-600">{line}</p>
                  ))
                : <p className="text-sm text-slate-600">{String(current.advice)}</p>}
            </div>
          )}
        </>
      )}

      {/* No data */}
      {!loading && !error && !current && (
        <p className="text-sm text-slate-500 italic">
          No surf forecast available for this spot at the moment.
        </p>
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

