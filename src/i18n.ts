import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enHome from './locales/en/home.json'
import enMenu from './locales/en/menu.json'

i18next.use(initReactI18next).init({
  debug: true,
  fallbackLng: `en`,
  resources: {
    en: {
      home: enHome,
      menu: enMenu,
    },
  },
})

export default i18next
