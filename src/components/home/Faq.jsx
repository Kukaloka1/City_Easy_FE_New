// src/components/home/Faq.jsx
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown } from 'react-icons/fa'

export default function Faq(){
  const { t } = useTranslation()
  const wrapperRef = useRef(null)

  const onToggle = (e) => {
    if (!e.currentTarget.open) return
    const items = wrapperRef.current?.querySelectorAll('details') || []
    items.forEach((el) => { if (el !== e.currentTarget) el.open = false })
  }

  const Item = ({ q, a, html }) => (
    <details
      onToggle={onToggle}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white/80 backdrop-blur
                 shadow-[0_10px_36px_rgba(37,99,235,0.10),0_2px_10px_rgba(0,199,177,0.18)]
                 transition-all duration-300 open:border-blue-600/50"
    >
      <summary
        className="flex list-none items-center gap-3 cursor-pointer px-5 py-4 select-none
                   text-[1.05rem] font-extrabold text-slate-900
                   [&::-webkit-details-marker]:hidden"
      >
        {/* marcador lateral en la summary */}
        <span
          className="inline-block h-6 w-1 rounded bg-gradient-to-b from-[#2563eb] to-[#00C7B1]
                     shadow-[0_0_14px_rgba(0,199,177,0.35)]"
          aria-hidden
        />
        <span className="flex-1 pr-6">{q}</span>
        <span
          className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full border
                     border-slate-200 text-slate-600 transition-transform duration-300
                     group-open:rotate-180 group-open:border-[#2563eb]/50 group-open:text-[#2563eb]"
          aria-hidden
        >
          <FaChevronDown className="text-sm" />
        </span>
      </summary>

      <div className="relative px-5 pb-5 pt-0">
        {/* barra de acento al abrir */}
        <span
          className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-r
                     bg-gradient-to-b from-[#2563eb] to-[#00C7B1]
                     opacity-0 transition-opacity duration-300 group-open:opacity-100"
        />
        {html ? (
          <p
            className="mt-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4 text-[1rem] leading-7 text-slate-700"
            dangerouslySetInnerHTML={{ __html: a }}
          />
        ) : (
          <p className="mt-2 rounded-lg border border-slate-200 bg-slate-50/80 p-4 text-[1rem] leading-7 text-slate-700">
            {a}
          </p>
        )}
      </div>
    </details>
  )

  return (
    <section
      className="mx-auto my-14 max-w-4xl rounded-2xl border-2 border-slate-200 bg-white/70 p-8 backdrop-blur
                 shadow-[0_12px_44px_rgba(37,99,235,0.12),0_4px_16px_rgba(0,199,177,0.20)]"
      data-aos="fade-up"
    >
      <h2 className="mb-6 text-center text-[2rem] font-black text-slate-900">
        {t('home.faq.title')}
      </h2>

      <div ref={wrapperRef} className="space-y-4">
        <Item q={t('home.faq.q1')} a={t('home.faq.a1')} />
        <Item q={t('home.faq.q2')} a={t('home.faq.a2')} />
        <Item q={t('home.faq.q3')} a={t('home.faq.a3')} />
        <Item q={t('home.faq.q4')} a={t('home.faq.a4')} />
        <Item q={t('home.faq.q5')} a={t('home.faq.a5')} html />
      </div>
    </section>
  )
}

