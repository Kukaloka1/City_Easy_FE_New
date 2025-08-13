import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '@/components/common/Loader'
import useAuthInit from '@/hooks/useAuthInit'

export default function RequireAuth({ children }) {
  const REQUIRE = (import.meta.env.VITE_REQUIRE_AUTH ?? 'true') !== 'false'
  if (!REQUIRE) return children

  const { user, loading } = useAuthInit()
  const loc = useLocation()

  if (loading) return <Loader isLoading fullscreen message="Loading…" />
  if (!user) return <Navigate to="/" replace state={{ from: loc }} />
  return children
}
