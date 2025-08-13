import React from 'react'
import { IoFlash } from 'react-icons/io5'
import { FaBitcoin, FaCopy, FaChevronDown, FaBuilding } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const BTC_FALLBACK = 'bc1qm4pn5yv94qgmc0js9pmurcp32dldfpt9ap04lj'
const LN_FALLBACK  = 'coylaborer25@walletofsatoshi.com'
const MAILTO       = 'mailto:info@cityeasy.org?subject=CityEasy%20—%20Institutional%20Partnership%2FDemo'

export default function SupportCityEasy(){
  const { t } = useTranslation()
  const [tab, setTab] = React.useState('ind') // 'ind' | 'inst' (JS, sin tipos)

  const btc = import.meta.env.VITE_BTC_ADDRESS || BTC_FALLBACK
  const ln  = import.meta.env.VITE_LIGHTNING_ADDRESS || LN_FALLBACK

  const copy = async (txt) => {
    try { await navigator.clipboard.writeText(txt) } catch {}
    alert(t('bali.donation.copied', { defaultValue: 'Address copied!' }))
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-white/70 p-5 shadow-sm backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500" />

      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-extrabold tracking-tight">
            {t('bali.support.title', { defaultValue: 'Support CityEasy' })}
          </h3>
          <p className="text-sm text-slate-600">
            {t('bali.support.details', { defaultValue: 'Donations help keep our platform running.' })}
          </p>
        </div>

        <div className="inline-flex overflow-hidden rounded-xl border bg-white">
          <button
            onClick={()=>setTab('ind')}
            className={`px-3 py-1.5 text-sm font-semibold transition ${
              tab==='ind' ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'
            }`}
          >
            {t('bali.support.tab.ind', { defaultValue: 'Individuals' })}
          </button>
          <button
            onClick={()=>setTab('inst')}
            className={`px-3 py-1.5 text-sm font-semibold transition ${
              tab==='inst' ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'
            }`}
          >
            {t('bali.support.tab.inst', { defaultValue: 'Institutions' })}
          </button>
        </div>
      </header>

      {tab === 'ind' && (
        <details className="group rounded-xl border bg-white/70 p-4 open:bg-white/80">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <span className="text-sm font-semibold">
              {t('bali.support.cta', { defaultValue: 'Show options' })}
            </span>
            <FaChevronDown className="transition-transform group-open:rotate-180" />
          </summary>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border p-3">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <FaBitcoin /> {t('bali.support.method.btc', { defaultValue: 'Bitcoin' })}
              </div>
              <code className="block truncate rounded bg-slate-50 px-2 py-1 text-sm">{btc}</code>
              <div className="mt-2 flex gap-2">
                <a
                  href={`bitcoin:${btc}`}
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50"
                >
                  {t('bali.support.openWallet', { defaultValue: 'Open in wallet' })}
                </a>
                <button
                  onClick={()=>copy(btc)}
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50"
                >
                  <FaCopy/>{t('bali.buttons.copy', { defaultValue: 'Copy' })}
                </button>
              </div>
            </div>

            <div className="rounded-xl border p-3">
              <div className="mb-1 flex items-center gap-2 font-semibold">
                <IoFlash /> {t('bali.support.method.ln', { defaultValue: 'Lightning' })}
              </div>
              <code className="block truncate rounded bg-slate-50 px-2 py-1 text-sm">{ln}</code>
              <div className="mt-2 flex gap-2">
                <a
                  href={`lightning:${ln}`}
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50"
                >
                  {t('bali.support.openWallet', { defaultValue: 'Open in wallet' })}
                </a>
                <button
                  onClick={()=>copy(ln)}
                  className="inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm font-semibold hover:bg-slate-50"
                >
                  <FaCopy/>{t('bali.buttons.copy', { defaultValue: 'Copy' })}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {t('bali.support.disclaimer', {
              defaultValue:
                'Your contribution helps us maintain infrastructure and expand coverage while keeping the platform independent.',
            })}
          </p>
        </details>
      )}

      {tab === 'inst' && (
        <div className="rounded-xl border bg-white/70 p-4">
          <div className="mb-3 flex items-center gap-2">
            <FaBuilding className="text-slate-700" />
            <h4 className="text-base font-extrabold">
              {t('bali.support.inst.title', { defaultValue: 'For Institutions' })}
            </h4>
          </div>

          <p className="mb-3 text-sm text-slate-700">
            {t('bali.support.inst.pitch', {
              defaultValue:
                'We collaborate with municipalities, NGOs, and enterprises. Options include data-sharing, custom dashboards, and private deployments.',
            })}
          </p>

          <ul className="mb-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
            <li>• {t('bali.support.inst.bullet.api', { defaultValue: 'Data access & API' })}</li>
            <li>• {t('bali.support.inst.bullet.dash', { defaultValue: 'Custom dashboards & alerts' })}</li>
            <li>• {t('bali.support.inst.bullet.mou', { defaultValue: 'MoU / partnerships' })}</li>
            <li>• {t('bali.support.inst.bullet.deployment', { defaultValue: 'On-prem / private cloud' })}</li>
            <li>• {t('bali.support.inst.bullet.localization', { defaultValue: 'Localization & training' })}</li>
            <li>• {t('bali.support.inst.bullet.research', { defaultValue: 'Research & grants' })}</li>
          </ul>

          <div className="flex flex-wrap gap-2">
            <a
              href={MAILTO}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-4 py-2 text-sm font-extrabold text-white hover:opacity-95"
            >
              {t('bali.support.inst.cta', { defaultValue: 'Request a demo' })}
            </a>
            <a
              href="mailto:info@cityeasy.org"
              className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
            >
              {t('bali.support.inst.contact', { defaultValue: 'Contact us' })}
            </a>
          </div>
        </div>
      )}
    </section>
  )
}



