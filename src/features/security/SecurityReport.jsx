import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { FaRobot, FaSync } from 'react-icons/fa'

/* ---------- ENV & base URLs (compatibles con tu nueva versión) ---------- */
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const SECURITY_BASE =
  (import.meta.env.VITE_SECURITY_REPORT_URL || (API_BASE ? `${API_BASE}/api/security` : '')).replace(/\/$/, '')
const CHAT_URL =
  (import.meta.env.VITE_SECURITY_CHAT_URL || (SECURITY_BASE ? `${SECURITY_BASE}/chat` : '')).replace(/\/$/, '')

/* ---------- Helpers ---------- */
const TTL_MS = 15 * 60 * 1000

async function safeJson(res) {
  if (res.status === 204) return null
  const ctype = res.headers.get('content-type') || ''
  if (ctype.includes('application/json')) return await res.json()
  const text = await res.text()
  if (!text) return null
  try { return JSON.parse(text) } catch { return { report: text } }
}

/* Markdown link override: mantiene tu diseño Tailwind nuevo */
const markdownLinks = {
  a: (props) => (
    <a {...props} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-80" />
  ),
}

export default function SecurityReport() {
  const { t, i18n } = useTranslation()

  // Igual que la versión antigua: forzar en/id
  const rawLang = i18n.language || (typeof navigator !== 'undefined' ? navigator.language : 'en') || 'en'
  const lang = rawLang.startsWith('id') ? 'id' : 'en'

  const [report, setReport] = React.useState('')
  const [lastUpdated, setLastUpdated] = React.useState(null)
  const [isReportLoading, setIsReportLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [chatMessage, setChatMessage] = React.useState('')
  const [chatResponse, setChatResponse] = React.useState('')
  const [isChatLoading, setIsChatLoading] = React.useState(false)

  const fetchingRef = React.useRef(false)
  const lockRef = React.useRef(false)
  const unlockTimer = React.useRef(null)

  const kRep  = `securityReport_${lang}`
  const kTime = `lastReportUpdate_${lang}`

  const fetchLatestReport = React.useCallback(async () => {
    if (!SECURITY_BASE) { setError(t('security.errorLoad')); return }
    if (fetchingRef.current || lockRef.current) return

    fetchingRef.current = true
    setError(null)

    // Cache 15 min por idioma (misma lógica que tu versión antigua)
    const now = new Date()
    const cached = localStorage.getItem(kRep)
    const cachedTime = localStorage.getItem(kTime)
    if (cachedTime && (now - new Date(cachedTime) < TTL_MS)) {
      setReport(cached || '')
      setLastUpdated(new Date(cachedTime))
      fetchingRef.current = false
      return
    }

    try {
      lockRef.current = true
      setIsReportLoading(true)

      const qs = new URLSearchParams({ lang })
      const res = await fetch(`${SECURITY_BASE}/latest_report?${qs.toString()}`, {
        headers: { Accept: 'application/json' },
      })

      if (res.status === 204) {
        setReport('')
        setLastUpdated(now)
        localStorage.setItem(kRep, '')
        localStorage.setItem(kTime, now.toISOString())
        return
      }

      if (!res.ok) {
        setError(`Security API error (${res.status})`)
        return
      }

      const data = await safeJson(res)
      if (data?.report) {
        const updated = data.updated_at ? new Date(data.updated_at) : now
        setReport(data.report)
        setLastUpdated(updated)
        localStorage.setItem(kRep, data.report)
        localStorage.setItem(kTime, updated.toISOString())
      } else {
        setReport('')
        setLastUpdated(now)
        localStorage.setItem(kRep, '')
        localStorage.setItem(kTime, now.toISOString())
      }
    } catch {
      setError(t('security.errorLoad'))
    } finally {
      setIsReportLoading(false)
      fetchingRef.current = false
      // anti doble llamada
      unlockTimer.current = setTimeout(() => { lockRef.current = false }, 1000)
    }
  }, [lang, t, kRep, kTime])

  React.useEffect(() => {
    fetchLatestReport()
    const id = setInterval(fetchLatestReport, TTL_MS)
    return () => {
      clearInterval(id)
      if (unlockTimer.current) clearTimeout(unlockTimer.current)
    }
  }, [fetchLatestReport])

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    const msg = chatMessage.trim()
    if (!msg) { setChatResponse(t('security.empty')); return }

    setIsChatLoading(true)
    setChatResponse('')

    try {
      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ message: msg, lang }),   // ← incluye lang como en la versión antigua
      })

      if (!res.ok) {
        if (res.status === 429) setChatResponse(t('security.rateLimit', { defaultValue: 'Rate limit reached. Please try again shortly.' }))
        else if (res.status === 400) setChatResponse(t('security.errorChat', { defaultValue: 'Your message is not allowed.' }))
        else setChatResponse(`Server error (${res.status}).`)
        return
      }

      const data = await safeJson(res)
      setChatResponse(data?.response || t('security.noReport'))
      setChatMessage('')
    } catch {
      setChatResponse(t('security.errorChat', { defaultValue: 'Could not connect to server.' }))
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      {/* Header (misma estructura visual que tu nueva versión) */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <FaRobot className="opacity-80" />
          {t('security.title')}
        </h2>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          {lastUpdated && (
            <span className="hidden sm:inline">
              {t('security.lastUpdate', { date: lastUpdated.toLocaleString() })}
            </span>
          )}
          {isReportLoading && <FaSync className="animate-spin" />}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
          Error: {error}
        </div>
      )}

      {/* Reporte en Markdown (mantiene tu clase 'markdown-prose') */}
      <div className="markdown-prose">
        {report ? (
          <ReactMarkdown components={markdownLinks}>{report}</ReactMarkdown>
        ) : (
          <p className="text-slate-600">{t('security.noReport')}</p>
        )}
      </div>

      {/* Chat (misma UI nueva) */}
      <div className="mt-6 rounded-xl border bg-slate-50/80 p-3">
        <h3 className="mb-2 text-sm font-bold">{t('security.askAI')}</h3>

        <form onSubmit={handleChatSubmit} className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder={t('security.placeholder')}
            disabled={isChatLoading}
            className="flex-1 rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />

          <button
            type="submit"
            disabled={isChatLoading || !chatMessage.trim()}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {isChatLoading ? 'Sending…' : 'Send'}
          </button>
        </form>

        {chatResponse && (
          <div className="markdown-prose mt-3 rounded-md border bg-white/70 p-3">
            <ReactMarkdown components={markdownLinks}>{chatResponse}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

