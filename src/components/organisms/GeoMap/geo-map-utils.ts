/* eslint no-magic-numbers: off */

import proj4 from 'proj4'
import _ from 'lodash'
import inside from '@turf/boolean-point-in-polygon'
import { polygon, point } from '@turf/turf'
import geojsonWorld from '../../../assets/countries.geo.json'

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
        type: feature.geometry.type,
        coordinates: [feature.geometry.coordinates as number[][][]],
      })
    } else {
      feature.geometry.coordinates.forEach((coordsCollection) => {
        countriesData.push({
          country: feature.id,
          type: feature.geometry.type,
          coordinates: [coordsCollection as number[][][]],
        })
      })
    }
  })

  return countriesData.map(({ country, coordinates }) => {
    return {
      type: `Feature`,
      id: country,
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

export const getMap = (props: GetMapProps) => {
  const { countries = [], grid = `vertical` } = props
  let { gridHeight = 0, gridWidth = 0 } = props

  if (gridHeight <= 0 && gridWidth <= 0) {
    throw new Error(`height or width is required`)
  }

  let region
  let geojson: GeoJson = geojsonWorld

  if (countries.length > 0) {
    const features = countries.map((country) => {
      return geojsonByCountry.get(country)
    })

    geojson = {
      type: `FeatureCollection`,
      features: _.compact(features),
    }
    if (!region) {
      region = computeGeojsonBox(geojson)
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

  const points = new Map<string, GeoCountryPoint>()
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
          points.set([x, y].join(`;`), {
            x: localx,
            y: localy,
            country: countryPolygons.id,
          })
        }
      })
    }
  }

  return {
    points,
    countriesPolygons,
    X_MIN,
    Y_MIN,
    X_MAX,
    Y_MAX,
    X_RANGE,
    Y_RANGE,
    region,
    grid,
    gridHeight,
    gridWidth,
    ystep,
  }
}
