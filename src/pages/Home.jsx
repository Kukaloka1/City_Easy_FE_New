import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FaShieldAlt, FaMapMarkedAlt, FaRobot, FaBell, FaGlobeAsia } from 'react-icons/fa'
import Loader from '@/components/common/Loader'
import LanguageToggle from '@/components/layout/LanguageToggle'
import { useTranslation } from 'react-i18next'

const CITIES = [
  { name: 'Bali', img: '/bali.svg', descKey: 'home.cities.bali' },
  { name: 'Jakarta', img: '/jakarta.svg', descKey: 'home.cities.jakarta' },
  { name: 'Bangkok', img: '/bangkok.svg', descKey: 'home.cities.bangkok' },
  { name: 'Singapore', img: '/singapore.svg', descKey: 'home.cities.singapore' },
  { name: 'Kuala Lumpur', img: '/kl.svg', descKey: 'home.cities.kl' },
  { name: 'Da Nang', img: '/danang.svg', descKey: 'home.cities.danang' },
]

export default function Home(){
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  useEffect(()=>{ AOS.init({ duration: 900, once: false }) },[])

  useEffect(()=>{
    const steps = Array.from(document.querySelectorAll('[data-roadmap-step]'))
    const onScroll = () => {
      steps.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const visible = rect.top < window.innerHeight - 120
        el.classList.toggle('opacity-100', visible)
        el.classList.toggle('opacity-80', !visible)
        el.classList.toggle('-translate-y-3', visible)
        el.classList.toggle('scale-[1.02]', visible)
        el.classList.toggle('shadow-[0_8px_32px_rgba(37,99,235,0.2)]', visible)
      })
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  const handleLogin = () => {
    setIsLoading(true)
    setTimeout(()=> navigate('/dashboard', { replace: true }), 800)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <LanguageToggle />
      {isLoading ? (
        <Loader isLoading={isLoading} fullscreen message={t('home.loading')} />
      ) : (
        <>
          {/* HERO */}
          <section className="relative grid min-h-[74vh] items-center overflow-hidden" data-aos="fade-up">
            {/* BG logo izq */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-full w-[56vw] flex items-center justify-center">
                <img src="/city.svg" alt="CityEasy Logo" className="w-[70%] opacity-[0.31] -mr-40" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-6xl justify-end px-4">
              <div className="w-full md:w-[54vw] py-16">
                <h1 className="text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.95] tracking-[-.03em] text-blue-600 drop-shadow-[0_2px_8px_rgba(0,199,177,0.09)]">
                  <span className="block">{t('home.hero.title.part1')}</span>{' '}
                  <span className="block">{t('home.hero.title.part2')}</span>
                  <span className="mt-2 inline-block rounded-md border border-blue-600 bg-blue-600 px-4 py-1 text-[0.55em] font-black text-slate-100 shadow-[0_12px_36px_rgba(37,99,235,0.14),0_2px_9px_rgba(37,99,235,1)]">
                    {t('home.hero.yellowSubtitle')}
                  </span>
                </h1>

                <h2 className="mt-4 text-[clamp(1.3rem,3.2vw,2.07rem)] font-extrabold text-lime-500 tracking-[-0.02em] drop-shadow-[0_1px_5px_rgba(0,199,177,0.2)]">
                  {t('home.hero.subtitle')}
                </h2>

                <p
                  className="mt-2 text-[1.05rem] font-medium leading-relaxed text-slate-800"
                  dangerouslySetInnerHTML={{ __html: t('home.hero.tagline1') }}
                />
                <p
                  className="mt-3 text-[1.05rem] font-medium leading-relaxed text-slate-800"
                  dangerouslySetInnerHTML={{ __html: t('home.hero.tagline2') }}
                />

                <button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="mt-6 inline-flex select-none items-center justify-center rounded-md border-2 border-teal-400 bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-4 text-[1.05rem] font-black uppercase tracking-wider text-white shadow-[0_6px_22px_rgba(30,70,150,0.14)] transition-transform duration-200 hover:scale-105 hover:from-blue-600 hover:to-teal-500"
                >
                  {isLoading ? t('home.loading') : t('home.ctaPrimary')}
                </button>
              </div>
            </div>
          </section>

          {/* PROBLEM / SOLUTION */}
          <section className="mx-auto my-16 max-w-6xl rounded-2xl border border-white/60 bg-white/60 p-8 shadow-[0_16px_48px_-12px_rgba(0,0,0,.15)] backdrop-blur md:grid md:grid-cols-2 md:gap-6" data-aos="fade-up">
            <div className="rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
              <h3 className="mb-4 text-[1.4rem] font-black uppercase tracking-tight">{t('home.gapTitle')}</h3>
              <ul className="space-y-3">
                <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">
                  {t('home.gapLi1')}
                </li>
                <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">
                  {t('home.gapLi2')}
                </li>
                <li className="relative pl-5 text-[1.02rem] font-semibold text-slate-800 before:absolute before:left-0 before:top-2 before:h-2.5 before:w-2.5 before:rounded-full before:bg-lime-500">
                  {t('home.gapLi3')}
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-white/60 bg-white/60 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur md:mt-0">
              <h3 className="mb-4 text-[1.4rem] font-black uppercase tracking-tight">{t('home.solutionTitle')}</h3>
              <ul className="space-y-3">
                <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi1') }} />
                <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi2') }} />
                <li className="text-[1.02rem] font-semibold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.solutionLi3') }} />
              </ul>
            </div>

            {/* Misión centrada */}
            <div className="col-span-2 mt-8 text-center">
              <h4 className="text-[1.2rem] font-black uppercase tracking-widest text-lime-500">{t('home.missionTitle')}</h4>
              <p className="mx-auto mt-3 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">{t('home.missionP1')}</p>
              <p className="mx-auto mt-2 max-w-3xl text-[1.05rem] font-semibold leading-7 text-slate-800">{t('home.missionP2')}</p>
            </div>
          </section>

          {/* FEATURES */}
          <section className="mx-auto my-14 max-w-6xl px-4" data-aos="fade-up">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <FaShieldAlt className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card1.title'), tdesc: t('home.features.card1.desc'), html: true },
                { icon: <FaMapMarkedAlt className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card2.title'), tdesc: t('home.features.card2.desc'), html: true },
                { icon: <FaBell className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card3.title'), tdesc: t('home.features.card3.desc'), html: true },
                { icon: <FaRobot className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card4.title'), tdesc: t('home.features.card4.desc'), html: true },
                { icon: <FaBell className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card5.title'), tdesc: t('home.features.card5.desc'), html: true },
                { icon: <FaGlobeAsia className="h-9 w-9 text-blue-600" />, ttitle: t('home.features.card6.title'), tdesc: t('home.features.card6.desc'), html: true },
              ].map((f, i)=>(
                <div key={i} className="rounded-2xl border border-white/60 bg-white/70 p-6 shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
                  <div className="mb-3">{f.icon}</div>
                  <h4 className="text-[1.12rem] font-black tracking-tight text-slate-900">{f.ttitle}</h4>
                  {f.html ? (
                    <p className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600" dangerouslySetInnerHTML={{ __html: f.tdesc }} />
                  ) : (
                    <p className="mt-1 text-[1.01rem] font-medium leading-relaxed text-slate-600">{f.tdesc}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CITIES GRID */}
          <section className="mx-auto my-16 max-w-6xl px-4" data-aos="zoom-in">
            <h2 className="text-center text-3xl font-black uppercase tracking-tight text-slate-900 drop-shadow-[0_2px_6px_rgba(0,199,177,0.3)]">
              {t('home.citiesTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-[1.05rem] font-semibold leading-relaxed text-slate-600">
              {t('home.citiesDesc1')}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {CITIES.map(city=>(
                <div key={city.name} className="flex flex-col items-center">
                  <div className="relative mb-6 h-48 w-48">
                    <img src={city.img} alt={`${city.name} icon`} className="h-full w-full object-contain transition duration-300" loading="lazy" />
                  </div>
                  <div className="relative -mt-10 w-full max-w-xs rounded-2xl border border-white/60 bg-white/70 p-5 text-center shadow-[0_6px_36px_rgba(37,99,235,0.11),0_1px_8px_rgba(0,199,177,0.27)] backdrop-blur">
                    <span className="text-[1.2rem] font-black uppercase tracking-wide text-slate-900">{city.name}</span>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-slate-600">{t(city.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS (roadmap) */}
          <section className="mx-auto my-16 max-w-5xl rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 shadow-[0_8px_36px_rgba(0,199,177,0.25)]" data-aos="fade-up">
            <h2 className="text-center text-3xl font-black uppercase tracking-[0.1em] text-slate-900 drop-shadow-[0_2px_6px_rgba(0,199,177,0.22)]">
              {t('home.howTitle')}
            </h2>
            <div className="relative mt-8 flex justify-center">
              {/* Línea central */}
              <div className="pointer-events-none absolute left-1/2 top-10 h-[calc(100%-5rem)] w-1 -translate-x-1/2 rounded bg-gradient-to-b from-blue-600 to-teal-500 shadow-[0_0_18px_rgba(37,99,235,0.2)]" />
              <div className="z-10 flex w-full max-w-3xl flex-col gap-10">
                {[
                  { n:1, icon:<FaShieldAlt className="text-lime-500 text-3xl" />, ttitle: t('home.how.step1.title'), tdesc: t('home.how.step1.desc'), html:true },
                  { n:2, icon:<FaMapMarkedAlt className="text-lime-500 text-3xl" />, ttitle: t('home.how.step2.title'), tdesc: t('home.how.step2.desc'), html:true },
                  { n:3, icon:<FaRobot className="text-lime-500 text-3xl" />, ttitle: t('home.how.step3.title'), tdesc: t('home.how.step3.desc'), html:true },
                  { n:4, icon:<FaBell className="text-lime-500 text-3xl" />, ttitle: t('home.how.step4.title'), tdesc: t('home.how.step4.desc'), html:true },
                ].map((s)=>(
                  <div key={s.n} className="relative flex min-h-[110px] items-start">
                    {/* Dot */}
                    <div className="absolute left-1/2 top-0 z-20 h-[27px] w-[27px] -translate-x-1/2 rounded-full border-[4.5px] border-blue-600 bg-blue-600 shadow-[0_2px_12px_black]"></div>
                    {/* Card */}
                    <div
                      data-roadmap-step
                      className="relative z-10 ml-[70px] max-w-[480px] opacity-80 rounded-xl border border-slate-200 bg-slate-900/95 p-6 text-left text-white transition-all duration-300"
                    >
                      <span className="absolute -left-12 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border-2 border-lime-500 bg-slate-50 text-[0.95rem] font-black text-blue-600 shadow-[0_1px_9px_rgba(0,199,177,0.22)]">
                        {s.n}
                      </span>
                      <div className="mb-2">{s.icon}</div>
                      <b className="mb-1 block text-[1.12rem] font-black tracking-tight text-slate-100">{s.ttitle}</b>
                      {s.html ? (
                        <p className="text-[1rem] font-medium leading-7 text-white" dangerouslySetInnerHTML={{ __html: s.tdesc }} />
                      ) : (
                        <p className="text-[1rem] font-medium leading-7 text-white">{s.tdesc}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA (con SVG inline en lugar de data-URL) */}
          <section className="relative mx-auto my-16 max-w-xl overflow-hidden rounded-2xl border-2 border-blue-200 bg-blue-600 p-8 text-center text-white shadow-[0_6px_24px_rgba(0,199,177,0.31)]" data-aos="fade-up">
            <h2 className="text-2xl font-black uppercase tracking-wider">{t('home.ctaBlockTitle')}</h2>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="mt-4 inline-block rounded-md border-2 border-white bg-white px-6 py-3 text-[1.05rem] font-black uppercase tracking-wide text-blue-600 transition hover:bg-teal-500 hover:text-white"
            >
              {isLoading ? t('home.loading') : t('home.ctaBlockBtn')}
            </button>
            {/* wave */}
            <div className="pointer-events-none absolute -bottom-10 left-1/2 h-[90px] w-[120%] -translate-x-1/2">
              <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path fill="#f7fafc" fillOpacity="1" d="M0,288L1440,96L1440,320L0,320Z"></path>
              </svg>
            </div>
          </section>

          {/* FAQ */}
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

          {/* FOOTER */}
          <footer className="mx-auto my-12 flex max-w-5xl items-center justify-between gap-6 rounded-t-2xl border-t-2 border-slate-200 bg-[#F5FAFB] p-6 shadow-[0_0_44px_rgba(0,199,177,0.13)]">
            <a href="https://www.bittechnetwork.com" target="_blank" rel="noopener noreferrer">
              <img src="/bitlogo1.svg" alt="Bittech Network Logo" className="h-28 w-28 object-contain" />
            </a>
            <div className="flex flex-1 flex-col items-center gap-3 text-center">
              <div className="text-[1.05rem] font-bold text-slate-800" dangerouslySetInnerHTML={{ __html: t('home.footer.brand') }} />
              <div className="flex flex-wrap items-center justify-center gap-2 text-[1.05rem] font-bold">
                <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/about">{t('home.footer.about')}</a><span className="text-slate-300">·</span>
                <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/contact">{t('home.footer.contact')}</a><span className="text-slate-300">·</span>
                <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/privacy">{t('home.footer.privacy')}</a><span className="text-slate-300">·</span>
                <a className="text-lime-500 underline hover:no-underline hover:text-slate-900" href="/terms">{t('home.footer.terms')}</a>
              </div>
              <div className="text-lime-500" dangerouslySetInnerHTML={{ __html: t('home.footer.credit') }} />
            </div>
            <div className="flex flex-col items-center">
              <img src="/city.svg" alt="CityEasy Logo" className="h-28 w-28 object-contain" />
              <div className="text-sm font-semibold text-slate-600">CityEasy.org</div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
