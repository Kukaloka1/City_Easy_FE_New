import React from 'react'
const CITIES = ['bali','jakarta','bangkok','singapore','kl','danang']
export default function Dashboard({ onCitySelect }){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-slate-600">Pick your city:</p>
      <div className="flex flex-wrap gap-2">
        {CITIES.map(c => (
          <button key={c} onClick={()=>onCitySelect?.(c)}
            className="rounded-xl border px-4 py-2 font-semibold hover:bg-slate-50">
            {c.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
