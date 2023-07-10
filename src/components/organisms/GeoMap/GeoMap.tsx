import { useMemo, useState } from 'react'
import GeoMapDot from './GeoMapDot'
import { getMap } from './geo-map-utils'

import styles from './GeoMap.module.scss'

interface GeoMapProps {
  gridHeight?: number
  gridWidth?: number
  width?: string
  height?: string
  countries?: string[]
}

const GeoMap = (props: GeoMapProps) => {
  const { gridHeight, gridWidth, width, height, countries } = props

  const [hoveredCountry, setHoveredCountry] = useState(``)

  const handleHoverChange = (country: string) => {
    setHoveredCountry(country)
  }

  const computeSVGDot = (countryPoint: GeoCountryPoint) => {
    return <GeoMapDot {...countryPoint} hoveredCountry={hoveredCountry} onHoverChange={handleHoverChange} />
  }

  const map = useMemo(
    () =>
      getMap({
        gridHeight: gridHeight,
        gridWidth: gridWidth,
        countries,
        grid: `vertical`,
      }),
    [],
  )

  const viewBox = `0 0 ${map.gridWidth} ${map.gridHeight}`

  const mapStyle = {
    width: width,
    height: height,
  }

  return (
    <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" style={mapStyle} className={styles.geoMap}>
      {Array.from(map.points.values()).map(computeSVGDot)}
    </svg>
  )
}

export default GeoMap
