import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import {
  FaMapMarkedAlt, FaExclamationTriangle, FaChartBar, FaRobot,
  FaUserShield, FaCarCrash, FaCloudSunRain, FaBitcoin, FaTimes
} from 'react-icons/fa'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const icons = [
  <FaMapMarkedAlt key="0" />,
  <FaExclamationTriangle key="1" />,
  <FaChartBar key="2" />,
  <FaRobot key="3" />,
  <FaUserShield key="4" />,
  <FaCarCrash key="5" />,
  <FaCloudSunRain key="6" />,
  <FaBitcoin key="7" />,
]

export default function TutorialSlider({ onClose }) {
  const { t } = useTranslation()
  const slides = Array.from({ length: 8 }, (_, i) => ({
    icon: icons[i],
    title: t(`tutorial.slides.${i}.title`),
    content: t(`tutorial.slides.${i}.content`),
  }))

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const settings = {
    dots: true,
    infinite: false,
    speed: 420,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    appendDots: dots => (
      <div className="mt-4">
        <ul className="flex items-center justify-center gap-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <span className="block h-1.5 w-6 rounded-full bg-slate-400 transition-colors"></span>
    ),
  }

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] grid place-items-center"
        onMouseDown={(e)=> { if (e.target === e.currentTarget) onClose?.() }}
      >
        {/* backdrop oscuro + blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_-20%,rgba(15,23,42,0.6),transparent)] bg-slate-900/70 backdrop-blur-2xl"
        />

        {/* tarjeta glass oscura con alto contraste */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          className="relative w-[min(92vw,720px)] rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/5 backdrop-saturate-150"
        >
          {/* halo sutil */}
          <div className="pointer-events-none absolute inset-0 rounded-[28px] [background:linear-gradient(140deg,rgba(255,255,255,0.12),rgba(148,163,184,0.08))] [mask:linear-gradient(#000,transparent)]" />

          {/* cerrar */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white shadow hover:bg-white/20"
            aria-label="Close tutorial"
          >
            <FaTimes />
          </button>

          <Slider {...settings}>
            {slides.map((s, idx) => (
              <div key={idx}>
                <div className="px-4 py-8 text-center text-white">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-4xl text-white shadow-inner backdrop-blur">
                    {s.icon}
                  </div>
                  <h3 className="mb-2 text-[1.25rem] font-extrabold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mx-auto max-w-[60ch] text-[1.05rem] leading-7 text-slate-200">
                    {s.content}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          <div className="mt-5 grid place-items-center">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-white/90 px-6 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white"
            >
              {t('tutorial.close')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
