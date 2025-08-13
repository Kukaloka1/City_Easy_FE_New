import "./i18n/index.js"
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'

const AppTree = import.meta.env.PROD
  ? (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    )
  : (
      // En desarrollo SIN StrictMode para evitar dobles useEffect/fetch
      <RouterProvider router={router} />
    )

createRoot(document.getElementById('root')).render(AppTree)

