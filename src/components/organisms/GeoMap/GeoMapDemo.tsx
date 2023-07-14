import { Country, SubRegion } from '@/@types/geojson'
import { useState } from 'react'

import GeoMap from '@/components/organisms/GeoMap/GeoMap'

import styles from './GeoMapDemo.module.scss'
import Case from 'case'

const DEFAULT_REGION = SubRegion.WORLD

export default function GeoMapDemo(): React.JSX.Element {
  const [selectedRegion, setselectedRegion] = useState<SubRegion>(DEFAULT_REGION)
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>()

  const hasCountryData: Map<string, boolean> = new Map([
    [`FRA`, true],
    [`BEL`, true],
    [`CHN`, true],
  ])

  const handleWorldButtonClick = () => {
    setselectedRegion(DEFAULT_REGION)
  }

  const handleAreaChange = (region: SubRegion) => {
    setselectedRegion(region)
  }

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country)
  }

  return (
    <main className={styles.main}>
      <button className={styles.worldButton} onClick={handleWorldButtonClick}>
        World
      </button>
      {selectedCountry && (
        <div>
          {selectedCountry?.name} ({selectedCountry?.alpha3}) - {Case.capital(selectedCountry?.subRegion ?? ``)} ({Case.capital(selectedCountry?.region ?? ``)})
        </div>
      )}
      <GeoMap width="80vw" height="800px" hasCountryData={hasCountryData} subRegion={selectedRegion} onRegionChange={handleAreaChange} onCountryClick={handleCountryClick}></GeoMap>
    </main>
  )
}
