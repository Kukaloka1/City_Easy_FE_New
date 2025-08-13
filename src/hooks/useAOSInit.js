import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function useAOSInit(opts={ duration:900, once:false }) {
  useEffect(() => { AOS.init(opts) }, [])
}
