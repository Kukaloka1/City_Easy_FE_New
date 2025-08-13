import React from 'react'
import { IoFlash } from 'react-icons/io5'
import { FaBitcoin, FaCopy } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const BTC_FALLBACK = 'bc1qm4pn5yv94qgmc0js9pmurcp32dldfpt9ap04lj'
const LN_FALLBACK  = 'coylaborer25@walletofsatoshi.com'

export default function SupportCityEasy(){
  const { t } = useTranslation()
  const btc = import.meta.env.VITE_BTC_ADDRESS || BTC_FALLBACK
  const ln  = import.meta.env.VITE_LIGHTNING_ADDRESS || LN_FALLBACK

  const copy = async (txt) => {
    try{ await navigator.clipboard.writeText(txt) }catch{}
    alert(t('bali.donation.copied') || 'Copied!')
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="mb-1 text-lg font-bold">Support CityEasy</h3>
      <p className="mb-3 text-sm text-slate-600">{t('bali.donation.note')}</p>

      <div className="space-y-3">
        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-2 font-semibold"><FaBitcoin/> Bitcoin</div>
          <code className="block truncate rounded bg-slate-50 px-2 py-1 text-sm">{btc}</code>
          <button onClick={()=>copy(btc)} className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">
            <FaCopy/> {t('bali.buttons.copy')}
          </button>
        </div>

        <div className="rounded-lg border p-3">
          <div className="mb-1 flex items-center gap-2 font-semibold"><IoFlash/> Lightning</div>
          <code className="block truncate rounded bg-slate-50 px-2 py-1 text-sm">{ln}</code>
          <button onClick={()=>copy(ln)} className="mt-2 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50">
            <FaCopy/> {t('bali.buttons.copy')}
          </button>
        </div>
      </div>
    </div>
  )
}
