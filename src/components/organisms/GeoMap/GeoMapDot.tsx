import { useMemo } from 'react'
import _ from 'lodash'

import countries from '../../../assets/geo-map/countries'

import styles from './GeoMap.module.scss'
import { Country, SubRegion } from '@/@types/geojson'

interface GeoMapPatternProps {
  x: number
  y: number
  countryAlpha3: string
  subRegion?: SubRegion
  hoveredRegion: string
  selectedRegion: string
  onHoverChange: (country?: Country) => void
  onClick: (country: Country) => void
}

const GeoMapDot = (props: GeoMapPatternProps) => {
  const { x, y, countryAlpha3, subRegion, hoveredRegion, selectedRegion, onHoverChange, onClick } = props

  const countryDetails: Country = useMemo(() => countries.find((country) => country.alpha3 === countryAlpha3), [countryAlpha3]) ?? {
    alpha3: countryAlpha3,
    subRegion: subRegion,
  }

  const handleMouseOver = () => {
    onHoverChange(countryDetails)
  }

  const handleClick = () => {
    onClick(countryDetails)
  }

  const handleMouseLeave = () => {
    onHoverChange()
  }

  let shouldDisplayHoverStyle = false

  if (subRegion !== selectedRegion) {
    shouldDisplayHoverStyle = _.indexOf([countryAlpha3, subRegion], hoveredRegion) >= 0
  } else {
    shouldDisplayHoverStyle = countryAlpha3 === hoveredRegion
  }

  const geoMapDotClassName = shouldDisplayHoverStyle ? styles.geoMapDotHover : styles.geoMapDot
  const geoMapDotAreaClassName = shouldDisplayHoverStyle ? styles.geoMapDotAreaHover : styles.geoMapDotArea

  return (
    <>
      <circle className={geoMapDotAreaClassName} cx={x} cy={y} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick} />
      <circle className={geoMapDotClassName} cx={x} cy={y} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick} />
    </>
  )
}

export default GeoMapDot
