import { useEffect } from 'react'

export default function useRevealOnScroll(selector='[data-roadmap-step]') {
  useEffect(() => {
    const steps = Array.from(document.querySelectorAll(selector))
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
  }, [selector])
}
