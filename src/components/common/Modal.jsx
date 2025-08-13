import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Modal({ open, onClose, children, title }){
  React.useEffect(()=>{
    const onKey = (e)=> { if (e.key === 'Escape') onClose?.() }
    if(open) window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center" onMouseDown={(e)=> { if (e.target === e.currentTarget) onClose?.() }}>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-slate-900/70 backdrop-blur" />
          <motion.div initial={{opacity:0, y:12, scale:.98}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:8, scale:.98}} className="relative w-[min(92vw,640px)] rounded-2xl border border-white/10 bg-white p-5 shadow-2xl">
            {title && <h3 className="mb-3 text-lg font-bold">{title}</h3>}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
