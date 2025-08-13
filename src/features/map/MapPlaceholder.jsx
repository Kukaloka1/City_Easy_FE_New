import React from 'react'
export default function MapPlaceholder({ city }){
  return (
    <div className="grid place-items-center h-64 rounded-xl border bg-white text-slate-500">
      Map for {city.name} (center: {city.center.join(', ')}) — Leaflet here
    </div>
  )
}
