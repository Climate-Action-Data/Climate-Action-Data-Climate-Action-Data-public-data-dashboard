import { convertDmsToLongitudeLongitude, convertToMtCO2, convertTotCO2, coordinatesToString, toCompactValueAndSuffix, toCoordinates } from './UnitConverter'

const STARTING_VALUE = 12345600
const DECIMAL_VALUE = 2
const MTCO2_VALUE = 12.3456
const MTCO2_TWO_DECIMAL = 12.35
const MTCO2_ROUNDED = 12

describe(`Unit Convertion`, () => {
  it(`convert to MtCO2`, () => {
    expect(convertToMtCO2(STARTING_VALUE)).toBe(MTCO2_VALUE)
    expect(convertToMtCO2(STARTING_VALUE, false, DECIMAL_VALUE)).toBe(MTCO2_TWO_DECIMAL)
    expect(convertToMtCO2(STARTING_VALUE, true)).toBe(MTCO2_ROUNDED)
  })

  it(`convert to tCO2`, () => {
    expect(convertTotCO2(MTCO2_VALUE)).toBe(STARTING_VALUE)
  })

  it(`convert to tCO2`, () => {
    expect(convertTotCO2(MTCO2_VALUE)).toBe(STARTING_VALUE)
  })

  it(`convert number to compact format and suffix`, () => {
    const VALUE_IN_HUNDREDS = 123
    const VALUE_IN_THOUSANDS = 12357
    const VALUE_IN_MILLIONS = 123123123
    const VALUE_IN_BILLIONS = 1231231231
    const VALUE_IN_TRILLIONS = 12312312311231
    expect(toCompactValueAndSuffix(VALUE_IN_HUNDREDS)).toStrictEqual([`123`, ``])
    expect(toCompactValueAndSuffix(VALUE_IN_THOUSANDS)).toStrictEqual([`12.4`, `K`])
    expect(toCompactValueAndSuffix(VALUE_IN_MILLIONS)).toStrictEqual([`123`, `MM`])
    expect(toCompactValueAndSuffix(VALUE_IN_BILLIONS)).toStrictEqual([`1.23`, `B`])
    expect(toCompactValueAndSuffix(VALUE_IN_TRILLIONS)).toStrictEqual([`12.3`, `T`])
  })

  const TEST_LATITUDE_STR = `40° 28’ 12”`
  const TEST_LONGITUDE_STR = `30° 10’ 12”`
  const TEST_STRING_NE_DEG = `40.47°N 30.17°E`
  const TEST_STRING_NE_SPACE = `40.47° N  30.17° E`
  const TEST_STRING_NE = `40.47 N 30.17  E`
  const TEST_STRING_SW = `40.47 S 30.17  W`
  const TEST_STRING_WORD = `hello world`
  const TEST_STRING_RENDERED = `-40.47, -30.17`

  const TEST_RESULT = {
    latitude: 40.47,
    longitude: 30.17,
  }
  const TEST_RESULT_NEGATIVE = {
    latitude: -40.47,
    longitude: -30.17,
  }

  const TEST_LONG_COORD = `40° 28’ 12” - 40° 29’ 15” North 30° 10’ 12” - 30° 13’ 04” East`

  it(`convert dms to long lat`, () => {
    const result = convertDmsToLongitudeLongitude(TEST_LATITUDE_STR, TEST_LONGITUDE_STR)
    expect(result).toHaveProperty(`latitude`)
    expect(result).toHaveProperty(`longitude`)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`convert dms to long lat reversed`, () => {
    const result = convertDmsToLongitudeLongitude(`${TEST_LATITUDE_STR} S`, `${TEST_LONGITUDE_STR}W`)
    expect(result).toHaveProperty(`latitude`)
    expect(result).toHaveProperty(`longitude`)
    expect(result).toStrictEqual(TEST_RESULT_NEGATIVE)
  })

  it(`convert undefined to long lat`, () => {
    const result = convertDmsToLongitudeLongitude(``, ``)
    expect(result).toBe(undefined)
  })

  it(`handle location undefined if number empty string`, () => {
    const result = toCoordinates({ longitude: ``, latitude: `` })
    expect(result).toBe(undefined)
  })

  it(`handle location as object stringifued`, () => {
    const result = toCoordinates(JSON.stringify(TEST_RESULT))
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`handle location undefined if number`, () => {
    const result = toCoordinates(0)
    expect(result).toBe(undefined)
  })

  it(`extract locations from coordinates as valid number`, () => {
    const result = toCoordinates(TEST_RESULT)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`extract location from long str as valid number`, () => {
    const result = toCoordinates(TEST_LONG_COORD)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`extract coord from str with degrees`, () => {
    const result = toCoordinates(TEST_STRING_NE_DEG)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`extract coord from str with degrees and space`, () => {
    const result = toCoordinates(TEST_STRING_NE_SPACE)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`extract coord from str with no degrees`, () => {
    const result = toCoordinates(TEST_STRING_NE)
    expect(result).toStrictEqual(TEST_RESULT)
  })

  it(`extract coord from str with reversed sign`, () => {
    const result = toCoordinates(TEST_STRING_SW)
    expect(result).toStrictEqual(TEST_RESULT_NEGATIVE)
  })

  it(`extract undefined from str with random`, () => {
    const result = toCoordinates(TEST_STRING_WORD)
    expect(result).toBe(undefined)
  })

  it(`render coordinates from parsed`, () => {
    const result = coordinatesToString(toCoordinates(TEST_STRING_SW))
    expect(result).toBe(TEST_STRING_RENDERED)
  })
})
