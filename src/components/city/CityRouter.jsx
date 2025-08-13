import React from 'react'
import { useParams } from 'react-router-dom'

export default function CityRouter({ onBack }) {
  const { slug } = useParams()
  return (
    <div className="space-y-3">
      <button onClick={onBack} className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50">← Back to Dashboard</button>
      <h1 className="text-2xl font-bold">City: {slug?.toUpperCase()}</h1>
      <p className="text-slate-600">Here we will mount the actual city module (map, incidents, etc.).</p>
    </div>
  )
}
