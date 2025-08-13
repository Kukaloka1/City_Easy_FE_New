import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAOSInit from '@/hooks/useAOSInit'
import Loader from '@/components/common/Loader'

import HomeHero from '@/components/home/HomeHero'
import ProblemSolution from '@/components/home/ProblemSolution'
import FeaturesGrid from '@/components/home/FeaturesGrid'
import CitiesGrid from '@/components/home/CitiesGrid'
import HowItWorks from '@/components/home/HowItWorks'
import CtaBanner from '@/components/home/CtaBanner'
import Faq from '@/components/home/Faq'
import HomeFooter from '@/components/home/HomeFooter'

export default function Home(){
  useAOSInit()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleCTA = () => {
    setIsLoading(true)
    setTimeout(()=> navigate('/dashboard', { replace: false }), 300)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {isLoading && <Loader isLoading={true} fullscreen message="Loading…" />}
      <HomeHero onCTA={handleCTA} isLoading={isLoading} />
      <ProblemSolution />
      <FeaturesGrid />
      <CitiesGrid />
      <HowItWorks />
      <CtaBanner onCTA={handleCTA} isLoading={isLoading} />
      <Faq />
      <HomeFooter />
    </div>
  )
}
