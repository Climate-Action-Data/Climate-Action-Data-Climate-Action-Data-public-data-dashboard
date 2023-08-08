import { UnitStatus } from '@/@types/Unit'
import { generateUnitUrl } from './RequestHelpers'

const DEFAULT_RETIRED_URL = `/unit/retirement?id=`
const DEFAULT_ISSUANCE_URL = `/unit/issuance?id=`

describe(`generateUnitUrl`, () => {
  test(`generateUnitUrl with status retired`, () => {
    expect(generateUnitUrl(UnitStatus.RETIRED)).toBe(DEFAULT_RETIRED_URL)
  })

  test(`generateUnitUrl with status held`, () => {
    expect(generateUnitUrl(UnitStatus.HELD)).toBe(DEFAULT_ISSUANCE_URL)
  })

  test(`generateUnitUrl with status held`, () => {
    expect(generateUnitUrl(UnitStatus.BUFFER)).toBe(DEFAULT_ISSUANCE_URL)
  })
})
