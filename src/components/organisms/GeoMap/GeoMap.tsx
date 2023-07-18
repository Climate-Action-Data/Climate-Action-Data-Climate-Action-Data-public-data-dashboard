// import { useState } from 'react'

import GeoMapDot from './GeoMapDot'

import styles from './GeoMap.module.scss'
import continentsPoints from '../../../assets/geo-map/continents-dots'
import countriesContinentsMapping from '@/assets/geo-map/countries-continents-mapping'
import { Country, SubRegion } from '@/@types/geojson'
import { useActions, useAppState } from '@/overmind'

const DEFAULT_REGION = SubRegion.WORLD

interface GeoMapProps {
  width?: string
  height?: string
  subRegion?: SubRegion
  hasCountryData?: Map<string, boolean>
  onRegionChange?: (subRegion: SubRegion) => void
  onCountryClick?: (country: Country) => void
}

const GeoMap = (props: GeoMapProps) => {
  const { width, height, subRegion, hasCountryData, onRegionChange, onCountryClick } = props

  // const [hoveredRegion, setHoveredRegion] = useState(``)
  const { carbonReduction } = useAppState().analytics
  const { setSubRegion, setHoverSubRegion } = useActions().analytics
  const selectedRegion = carbonReduction.carbonMapDataFilters.region ?? DEFAULT_REGION
  const hoveredRegion = carbonReduction.carbonMapHoveredRegion ?? DEFAULT_REGION
  const handleHoverChange = (country?: Country) => {
    if (country) {
      if (selectedRegion === DEFAULT_REGION) {
        setHoverSubRegion(country.subRegion ?? country.alpha3)
      } else {
        setHoverSubRegion(country.alpha3)
      }
    } else {
      setHoverSubRegion(``)
    }
  }

  const handleClick = (country: Country) => {
    if (country.subRegion) {
      setHoverSubRegion(``)
      onRegionChange?.(country.subRegion ?? DEFAULT_REGION)
      if (country.subRegion === subRegion) {
        onCountryClick?.(country)
      } else {
        setSubRegion(country.subRegion ?? DEFAULT_REGION)
      }
    }
  }

  const displayedRegion = selectedRegion
  const map = continentsPoints[displayedRegion]
  const viewBox = `0 0 ${map.gridWidth} ${map.gridHeight}`

  const mapStyle = {
    width: width,
    height: height,
  }

  const svgDots = []

  for (let x = 0; x < map.dots.length; x++) {
    for (let y = 0; y < map.dots[x].length; y++) {
      if (map.dots[x][y]) {
        const countryAlpha3 = map.dots[x][y] as string
        const subRegion = countriesContinentsMapping.get(countryAlpha3) as SubRegion

        svgDots.push(
          <GeoMapDot
            key={`dot-${x}-${y}`}
            x={x}
            y={y}
            countryAlpha3={countryAlpha3}
            subRegion={subRegion}
            hoveredRegion={hoveredRegion}
            selectedRegion={displayedRegion}
            hasData={hasCountryData?.get(countryAlpha3)}
            onHoverChange={handleHoverChange}
            onClick={handleClick}
          />,
        )
      }
    }
  }

  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={mapStyle} className={styles.geoMap}>
      {svgDots}
    </svg>
  )
}

export default GeoMap
