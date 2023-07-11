type GeoMap = {
  dots: string[][]
  //   points: Map<string, GeoCountryPoint>
  //   countries: Array<GeoCountryPoints>
  gridHeight: number
  gridWidth: number
}

type GeoJson = {
  type: string
  features: GeoJsonCountry[]
}

type GeoJsonCountry =
  | {
      type: string
      id: string
      continent?: string
      properties: { name: string }
      geometry: GeoGeometry
    }
  | {
      type: string
      id: string
      continent?: string
      properties: { name: string }
      geometry: GeoGeometry
    }

type GeoCountryPolygons = {
  country: string
  continent?: string
  type: string
  coordinates: number[][][][]
}

type GeoCountryPoints = {
  country: string
  continent?: string
  points: Array<GeoPoint>
}

type GeoPoint = {
  x: number
  y: number
}

type GeoCountryPoint = {
  x: number
  y: number
  country: string
  //   continent?: string
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
