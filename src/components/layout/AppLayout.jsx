import React from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'

export default function AppLayout(){
  return (
    <div className="min-h-dvh bg-[#eef2f7] text-[#0f172a]">
      <header className="border-b bg-white/70 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-black text-xl">CityEasy</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/bali" className={({isActive}) => isActive ? 'text-blue-600' : 'hover:text-blue-600'}>Bali</NavLink>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="border-t text-center text-xs text-slate-500 py-6">
        © {new Date().getFullYear()} CityEasy
      </footer>
    </div>
  )
}
