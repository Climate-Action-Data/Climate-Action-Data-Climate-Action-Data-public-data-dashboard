import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import enHome from './locales/en/home.json'
import enMenu from './locales/en/menu.json'
import enCountries from './locales/en/countries.json'
import enSearch from './locales/en/search.json'
import enProjectDetails from './locales/en/projectDetails.json'
import enUnitDetails from './locales/en/unitDetails.json'
import enWatchlist from './locales/en/watchlist.json'
import enProfile from './locales/en/profile.json'

i18next.use(initReactI18next).init({
  fallbackLng: `en`,
  resources: {
    en: {
      home: enHome,
      menu: enMenu,
      countries: enCountries,
      search: enSearch,
      projectDetails: enProjectDetails,
      unitDetails: enUnitDetails,
      watchlist: enWatchlist,
      profile: enProfile,
    },
  },
})

export default i18next
