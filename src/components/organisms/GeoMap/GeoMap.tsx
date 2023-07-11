import { useEffect, useState } from 'react'

import GeoMapDot from './GeoMapDot'

import styles from './GeoMap.module.scss'
import continentsPoints from '../../../assets/geo-map/continents-dots'
import countriesContinentsMapping from '@/assets/geo-map/countries-continents-mapping'

const DEFAULT_AREA = `world` as MapArea

interface GeoMapProps {
  width?: string
  height?: string
  area?: MapArea
  onAreaChange?: (area: MapArea) => void
}

const GeoMap = (props: GeoMapProps) => {
  const { width, height, area, onAreaChange } = props

  const [hoveredArea, setHoveredArea] = useState(``)
  const [selectedArea, setSelectedArea] = useState<MapArea>(DEFAULT_AREA)

  useEffect(() => {
    if (area) {
      setSelectedArea(area)
    }
  }, [area])

  const handleHoverChange = (country: string, continent?: string) => {
    if (selectedArea === DEFAULT_AREA) {
      setHoveredArea(continent ?? country)
    } else {
      setHoveredArea(country)
    }
  }

  const handleClick = (continent?: MapArea) => {
    if (continent) {
      setHoveredArea(``)
      onAreaChange?.(continent ?? DEFAULT_AREA)
      setSelectedArea(continent ?? DEFAULT_AREA)
    }
  }

  const displayedArea = area ?? selectedArea

  const map = continentsPoints[displayedArea]

  const viewBox = `0 0 ${map.gridWidth} ${map.gridHeight}`

  const mapStyle = {
    width: width,
    height: height,
  }

  const svgDots = []

  for (let x = 0; x < map.dots.length; x++) {
    for (let y = 0; y < map.dots[x].length; y++) {
      if (map.dots[x][y]) {
        const country = map.dots[x][y] as string
        const continent = countriesContinentsMapping.get(country) as MapArea

        svgDots.push(
          <GeoMapDot
            key={`dot-${x}-${y}`}
            x={x}
            y={y}
            country={country}
            continent={continent}
            hoveredArea={hoveredArea}
            selectedArea={displayedArea}
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
