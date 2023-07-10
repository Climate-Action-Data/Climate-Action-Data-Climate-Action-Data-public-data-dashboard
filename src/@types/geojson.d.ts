type GeoJson = {
  type: string
  features: GeoJsonCountry[]
}

type GeoJsonCountry =
  | {
      type: string
      id: string
      properties: { name: string }
      geometry: GeoGeometry
    }
  | {
      type: string
      id: string
      properties: { name: string }
      geometry: GeoGeometry
    }

type GeoCountryPolygons = {
  country: string
  type: string
  coordinates: number[][][][]
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
