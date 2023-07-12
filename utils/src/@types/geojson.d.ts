type GeoMap = {
  dots: string[][]
  gridHeight: number
  gridWidth: number
}

type GeoJson = {
  type: string
  features: GeoJsonCountry[]
}

type GeoJsonCountry = {
  type: string
  id: string
  continent?: string
  geometry: GeoGeometry
}

type GeoCountryPolygons = {
  country: string
  continent?: string
  type: string
  coordinates: number[][][][]
}

type GridParams = {
  X_RANGE: number
  Y_RANGE: number
  X_MIN: number
  Y_MAX: number
}

type GeoCountryPoints = {
  country: string
  continent?: string
  points: GeoPoint[]
}

type GeoPoint = {
  x: number
  y: number
}

type GeoCountryPoint = {
  x: number
  y: number
  country: string
}

type GeoGeometry = {
  type: string
  coordinates: number[][] | GeoCoordinatesArray
}

type GeoCoordinatesArray = GeoCoordinates[] | GeoCoordinates[][]

type GeoCoordinates = number[][]

type GeoRegion = {
  lat: {
    min: number
    max: number
  }
  lng: {
    min: number
    max: number
  }
}

interface GetMapProps {
  gridHeight?: number
  gridWidth?: number
  countries?: string[]
  grid?: string
}

interface MapPointParams {
  shape: string
  svgOptions: {
    radius: number
    color: string
  }
}

interface SubRegion {
  name: string
  countries: string[]
}
