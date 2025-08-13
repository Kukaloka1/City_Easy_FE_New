import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaMapMarkedAlt, FaExclamationTriangle, FaChartBar, FaRobot,
  FaUserShield, FaCarCrash, FaCloudSunRain, FaBitcoin
} from 'react-icons/fa';

export default function TutorialSlider({ onClose }) {
  const { t } = useTranslation();

  const slides = useMemo(() => ([
    { icon: <FaMapMarkedAlt />,  title: t('tutorial.slides.0.title'), content: t('tutorial.slides.0.content') },
    { icon: <FaExclamationTriangle />, title: t('tutorial.slides.1.title'), content: t('tutorial.slides.1.content') },
    { icon: <FaChartBar />,      title: t('tutorial.slides.2.title'), content: t('tutorial.slides.2.content') },
    { icon: <FaRobot />,         title: t('tutorial.slides.3.title'), content: t('tutorial.slides.3.content') },
    { icon: <FaUserShield />,    title: t('tutorial.slides.4.title'), content: t('tutorial.slides.4.content') },
    { icon: <FaCarCrash />,      title: t('tutorial.slides.5.title'), content: t('tutorial.slides.5.content') },
    { icon: <FaCloudSunRain />,  title: t('tutorial.slides.6.title'), content: t('tutorial.slides.6.content') },
    { icon: <FaBitcoin />,       title: t('tutorial.slides.7.title'), content: t('tutorial.slides.7.content') },
  ]), [t]);

  const [idx, setIdx] = useState(0);

  // swipe en móvil
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);

  const onTouchStart = (e) => { dragging.current = true; startX.current = e.touches[0].clientX; };
  const onTouchMove  = (e) => { if (!dragging.current) return; deltaX.current = e.touches[0].clientX - startX.current; };
  const onTouchEnd   = () => {
    if (!dragging.current) return;
    if (Math.abs(deltaX.current) > 40) {
      setIdx((i) => Math.max(0, Math.min(slides.length - 1, i + (deltaX.current < 0 ? 1 : -1))));
    }
    dragging.current = false; deltaX.current = 0; startX.current = 0;
  };

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(slides.length - 1, i + 1));

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-2xl border bg-white/85 backdrop-blur shadow-2xl p-6">
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {slides.map((s, i) => (
              <article key={i} className="w-full flex-shrink-0 px-2">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-900 text-white shadow">
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <h3 className="mt-4 text-center text-lg font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-center text-slate-600">
                  {s.content}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="rounded-xl border px-3 py-1 font-semibold hover:bg-slate-50 disabled:opacity-40"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-2 w-6 rounded-full ${i === idx ? 'bg-slate-900' : 'bg-slate-300'}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={idx === slides.length - 1}
            className="rounded-xl border px-3 py-1 font-semibold hover:bg-slate-50 disabled:opacity-40"
          >
            →
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          >
            {t('tutorial.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
