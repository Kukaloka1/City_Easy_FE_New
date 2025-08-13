import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'
import LanguageToggle from '@/i18n/LanguageToggle'
import AuthDebugBadge from '@/components/auth/AuthDebugBadge'

export default function AppLayout(){
  const nav = useNavigate()
  const loc = useLocation()
  const [authed, setAuthed] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(()=>{
    const auth = getAuth(firebaseApp)
    const off = onAuthStateChanged(auth, u => setAuthed(!!u))
    return () => off()
  },[])

  React.useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  },[])

  const onLogin  = () => nav('/dashboard')
  const onLogout = async () => { try { await signOut(getAuth(firebaseApp)) } catch {} nav('/', { replace:true }) }

  const onHome = loc.pathname === '/'

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header glass, sin hovers */}
      <header
        className={[
          "sticky top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "bg-white/70 backdrop-blur-md border-slate-200/70 shadow-sm"
            : "bg-white/60 backdrop-blur-md border-slate-200/50"
        ].join(' ')}
      >
        <div className={["mx-auto flex max-w-7xl items-center justify-between px-4", scrolled ? "py-2.5" : "py-3.5"].join(' ')}>
          {/* Brand: logo como antes + texto negro */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/city.svg" alt="CityEasy" className="h-8 w-8" />
            <span className="text-lg font-black tracking-tight text-slate-900">CityEasy</span>
          </Link>

          {/* Actions: sin hover, estilo glass sutil */}
          <nav className="flex items-center gap-2 text-sm font-semibold">
            <div className="rounded-xl border border-white/60 bg-white/50 px-2 py-1 shadow-sm backdrop-blur-sm">
              <LanguageToggle />
            </div>

            {!authed && onHome && (
              <button
                onClick={onLogin}
                className="rounded-lg border border-white/60 bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                Login
              </button>
            )}

            {authed && (
              <button
                onClick={onLogout}
                className="rounded-lg border border-white/60 bg-white/60 px-3 py-1.5 shadow-sm backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main><Outlet /></main>
      <AuthDebugBadge />
    </div>
  )
}

