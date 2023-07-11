import _ from 'lodash'

import styles from './GeoMap.module.scss'

interface GeoMapPatternProps {
  x: number
  y: number
  country: string
  continent?: MapArea
  hoveredArea: string
  selectedArea: string
  onHoverChange: (country: string, continent?: string) => void
  onClick: (continent?: MapArea) => void
}

const GeoMapDot = (props: GeoMapPatternProps) => {
  const { x, y, country, continent, hoveredArea, selectedArea, onHoverChange, onClick } = props

  const handleMouseOver = () => {
    onHoverChange(country, continent)
  }

  const handleClick = () => {
    onClick(continent)
  }

  const handleMouseLeave = () => {
    onHoverChange(``, ``)
  }

  let shouldDisplayHoverStyle = false

  if (continent !== selectedArea) {
    shouldDisplayHoverStyle = _.indexOf([country, continent], hoveredArea) >= 0
  } else {
    shouldDisplayHoverStyle = country === hoveredArea
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
