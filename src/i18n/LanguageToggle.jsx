import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageToggle(){
  const { i18n } = useTranslation()
  const lang = (i18n.language || 'en').slice(0,2)
  const set = (l) => { i18n.changeLanguage(l) }

  return (
    <div className="inline-flex rounded-full border bg-white/80 p-0.5 text-xs font-bold shadow-sm backdrop-blur">
      <button
        onClick={()=> set('en')}
        className={`px-2.5 py-1 rounded-full ${lang==='en' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
      >
        EN
      </button>
      <button
        onClick={()=> set('id')}
        className={`px-2.5 py-1 rounded-full ${lang==='id' ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
      >
        ID
      </button>
    </div>
  )
}
