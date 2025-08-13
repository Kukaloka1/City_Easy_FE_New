import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'
import { FaRobot, FaSync } from 'react-icons/fa'

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const SECURITY_BASE =
  (import.meta.env.VITE_SECURITY_REPORT_URL || `${API_BASE}/api/security`).replace(/\/$/, '')
const CHAT_URL =
  (import.meta.env.VITE_SECURITY_CHAT_URL || `${SECURITY_BASE}/chat`).replace(/\/$/, '')

export default function SecurityReport() {
  const { t } = useTranslation()
  const [report, setReport] = React.useState('')
  const [lastUpdated, setLastUpdated] = React.useState(null)
  const [isReportLoading, setIsReportLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const [chatMessage, setChatMessage] = React.useState('')
  const [chatResponse, setChatResponse] = React.useState('')
  const [isChatLoading, setIsChatLoading] = React.useState(false)

  const fetchLatestReport = React.useCallback(async () => {
    if (!SECURITY_BASE) {
      setError('Security API URL not configured')
      return
    }
    setIsReportLoading(true)
    setError(null)

    try {
      const res = await fetch(`${SECURITY_BASE}/latest_report`, {
        headers: { Accept: 'application/json' },
      })

      // 204 = No Content → no parsees JSON
      if (res.status === 204) {
        setReport('')
        setLastUpdated(new Date())
        setIsReportLoading(false)
        return
      }

      if (!res.ok) {
        setError(`Security API error (${res.status})`)
        setIsReportLoading(false)
        return
      }

      const ctype = res.headers.get('content-type') || ''
      let data = null

      if (ctype.includes('application/json')) {
        data = await res.json()
      } else {
        // Puede venir texto/markdown; intenta parsear por si acaso
        const text = await res.text()
        try { data = text ? JSON.parse(text) : null } catch { data = { report: text } }
      }

      if (data?.report) {
        setReport(data.report)
        setLastUpdated(new Date(data.updated_at || Date.now()))
      } else {
        setReport('')
        setLastUpdated(new Date())
      }
    } catch {
      setError(t('security.errorLoad'))
    } finally {
      setIsReportLoading(false)
    }
  }, [t])

  React.useEffect(() => {
    fetchLatestReport()
    // (opcional) refrescar de fondo cada 15 min
    const id = setInterval(fetchLatestReport, 15 * 60 * 1000)
    return () => clearInterval(id)
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
        body: JSON.stringify({ message: msg }),
      })

      if (!res.ok) {
        if (res.status === 429) setChatResponse('Rate limit reached. Please wait a moment and try again.')
        else if (res.status === 400) setChatResponse('Your message contains not allowed content.')
        else setChatResponse(`Server error (${res.status}).`)
        return
      }

      const ctype = res.headers.get('content-type') || ''
      let data = null
      if (ctype.includes('application/json')) {
        data = await res.json()
      } else {
        const text = await res.text()
        try { data = JSON.parse(text) } catch { data = { response: text } }
      }

      setChatResponse(data?.response || 'No response available.')
      setChatMessage('')
    } catch {
      setChatResponse('Could not connect to server. Please check your internet connection.')
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="rounded-2xl border bg-white/90 p-5 shadow-sm">
      {/* Header */}
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
  
      {/* Reporte en Markdown */}
      <div className="markdown-prose">
        {report ? (
          <ReactMarkdown>{report}</ReactMarkdown>
        ) : (
          <p className="text-slate-600">{t('security.noReport')}</p>
        )}
      </div>
  
      {/* Chat */}
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
            <ReactMarkdown>{chatResponse}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
  
}
