/* eslint no-magic-numbers: off */

import proj4 from 'proj4'
import _ from 'lodash'
import inside from '@turf/boolean-point-in-polygon'
import { polygon, point } from '@turf/turf'
import geojsonWorld from './countries.geo.json'

const DEFAULT_WORLD_REGION = {
  lat: { min: -56, max: 71 },
  lng: { min: -179, max: 179 },
}

export const geojsonByCountry = new Map<string, GeoJsonCountry>()

geojsonWorld.features.forEach((feature) => {
  geojsonByCountry.set(feature.id, feature)
})

export const geojsonToMultiPolygons = (geojson: GeoJson) => {
  const countriesData = new Array<GeoCountryPolygons>()

  geojson.features.forEach((feature) => {
    if (feature.geometry.type === `Polygon`) {
      countriesData.push({
        country: feature.id,
        continent: feature.continent,
        type: feature.geometry.type,
        coordinates: [feature.geometry.coordinates as number[][][]],
      })
    } else {
      feature.geometry.coordinates.forEach((coordsCollection) => {
        countriesData.push({
          country: feature.id,
          continent: feature.continent,
          type: feature.geometry.type,
          coordinates: [coordsCollection as number[][][]],
        })
      })
    }
  })

  return countriesData.map(({ country, continent, coordinates }) => {
    return {
      type: `Feature`,
      id: country,
      continent,
      geometry: { type: `MultiPolygon`, coordinates },
      properties: {},
    }
  })
}

export const computeGeojsonBox = (geojson: GeoJson | GeoJsonCountry | GeoGeometry): GeoRegion => {
  const { type } = geojson

  if (type === `FeatureCollection`) {
    const boxes = (geojson as GeoJson).features.map(computeGeojsonBox)
    return {
      lat: {
        min: Math.min(...boxes.map((box) => box.lat.min)),
        max: Math.max(...boxes.map((box) => box.lat.max)),
      },
      lng: {
        min: Math.min(...boxes.map((box) => box.lng.min)),
        max: Math.max(...boxes.map((box) => box.lng.max)),
      },
    }
  } else if (type == `Feature`) {
    return computeGeojsonBox((geojson as GeoJsonCountry).geometry)
  } else if (type === `MultiPolygon`) {
    return computeGeojsonBox({
      type: `Polygon`,
      coordinates: (geojson as GeoGeometry).coordinates.flat() as GeoCoordinatesArray,
    })
  } else if (type == `Polygon`) {
    const coords = (geojson as GeoGeometry).coordinates.flat() as number[][]
    const latitudes = coords.map(([_, lat]) => lat)
    const longitudes = coords.map(([lng, _]) => lng)

    return {
      lat: {
        min: Math.min(...latitudes),
        max: Math.max(...latitudes),
      },
      lng: {
        min: Math.min(...longitudes),
        max: Math.max(...longitudes),
      },
    }
  } else {
    throw new Error(`Unknown geojson type ${type}`)
  }
}

export const getMap = (props: GetMapProps): GeoMap => {
  const { countries = [], grid = `vertical` } = props
  let { gridHeight = 0, gridWidth = 0 } = props

  if (gridHeight <= 0 && gridWidth <= 0) {
    throw new Error(`height or width is required`)
  }

  let region
  let geojson: GeoJson = geojsonWorld

  if (countries.length > 0) {
    const features = countries
      .map((country) => {
        return geojsonByCountry.get(country)
      })
      .filter((country) => !!country)

    geojson = {
      type: `FeatureCollection`,
      features: _.compact(features),
    }

    if (!region && features.length > 0) {
      region = computeGeojsonBox(geojson)
    } else {
      region = DEFAULT_WORLD_REGION
    }
  } else if (!region) {
    region = DEFAULT_WORLD_REGION
  }

  const countriesPolygons = geojsonToMultiPolygons(geojson)

  const converter = proj4(`GOOGLE`)

  const [X_MIN, Y_MIN] = converter.forward([region.lng.min, region.lat.min])
  const [X_MAX, Y_MAX] = converter.forward([region.lng.max, region.lat.max])

  const X_RANGE = X_MAX - X_MIN
  const Y_RANGE = Y_MAX - Y_MIN

  if (gridWidth <= 0) {
    gridWidth = Math.round((gridHeight * X_RANGE) / Y_RANGE)
  } else if (gridHeight <= 0) {
    gridHeight = Math.round((gridWidth * Y_RANGE) / X_RANGE)
  }

  const dots: string[][] = new Array(gridWidth).fill(0).map(() => new Array(gridHeight).fill(0))
  const ystep = grid === `diagonal` ? Math.sqrt(3) / 2 : 1

  for (let y = 0; y * ystep < gridHeight; y += 1) {
    for (let x = 0; x < gridWidth; x += 1) {
      const localx = y % 2 === 0 && grid === `diagonal` ? x + 0.5 : x
      const localy = y * ystep

      const pointGoogle = [(localx / gridWidth) * X_RANGE + X_MIN, Y_MAX - (localy / gridHeight) * Y_RANGE]
      const wgs84Point = point(proj4(`GOOGLE`, `WGS84`).forward(pointGoogle))

      countriesPolygons.forEach((countryPolygons) => {
        const countryPoly = polygon(countryPolygons.geometry.coordinates[0])

        if (inside(wgs84Point, countryPoly)) {
          dots[localx][localy] = countryPolygons.id
        }
      })
    }
  }

  return dots
}

export const getMap = (props: GetMapProps): GeoMap => {
  const { countries = [], grid = `vertical` } = props

  let { gridHeight = 0, gridWidth = 0 } = props

  if (gridHeight <= 0 && gridWidth <= 0) {
    throw new Error(`height or width is required`)
  }

  const geojson: GeoJson = {
    ...geojsonWorld,
    features: geojsonWorld.features.filter((jsonCountry) => (countries.length === 0 ? true : _.indexOf(countries, jsonCountry.id) >= 0)),
  }
  const region = getRegion(geojson, countries)

  const countriesPolygons = geojsonToMultiPolygons(geojson)

  const converter = proj4(`GOOGLE`)

  const [X_MIN, Y_MIN] = converter.forward([region.lng.min, region.lat.min])
  const [X_MAX, Y_MAX] = converter.forward([region.lng.max, region.lat.max])

  const X_RANGE = X_MAX - X_MIN
  const Y_RANGE = Y_MAX - Y_MIN

  const gridParams = {
    X_RANGE,
    Y_RANGE,
    X_MIN,
    Y_MAX,
  }

  if (gridWidth <= 0) {
    gridWidth = Math.round((gridHeight * X_RANGE) / Y_RANGE)
  } else if (gridHeight <= 0) {
    gridHeight = Math.round((gridWidth * Y_RANGE) / X_RANGE)
  }

  const dots = computeMapDots(grid, gridWidth, gridHeight, countriesPolygons, gridParams)

  return {
    dots,
    gridHeight,
    gridWidth,
  }
}
