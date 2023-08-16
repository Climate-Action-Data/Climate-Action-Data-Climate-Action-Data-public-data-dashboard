import { UnitStatus } from '@/@types/Unit'
import { generateExportUrl, generateUnitUrl } from './RequestHelpers'
import { CSVExportTypes } from '@/@types/CSV'

const DEFAULT_RETIRED_URL = `/unit/retirement?id=`
const DEFAULT_ISSUANCE_URL = `/issuance?id=`

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

const DEFAULT_EXPORT_PROJECT_URL = `${process.env.NEXT_PUBLIC_API_HOST}/v1/projects/export`
const DEFAULT_EXPORT_UNIT_URL = `${process.env.NEXT_PUBLIC_API_HOST}/v1/units/export`

describe(`generateExportUrl`, () => {
  test(`generateExportUrl with type project`, () => {
    expect(generateExportUrl(CSVExportTypes.PROJECT)).toBe(DEFAULT_EXPORT_PROJECT_URL)
  })

  test(`generateExportUrl with type unit`, () => {
    expect(generateExportUrl(CSVExportTypes.UNIT)).toBe(DEFAULT_EXPORT_UNIT_URL)
  })
})
