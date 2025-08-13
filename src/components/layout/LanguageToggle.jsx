import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageToggle(){
  const { i18n } = useTranslation()
  const langs = ['en','id','es']
  return (
    <div className="fixed right-4 top-4 z-50 flex gap-1 rounded-xl border bg-white/80 px-1.5 py-1 text-xs font-semibold shadow">
      {langs.map(l => (
        <button
          key={l}
          onClick={()=>i18n.changeLanguage(l)}
          className={`px-2 py-1 rounded-lg ${i18n.resolvedLanguage===l ? 'bg-blue-600 text-white' : 'hover:bg-slate-100'}`}
          aria-label={`Switch to ${l}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
