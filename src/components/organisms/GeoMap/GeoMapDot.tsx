import { useMemo } from 'react'
import _ from 'lodash'
import classNames from 'classnames/bind'

import { findCountry } from './countries'

import styles from './GeoMap.module.scss'
import { Country, SubRegion } from '@/@types/geojson'

interface GeoMapPatternProps {
  x: number
  y: number
  countryAlpha3: string
  subRegion?: SubRegion
  hoveredRegion: string
  selectedRegion: string
  hasData?: boolean
  onHoverChange: (country?: Country) => void
  onClick: (country: Country) => void
}

const DEFAULT_RADIUS = 0.35
const DEFAULT_AREA_RATIO = 2
const GeoMapDot = (props: GeoMapPatternProps) => {
  const { x, y, countryAlpha3, subRegion, hoveredRegion, selectedRegion, hasData, onHoverChange, onClick } = props

  const countryDetails: Country = useMemo(() => findCountry(countryAlpha3, subRegion), [countryAlpha3])

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

  const cx = classNames.bind(styles)

  const dotClassName = cx({
    geoMapDot: !shouldDisplayHoverStyle && hasData,
    geoMapDotNoData: !shouldDisplayHoverStyle && !hasData,
    geoMapDotHover: shouldDisplayHoverStyle && hasData,
    geoMapDotHoverNoData: shouldDisplayHoverStyle && !hasData,
  })

  const dotAreaClassName = cx({
    geoMapDotArea: !shouldDisplayHoverStyle && hasData,
    geoMapDotAreaNoData: !shouldDisplayHoverStyle && !hasData,
    geoMapDotAreaHover: shouldDisplayHoverStyle && hasData,
    geoMapDotAreaHoverNoData: shouldDisplayHoverStyle && !hasData,
  })

  return (
    <>
      <circle
        r={DEFAULT_RADIUS * DEFAULT_AREA_RATIO}
        className={dotAreaClassName}
        cx={x}
        cy={y}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <circle r={DEFAULT_RADIUS} className={dotClassName} cx={x} cy={y} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} onClick={handleClick} />
    </>
  )
}

export default GeoMapDot
