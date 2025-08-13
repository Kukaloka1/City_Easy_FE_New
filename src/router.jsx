import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'

import Home from '@/pages/Home'
import Manual from '@/pages/Manual'

import Dashboard from '@/pages/Dashboard'
import CityPage from '@/pages/CityPage'
import RequireAuth from '@/components/auth/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'manual', element: <Manual /> },

      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: 'city/:slug',
        element: (
          <RequireAuth>
            <CityPage />
          </RequireAuth>
        ),
      },

      { path: '*', element: <Home /> },
    ],
  },
])

export default router
