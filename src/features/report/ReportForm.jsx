import React from 'react'
import DOMPurify from 'dompurify'
import { uploadImageAndGetURL } from '@/utils/upload'
import { useTranslation } from 'react-i18next'
import {
  FaMapMarkerAlt, FaImage, FaSpinner
} from 'react-icons/fa'

const TYPES = [
  { value: '', labelKey: 'report.selectType' },
  { value: 'crime', label: 'Kekerasan / Violence / Crime' },
  { value: 'traffic', label: 'Lalu Lintas / Traffic / Police' },
  { value: 'accident', label: 'Kecelakaan / Accident' },
  { value: 'disaster', label: 'Bencana / Disaster / Weather' },
]

export default function ReportForm({
  onSubmit,
  isSubmitting = false,
  lat,
  lng,
  onClose
}) {
  const { t } = useTranslation()

  // estado UI
  const [type, setType] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [file, setFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [fileName, setFileName] = React.useState('')
  const [err, setErr] = React.useState('')

  // ubicación (parte importante para iOS/Safari: pedirla por gesto)
  const [coords, setCoords] = React.useState({ lat: lat ?? null, lng: lng ?? null })
  const [locStatus, setLocStatus] = React.useState(lat != null && lng != null ? 'ok' : 'idle') // 'idle' | 'pending' | 'ok' | 'denied' | 'error'

  React.useEffect(() => {
    // sincroniza si CityPage nos pasa coordenadas nuevas
    if (lat != null && lng != null) {
      setCoords({ lat, lng })
      setLocStatus('ok')
    }
  }, [lat, lng])

  const askLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus('error')
      setErr(t('bali.errors.noGeolocation'))
      return
    }
    setErr('')
    setLocStatus('pending')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocStatus('ok')
      },
      () => {
        setLocStatus('denied')
        setErr(t('bali.errors.enableLocation'))
      }
    )
  }

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setFileName(f.name)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(f)
  }

  const maxLen = 100

  const submit = async (e) => {
    e.preventDefault()
    setErr('')

    if (!type) return setErr(t('report.errors.noType'))
    if (!desc.trim() || desc.length > maxLen)
      return setErr(t('report.errors.badDescription', { max: maxLen }))
    if (coords.lat == null || coords.lng == null)
      return setErr(t('report.errors.noLocation'))
    if (!file) return setErr(t('report.errors.noPhoto'))

    const clean = DOMPurify.sanitize(desc)
    const photoURL = await uploadImageAndGetURL(file)
    await onSubmit({
      type,
      description: clean,
      latitude: coords.lat,
      longitude: coords.lng,
      photoURL,
      city: 'bali',
      country: 'ID'
    })
    onClose?.()
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {/* Nota superior */}
      <div
        className="rounded-xl border bg-slate-50/70 px-4 py-3 text-sm text-slate-600"
        dangerouslySetInnerHTML={{ __html: t('report.note') }}
      />

      {/* Error inline */}
      {err && (
        <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700">
          {err}
        </div>
      )}

      {/* Grid principal */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Tipo */}
        <label className="block">
          <span className="text-sm font-semibold">{t('report.typeLabel')}</span>
          <select
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
            value={type}
            onChange={e => setType(e.target.value)}
            disabled={isSubmitting}
            required
          >
            {TYPES.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label || t(opt.labelKey)}</option>
            ))}
          </select>
        </label>

        {/* Foto (input custom sin UI nativa) */}
        <div className="block">
          <span className="text-sm font-semibold">{t('report.photoLabel')}</span>
          <div className="mt-1">
            <input
              id="incident-photo"
              type="file"
              accept="image/*"
              onChange={onFile}
              disabled={isSubmitting}
              className="sr-only"
            />
            <label
              htmlFor="incident-photo"
              className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50 cursor-pointer"
            >
              <FaImage className="opacity-70" />
              {fileName ? t('report.changePhoto') : t('report.selectPhoto')}
            </label>
            {fileName && (
              <div className="mt-1 truncate text-xs text-slate-500">{fileName}</div>
            )}
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-2 h-32 w-full rounded-xl border object-cover"
              />
            )}
          </div>
        </div>

        {/* Descripción (ocupa toda la fila en mobile) */}
        <label className="md:col-span-2 block">
          <span className="text-sm font-semibold">{t('report.descLabel')}</span>
          <textarea
            className="mt-1 w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-slate-400"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            maxLength={maxLen}
            required
            disabled={isSubmitting}
            rows={3}
          />
          <div className="mt-1 text-right text-xs text-slate-500">
            {desc.length}/{maxLen}
          </div>
        </label>

        {/* Ubicación: botón de gesto + estado */}
        <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-white/70 px-3 py-2">
          <div className="flex items-center gap-2 text-sm">
            <FaMapMarkerAlt className="opacity-70" />
            {locStatus === 'ok' && (
              <span className="font-semibold text-emerald-600">{t('report.locationOk')}</span>
            )}
            {locStatus === 'idle' && (
              <span className="text-slate-600">{t('report.locationLabel')}</span>
            )}
            {locStatus === 'pending' && (
              <span className="inline-flex items-center gap-2 text-slate-600">
                <FaSpinner className="animate-spin" /> {t('bali.resolving') || 'Resolving location...'}
              </span>
            )}
            {locStatus === 'denied' && (
              <span className="font-semibold text-rose-600">{t('report.locationDenied')}</span>
            )}
            {locStatus === 'error' && (
              <span className="font-semibold text-rose-600">{t('report.locationError')}</span>
            )}
          </div>

          <button
            type="button"
            onClick={askLocation}
            disabled={isSubmitting || locStatus === 'pending'}
            className="rounded-xl border bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {t('report.getLocation')}
          </button>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          aria-label={t('report.closeForm')}
        >
          {t('report.closeForm')}
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-sm font-extrabold text-white shadow-sm hover:opacity-95 disabled:opacity-60"
        >
          {isSubmitting ? t('report.submitting') : t('report.submit')}
        </button>
      </div>

    </form>
  )
}
