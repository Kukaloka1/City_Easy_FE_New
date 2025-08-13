import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'

async function authHeaders() {
  const u = getAuth(firebaseApp).currentUser
  const h = { 'Content-Type': 'application/json' }
  if (u) h.Authorization = `Bearer ${await u.getIdToken()}`
  return h
}

const BASE = import.meta.env.VITE_INCIDENTS_API_URL // e.g. http://localhost:5000/api/incidents

export async function getRecentIncidents(city, limit=20){
  if(!BASE) throw new Error('VITE_INCIDENTS_API_URL missing')
  const url = `${BASE}?city=${encodeURIComponent(city)}&limit=${limit}`
  const res = await fetch(url, { headers: await authHeaders() })
  if(!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  return (Array.isArray(data) ? data : data?.items || []).map(it => ({
    id: it.id || it._id || it.uuid || crypto.randomUUID(),
    type: it.type || 'traffic',
    description: it.description || '',
    timestamp: it.timestamp || it.createdAt || Date.now(),
    latitude: it.latitude ?? it.lat ?? null,
    longitude: it.longitude ?? it.lng ?? it.lon ?? null,
    photoURL: it.photoURL || it.photo || null,
    location: it.location || it.address || '',
  }))
}

export async function createIncident(payload){
  if(!BASE) throw new Error('VITE_INCIDENTS_API_URL missing')
  const res = await fetch(BASE, {
    method: 'POST',
    headers: await authHeaders(),
    body: JSON.stringify(payload),
  })
  if(!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
