import React from 'react'
export default function Loader({ isLoading=true, fullscreen=false, message='Loading...' }){
  if(!isLoading) return null
  return (
    <div className={`flex items-center justify-center ${fullscreen ? 'fixed inset-0' : 'p-8'} bg-white/70 backdrop-blur`}>
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <div className="text-sm font-semibold text-slate-700">{message}</div>
      </div>
    </div>
  )
}
