import { useEffect, useState } from 'react'
import { getAuthToken } from '@/services/authService'

export default function useAuthInit() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const run = async () => {
      try {
        const token = await getAuthToken()
        if (!alive) return
        setUser(token ? { token } : null)
      } catch (_) {
        if (!alive) return
        setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [])

  return { user, loading }
}
