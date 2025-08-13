import React from 'react'
import { useTranslation } from 'react-i18next'
import useRevealOnScroll from '@/hooks/useRevealOnScroll'
import { FaShieldAlt, FaMapMarkedAlt, FaRobot, FaBell } from 'react-icons/fa'

export default function HowItWorks(){
  const { t } = useTranslation()
  useRevealOnScroll('[data-roadmap-step]')
  const steps = [
    { n:1, icon:<FaShieldAlt className="text-lime-500 text-3xl" />, title: t('home.how.step1.title'), desc: t('home.how.step1.desc'), html:true },
    { n:2, icon:<FaMapMarkedAlt className="text-lime-500 text-3xl" />, title: t('home.how.step2.title'), desc: t('home.how.step2.desc'), html:true },
    { n:3, icon:<FaRobot className="text-lime-500 text-3xl" />, title: t('home.how.step3.title'), desc: t('home.how.step3.desc'), html:true },
    { n:4, icon:<FaBell className="text-lime-500 text-3xl" />, title: t('home.how.step4.title'), desc: t('home.how.step4.desc'), html:true },
  ]
  return (
    <section className="mx-auto my-16 max-w-5xl rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 shadow-[0_8px_36px_rgba(0,199,177,0.25)]" data-aos="fade-up">
      <h2 className="text-center text-3xl font-black uppercase tracking-[0.1em] text-slate-900 drop-shadow-[0_2px_6px_rgba(0,199,177,0.22)]">
        {t('home.howTitle')}
      </h2>
      <div className="relative mt-8 flex justify-center">
        <div className="pointer-events-none absolute left-1/2 top-10 h-[calc(100%-5rem)] w-1 -translate-x-1/2 rounded bg-gradient-to-b from-blue-600 to-teal-500 shadow-[0_0_18px_rgba(37,99,235,0.2)]" />
        <div className="z-10 flex w-full max-w-3xl flex-col gap-10">
          {steps.map(s=>(
            <div key={s.n} className="relative flex min-h-[110px] items-start">
              <div className="absolute left-1/2 top-0 z-20 h-[27px] w-[27px] -translate-x-1/2 rounded-full border-[4.5px] border-blue-600 bg-blue-600 shadow-[0_2px_12px_black]" />
              <div data-roadmap-step className="relative z-10 ml-[70px] max-w-[480px] opacity-80 rounded-xl border border-slate-200 bg-slate-900/95 p-6 text-left text-white transition-all duration-300">
                <span className="absolute -left-12 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-lime-500 bg-slate-50 text-[0.95rem] font-black text-blue-600 shadow-[0_1px_9px_rgba(0,199,177,0.22)]">
                  {s.n}
                </span>
                <div className="mb-2">{s.icon}</div>
                <b className="mb-1 block text-[1.12rem] font-black tracking-tight text-slate-100">{s.title}</b>
                {s.html
                  ? <p className="text-[1rem] font-medium leading-7 text-white" dangerouslySetInnerHTML={{ __html: s.desc }} />
                  : <p className="text-[1rem] font-medium leading-7 text-white">{s.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
