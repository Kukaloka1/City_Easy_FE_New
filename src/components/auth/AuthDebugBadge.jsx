import React from 'react'
import { getAuth, onAuthStateChanged, getIdTokenResult } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'

export default function AuthDebugBadge(){
  if (import.meta.env.VITE_DEBUG_AUTH !== 'true') return null
  const [state, setState] = React.useState({ uid:null, anon:null, exp:null })

  React.useEffect(()=>{
    const auth = getAuth(firebaseApp)
    const off = onAuthStateChanged(auth, async (u) => {
      if (!u) { setState({ uid:null, anon:null, exp:null }); return }
      try {
        const res = await getIdTokenResult(u, true)
        const exp = new Date(res.expirationTime)
        setState({ uid: u.uid, anon: u.isAnonymous ?? null, exp })
      } catch {
        setState({ uid: u.uid, anon: u.isAnonymous ?? null, exp: null })
      }
    })
    return () => off()
  },[])

  const { uid, anon, exp } = state
  return (
    <div className="fixed bottom-3 right-3 rounded-lg border bg-white/90 px-3 py-1 text-xs font-semibold shadow">
      Auth: {uid ? 'OK' : 'NO'}
      {uid && <> · {anon ? 'anon' : 'user'} · exp {exp?.toLocaleTimeString?.() || '—'} · {uid.slice(0,6)}…</>}
    </div>
  )
}
