import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseApp } from '@/lib/firebaseClient'

export async function uploadImageAndGetURL(file){
  const storage = getStorage(firebaseApp)
  const path = `incidents/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`
  const r = ref(storage, path)
  const snap = await uploadBytes(r, file, { contentType: file.type })
  return await getDownloadURL(snap.ref)
}
