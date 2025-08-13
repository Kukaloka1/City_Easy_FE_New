import { firebaseApp } from '@/lib/firebaseClient'
import { getAuth, signInAnonymously, getIdToken } from 'firebase/auth'

/** Devuelve un token JWT de Firebase si hay usuario.
 *  Intenta sign-in anónimo si no existe (si está habilitado en Firebase Console).
 */
export async function getAuthToken() {
  try {
    const auth = getAuth(firebaseApp)
    if (!auth.currentUser) {
      try {
        await signInAnonymously(auth) // requiere "Anonymous" habilitado
      } catch (e) {
        // si no está habilitado, seguimos sin romper el flujo
        return null
      }
    }
    const token = await getIdToken(auth.currentUser, /*forceRefresh*/ true)
    return token
  } catch (err) {
    console.error('[auth] getAuthToken error:', err?.message || err)
    return null
  }
}
