import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'
import LanguageToggle from "@/i18n/LanguageToggle";
import AuthDebugBadge from '@/components/auth/AuthDebugBadge'


export default function AppLayout(){
  const nav = useNavigate()
  const loc = useLocation()
  const [authed, setAuthed] = React.useState(false)

  React.useEffect(()=>{
    const auth = getAuth(firebaseApp)
    const off = onAuthStateChanged(auth, u => setAuthed(!!u))
    return () => off()
  },[])

  const onLogin = () => nav('/dashboard')
  const onLogout = async () => { try { await signOut(getAuth(firebaseApp)) } catch {} nav('/', { replace:true }) }

  const onHome = loc.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src="/city.svg" alt="CityEasy" className="h-8 w-8" />
            <span className="text-lg font-black tracking-tight">CityEasy</span>
          </Link>

          <nav className="flex items-center gap-3 text-sm font-semibold">
            <LanguageToggle />
            {!authed && onHome && (
              <button onClick={onLogin} className="rounded-lg px-2 py-1 hover:underline">Login</button>
            )}
            {authed && (
              <button onClick={onLogout} className="rounded-lg px-2 py-1 hover:underline">Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main><Outlet /></main>
      <AuthDebugBadge />
    </div>
  )
}
