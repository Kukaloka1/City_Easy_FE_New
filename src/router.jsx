import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import AppLayout from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Bali from '@/pages/Bali'           // demo visual pública
import Manual from '@/pages/Manual'
import Dashboard from '@/pages/Dashboard'
import CityRouter from '@/components/city/CityRouter'
import RequireAuth from '@/components/auth/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'bali', element: <Bali /> },         // libre para diseño
      { path: 'manual', element: <Manual /> },

      // Dashboard protegido
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard onCitySelect={(slug) => { window.location.href = `/city/${slug}` }} />
          </RequireAuth>
        ),
      },

      // Ciudad dinámica protegida
      {
        path: 'city/:slug',
        element: (
          <RequireAuth>
            <CitySlugWrapper />
          </RequireAuth>
        ),
      },

      // Fallback
      { path: '*', element: <Home /> },
    ],
  },
])

function CitySlugWrapper(){
  const onBack = () => { window.location.href = '/dashboard' }
  return <CityRouter onBack={onBack} />
}

export default router
