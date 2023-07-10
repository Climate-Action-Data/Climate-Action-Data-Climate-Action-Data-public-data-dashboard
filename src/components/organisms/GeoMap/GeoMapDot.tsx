import styles from './GeoMap.module.scss'

const DOT_RADIUS = 0.4
const DOT_AREA_RADIUS_FACTOR = 2

interface GeoMapPatternProps {
  x: number
  y: number
  country: string
  hoveredCountry: string
  onHoverChange: (country: string) => void
}

const GeoMapDot = (props: GeoMapPatternProps) => {
  const { x, y, country, hoveredCountry, onHoverChange } = props

  const handleMouseOver = () => {
    onHoverChange(country)
  }

  const handleMouseLeave = () => {
    onHoverChange(``)
  }

  const geoMapDotClassName = hoveredCountry === country ? styles.geoMapDotHover : styles.geoMapDot
  const geoMapDotAreaClassName = hoveredCountry === country ? styles.geoMapDotAreaHover : styles.geoMapDotArea

  return (
    <>
      <circle className={geoMapDotAreaClassName} cx={x} cy={y} r={DOT_RADIUS * DOT_AREA_RADIUS_FACTOR} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
      <circle className={geoMapDotClassName} cx={x} cy={y} r={DOT_RADIUS} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} />
    </>
  )
}

export default GeoMapDot
