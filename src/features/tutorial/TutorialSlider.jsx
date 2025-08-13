import React from 'react'
import { motion } from 'framer-motion'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import {
  FaMapMarkedAlt, FaExclamationTriangle, FaChartBar, FaRobot,
  FaUserShield, FaCarCrash, FaCloudSunRain, FaBitcoin
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 420,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-[620px] rounded-2xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur"
      >
        <Slider {...settings}>
          {slides.map((s, idx) => (
            <div key={idx}>
              <div className="px-2 py-6 text-center text-slate-50">
                <div className="mx-auto mb-4 grid h-16 w-16 place-items-center text-4xl text-yellow-400 drop-shadow-[0_2px_8px_rgba(255,192,0,0.25)]">
                  {s.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-wide text-yellow-300">
                  {s.title}
                </h3>
                <p className="mx-auto max-w-[52ch] text-[1.02rem] leading-7 text-amber-50/95">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
        </Slider>

        <div className="mt-4 grid place-items-center">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-200 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md hover:from-yellow-300 hover:to-amber-100"
          >
            {t('tutorial.close')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
