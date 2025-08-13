import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaMapMarkedAlt, FaRobot, FaBell, FaGlobeAsia } from 'react-icons/fa'

const items = (t) => ([
  { icon: <FaShieldAlt className="h-9 w-9 text-blue-600" />, title: t('home.features.card1.title'), desc: t('home.features.card1.desc'), html: true },
  { icon: <FaMapMarkedAlt className="h-9 w-9 text-blue-600" />, title: t('home.features.card2.title'), desc: t('home.features.card2.desc'), html: true },
  { icon: <FaBell className="h-9 w-9 text-blue-600" />, title: t('home.features.card3.title'), desc: t('home.features.card3.desc'), html: true },
  { icon: <FaRobot className="h-9 w-9 text-blue-600" />, title: t('home.features.card4.title'), desc: t('home.features.card4.desc'), html: true },
  { icon: <FaBell className="h-9 w-9 text-blue-600" />, title: t('home.features.card5.title'), desc: t('home.features.card5.desc'), html: true },
  { icon: <FaGlobeAsia className="h-9 w-9 text-blue-600" />, title: t('home.features.card6.title'), desc: t('home.features.card6.desc'), html: true },
])

export default function FeaturesGrid(){
  const { t } = useTranslation()
  const list = items(t)
  return (
    <section className="mx-auto my-14 max-w-6xl px-4" data-aos="fade-up">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f,i)=>(
          <div key={i} className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
            <div className="mb-3">{f.icon}</div>
            <h4 className="text-[1.12rem] font-black tracking-tight text-slate-900">{f.title}</h4>
            {f.html
              ? <p className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: f.desc }} />
              : <p className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600">{f.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
