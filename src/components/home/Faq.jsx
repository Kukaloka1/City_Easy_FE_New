import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Faq(){
  const { t } = useTranslation()
  return (
    <section className="mx-auto my-14 max-w-3xl rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur" data-aos="fade-up">
      <h2 className="mb-6 text-center text-[2rem] font-black text-slate-900">{t('home.faq.title')}</h2>
      <div className="space-y-3">
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-[1.05rem] font-extrabold text-blue-600">{t('home.faq.q1')}</summary>
          <p className="mt-2 text-[1rem] text-slate-600">{t('home.faq.a1')}</p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-[1.05rem] font-extrabold text-blue-600">{t('home.faq.q2')}</summary>
          <p className="mt-2 text-[1rem] text-slate-600">{t('home.faq.a2')}</p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-[1.05rem] font-extrabold text-blue-600">{t('home.faq.q3')}</summary>
          <p className="mt-2 text-[1rem] text-slate-600">{t('home.faq.a3')}</p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-[1.05rem] font-extrabold text-blue-600">{t('home.faq.q4')}</summary>
          <p className="mt-2 text-[1rem] text-slate-600">{t('home.faq.a4')}</p>
        </details>
        <details className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <summary className="cursor-pointer text-[1.05rem] font-extrabold text-blue-600">{t('home.faq.q5')}</summary>
          <p className="mt-2 text-[1rem] text-slate-600" dangerouslySetInnerHTML={{ __html: t('home.faq.a5') }} />
        </details>
      </div>
    </section>
  )
}
