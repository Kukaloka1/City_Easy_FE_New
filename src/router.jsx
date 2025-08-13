import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import Home from '@/pages/Home'
import Bali from '@/pages/Bali'

export default createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'bali', element: <Bali /> }
    ]
  }
])
