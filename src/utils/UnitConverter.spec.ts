import { convertToMtCO2, convertTotCO2, toCompactValueAndSuffix } from './UnitConverter'

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
})
