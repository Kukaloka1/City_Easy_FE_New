import React from 'react'
import ReactMarkdown from 'react-markdown'
import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'
import { FaRobot } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const REPORT_URL = import.meta.env.VITE_SECURITY_REPORT_URL
const CHAT_URL   = import.meta.env.VITE_SECURITY_CHAT_URL

async function authFetch(url, options={}){
  const u = getAuth(firebaseApp).currentUser
  const headers = { 'Content-Type': 'application/json', ...(options.headers||{}) }
  if (u) headers.Authorization = `Bearer ${await u.getIdToken()}`
  const res = await fetch(url, { ...options, headers })
  if(!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export default function SecurityReport(){
  const { t } = useTranslation()
  const [report, setReport] = React.useState('')
  const [last, setLast] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [chatMsg, setChatMsg] = React.useState('')
  const [chatRes, setChatRes] = React.useState('')
  const [err, setErr] = React.useState(null)

  const load = React.useCallback(async ()=>{
    if(!REPORT_URL) return
    setLoading(true); setErr(null)
    try{
      const cache = localStorage.getItem('securityReport')
      const when  = localStorage.getItem('securityReportTime')
      const fresh = when && (Date.now() - +new Date(when) < 15*60*1000)
      if (cache && fresh){
        setReport(cache); setLast(new Date(when))
      } else {
        const data = await authFetch(`${REPORT_URL}/latest_report`)
        if (data?.report){
          setReport(data.report); setLast(new Date())
          localStorage.setItem('securityReport', data.report)
          localStorage.setItem('securityReportTime', new Date().toISOString())
        }
      }
    }catch(e){ setErr(e.message) }
    finally{ setLoading(false) }
  }, [])

  React.useEffect(()=>{ load() }, [load])

  const onSend = async (e)=>{
    e.preventDefault()
    const msg = chatMsg.trim()
    if(!msg) return
    setChatRes(''); setErr(null)
    try{
      const data = await authFetch(CHAT_URL, { method:'POST', body: JSON.stringify({ message: msg }) })
      setChatRes(data?.response || '')
      setChatMsg('')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="mb-2 flex items-center gap-2 text-lg font-bold">
        <FaRobot className="text-slate-600" /> {t('security.title')}
      </div>
      <div className="mb-2 text-xs text-slate-500">
        {t('security.latest')} {last && <span>— {t('security.lastUpdate', { date: last.toLocaleString() })}</span>}
      </div>
      {err && <div className="mb-2 text-sm text-rose-600">Error: {err}</div>}
      {loading && <div className="text-slate-500">Loading…</div>}
      {!loading && (report ? (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-slate-600">{t('security.noReport')}</p>
      ))}

      <div className="mt-4 rounded-lg border bg-slate-50 p-3">
        <div className="mb-2 text-sm font-semibold">{t('security.askAI')}</div>
        <form onSubmit={onSend} className="flex gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm"
            placeholder={t('security.placeholder')}
            value={chatMsg}
            onChange={(e)=> setChatMsg(e.target.value)}
          />
          <button className="rounded-md border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-100">{t('home.ctaPrimary')}</button>
        </form>
        {chatRes && (
          <div className="prose prose-sm mt-3 max-w-none bg-white p-3">
            <ReactMarkdown>{chatRes}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
