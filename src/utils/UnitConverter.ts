import { ProjectCoordinates } from '@/@types/ProjectDetails'

const THOUSAND = 1e3
const MILLION = 1e6
const BILLION = 1e9
const TRILLION = 1e12
const TCO2_MTCO2_RATIO = 1000000
const PRECISION_CONFIG = 3
export const convertToMtCO2 = (tCO2e: number, toRound = false, decimals: number | undefined = undefined): number => {
  let MtCO2 = tCO2e / TCO2_MTCO2_RATIO
  if (toRound) {
    MtCO2 = Math.round(MtCO2)
  }
  if (decimals) {
    MtCO2 = Number(MtCO2.toFixed(decimals))
  }
  return MtCO2
}

export const convertTotCO2 = (MtCO2e: number): number => {
  return MtCO2e * TCO2_MTCO2_RATIO
}

export const toCompactValueAndSuffix = (n: number): [string, string] => {
  if (n < THOUSAND) {
    return [n.toPrecision(PRECISION_CONFIG), ``]
  }

  if (n >= THOUSAND && n < MILLION) {
    return [(n / THOUSAND).toPrecision(PRECISION_CONFIG), `K`]
  }

  if (n >= MILLION && n < BILLION) {
    return [(n / MILLION).toPrecision(PRECISION_CONFIG), `MM`]
  }

  if (n >= BILLION && n < TRILLION) {
    return [(n / BILLION).toPrecision(PRECISION_CONFIG), `B`]
  }

  if (n >= TRILLION) {
    return [(n / TRILLION).toPrecision(PRECISION_CONFIG), `T`]
  }

  return [`0`, ``]
}

const REG_LONG_COORD = /(\d+° \d+’ \d+”)\s*-\s*(\d+° \d+’ \d+”)\s*([NSEW])/gm

export const toCoordinates = (payload: any): ProjectCoordinates | undefined => {
  let validPayload = payload
  try {
    const isParsed = JSON.parse(payload)
    if (isParsed) {
      validPayload = isParsed
    }
  } catch (e) {}

  if (`object` === typeof validPayload && validPayload?.longitude !== `` && validPayload?.latitude !== ``) {
    return { longitude: validPayload.longitude, latitude: validPayload.latitude }
  } else if (`string` === typeof payload && !REG_LONG_COORD.test(validPayload)) {
    return extractCoordinatesFromString(payload)
  } else if (REG_LONG_COORD.test(validPayload)) {
    return extractCoordinatesFromLongString(validPayload)
  }
  return undefined
}

export const extractCoordinatesFromLongString = (payload: string): ProjectCoordinates | undefined => {
  REG_LONG_COORD.lastIndex = 0
  const results: string[] = []
  let match
  while ((match = REG_LONG_COORD.exec(payload))) {
    results.push(match[1])
  }
  if (results.length > 0) {
    const coord = convertDmsToLongitudeLongitude(results[0], results[1])
    if (coord) {
      return coord
    }
  }
  return undefined
}

const DEFAULT_MINUTE_DENOMINATOR = 60
const DEFAULT_SECOND_DENOMINATOR = 3600
const DEFAULT_SIGNINVERSER = -1
const REG_STRING_DIGIT = /\d+/g

export const dmsToDecimal = (dmsStr: string): number | undefined => {
  REG_STRING_DIGIT.lastIndex = 0
  const matches = dmsStr.match(REG_STRING_DIGIT)

  if (!matches) {
    return undefined
  }

  const [degrees, minutes, seconds] = matches.map(Number)
  const decimalDegrees = degrees + minutes / DEFAULT_MINUTE_DENOMINATOR + seconds / DEFAULT_SECOND_DENOMINATOR
  return decimalDegrees
}

export const convertDmsToLongitudeLongitude = (latitudeStr: string, longitudeStr: string): ProjectCoordinates | undefined => {
  let result = undefined
  let latitude = dmsToDecimal(latitudeStr)
  let longitude = dmsToDecimal(longitudeStr)

  if (latitude && longitude) {
    if (latitudeStr.includes(`S`) || longitudeStr.includes(`W`)) {
      latitude *= DEFAULT_SIGNINVERSER
      longitude *= DEFAULT_SIGNINVERSER
    }
    result = { latitude, longitude }
  }

  return result
}

const REG_STRING_COORD = /(?<latitude>-?\d+(\.\d+)?)(?:°)?\s*(?<latitudeDirection>[NS])\s*(?<longitude>-?\d+(\.\d+)?)(?:°)?\s*(?<longitudeDirection>[EW])/i

const extractCoordinatesFromString = (coordinates: string): ProjectCoordinates | undefined => {
  REG_STRING_COORD.lastIndex = 0
  const match = REG_STRING_COORD.exec(coordinates)

  if (!match) {
    return undefined
  }

  let latitude = parseFloat(match.groups?.latitude as string)
  let longitude = parseFloat(match.groups?.longitude as string)

  if (match.groups?.latitudeDirection.toUpperCase() === `S`) {
    latitude *= DEFAULT_SIGNINVERSER
  }

  if (match.groups?.longitudeDirection.toUpperCase() === `W`) {
    longitude *= DEFAULT_SIGNINVERSER
  }

  return { latitude, longitude }
}

export const coordinatesToString = (coordinates: ProjectCoordinates | undefined): string => {
  if (coordinates) {
    return `${coordinates.latitude}, ${coordinates.longitude}`
  }
  return `--`
}
