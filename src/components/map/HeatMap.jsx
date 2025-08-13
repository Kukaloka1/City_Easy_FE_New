// src/features/map/HeatMap.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

let L
async function ensureLeaflet(){
  if (!L) {
    const leaflet = await import('leaflet')
    await import('leaflet.heat')
    L = leaflet.default || leaflet
  }
}

const DEFAULT_CENTER = [-8.5, 115.15]
const pick = (it) => [it.latitude, it.longitude, 1]

export default function HeatMap({ incidents = [], center = DEFAULT_CENTER, zoom = 11, interactive = true }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const heatLayersRef = useRef([])
  const [ready, setReady] = useState(false)

  const groups = useMemo(() => {
    const now = Date.now()
    const limit = now - 24 * 60 * 60 * 1000
    const recent = incidents.filter(
      i => i?.latitude && i?.longitude && (+new Date(i.timestamp) > limit)
    )
    return {
      accident: recent.filter(i => i.type === 'accident').map(pick),
      traffic:  recent.filter(i => i.type === 'traffic').map(pick),
      crime:    recent.filter(i => i.type === 'crime').map(pick),
      disaster: recent.filter(i => i.type === 'disaster').map(pick),
      weather:  recent.filter(i => i.type === 'weather').map(pick),
    }
  }, [incidents])

  // Init 1 vez
  useEffect(() => {
    let mounted = true
    ;(async () => {
      await ensureLeaflet()
      if (!mounted || !containerRef.current || mapRef.current) return
      mapRef.current = L.map(containerRef.current).setView(center, zoom)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current)
      setReady(true)
    })()
    return () => {
      mounted = false
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null }
    }
  }, [center, zoom])

  // Refresca heatlayers
  useEffect(() => {
    if (!ready || !mapRef.current) return
    heatLayersRef.current.forEach(layer => { if (layer) mapRef.current.removeLayer(layer) })
    heatLayersRef.current = []

    const addHeat = (data, color) => {
      if (!data.length) return
      const layer = L.heatLayer(data, {
        radius: 25, blur: 15, maxZoom: 17,
        gradient: { 0.2: color, 0.4: color, 0.6: color, 0.8: color, 1: color },
        opacity: 0.8
      }).addTo(mapRef.current)
      heatLayersRef.current.push(layer)
    }

    addHeat(groups.accident,  '#ff9100')
    addHeat(groups.traffic,   '#007bff')
    addHeat(groups.crime,     '#ff2323')
    addHeat(groups.disaster,  '#28a745')
    addHeat(groups.weather,   '#00e1ff')
  }, [groups, ready])

  // Habilita/Deshabilita interacción
  useEffect(() => {
    if (!mapRef.current) return
    const m = mapRef.current
    if (interactive) {
      m.dragging.enable()
      m.scrollWheelZoom.enable()
      m.doubleClickZoom.enable()
      m.touchZoom.enable()
      m.boxZoom.enable()
      m.keyboard.enable()
      containerRef.current?.classList.remove('pointer-events-none')
    } else {
      m.dragging.disable()
      m.scrollWheelZoom.disable()
      m.doubleClickZoom.disable()
      m.touchZoom.disable()
      m.boxZoom.disable()
      m.keyboard.disable()
      containerRef.current?.classList.add('pointer-events-none')
    }
  }, [interactive])

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] w-full overflow-hidden rounded-xl border bg-white"
    />
  )
}
