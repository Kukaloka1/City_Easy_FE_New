import React from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'

export default function AuthDebugBadge(){
  const [uid, setUid] = React.useState(null)
  React.useEffect(()=>{
    const auth = getAuth(firebaseApp)
    const off = onAuthStateChanged(auth, u => setUid(u?.uid ?? null))
    return () => off()
  },[])
  if (import.meta.env.VITE_DEBUG_AUTH !== 'true') return null
  return (
    <div className="fixed bottom-3 right-3 rounded-lg border bg-white/90 px-3 py-1 text-xs font-semibold shadow">
      Auth: {uid ? 'OK' : 'NO'} {uid && <span className="ml-1 text-slate-500">{uid.slice(0,6)}…</span>}
    </div>
  )
}
