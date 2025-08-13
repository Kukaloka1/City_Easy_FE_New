import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import AuthDebugBadge from '@/components/auth/AuthDebugBadge'

export default function AppLayout(){
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/city.svg" alt="CityEasy" className="h-8 w-8" />
            <span className="text-lg font-black tracking-tight">CityEasy</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <Link className="hover:underline" to="/dashboard">Dashboard</Link>
            <Link className="hover:underline" to="/manual">Manual</Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <AuthDebugBadge />
    </div>
  )
}
