import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importa tus JSON (Vite soporta import JSON nativamente)
import en from './locales/en.json'
import id from './locales/id.json'
// Importa es.json si ya lo tienes:
// import es from './locales/es.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
      // es: { translation: es },
    },
    fallbackLng: 'en',
    supportedLngs: ['en','id','es'],
    detection: {
      order: ['localStorage','querystring','navigator','htmlTag','path','subdomain'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false }, // prevenimos fallback UI
  })

// opcional: sincroniza <html lang="...">
i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng
  }
})

export default i18n
