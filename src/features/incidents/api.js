import { getAuth } from 'firebase/auth'
import { firebaseApp } from '@/lib/firebaseClient'

async function getFirebaseToken(){
  const u = getAuth(firebaseApp).currentUser
  return u ? u.getIdToken() : null
}

async function httpGet(url){
  const headers = { 'Content-Type': 'application/json' }
  const token = await getFirebaseToken()
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

// Incidentes recientes por ciudad
export async function getRecentIncidents(city, limit=20){
  const base = import.meta.env.VITE_INCIDENTS_API_URL
  if(!base) throw new Error('VITE_INCIDENTS_API_URL missing')
  const url = `${base}?city=${encodeURIComponent(city)}&limit=${limit}`
  const data = await httpGet(url)
  // Normaliza campos típicos
  return (Array.isArray(data) ? data : data?.items || []).map(it => ({
    id: it.id || it._id || it.uuid || crypto.randomUUID(),
    type: it.type || it.category || 'traffic',
    description: it.description || it.text || '',
    timestamp: it.timestamp || it.createdAt || Date.now(),
    latitude: it.latitude ?? it.lat ?? null,
    longitude: it.longitude ?? it.lng ?? it.lon ?? null,
    photoURL: it.photoURL || it.photo || null,
    location: it.location || it.address || '',
  }))
}
