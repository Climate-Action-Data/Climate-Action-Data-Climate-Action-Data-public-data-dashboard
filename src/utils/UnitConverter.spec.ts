import { convertToMtCO2, convertTotCO2 } from './UnitConverter'

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
})
