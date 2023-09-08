import { UnitStatus } from '@/@types/Unit'
import { defaultDomain, generateExportUrl, generateUnitUrl, authedHeaders } from './RequestHelpers'
import { CSVExportTypes } from '@/@types/CSV'
import { SearchFlow } from '../@types/Search'

const MOCK_UNIT_ID = `unit123`
const DEFAULT_RETIRED_URL = `/unit/retirement?id=${MOCK_UNIT_ID}&searchFlow=unit`
const DEFAULT_ISSUANCE_URL = `/issuance?id=${MOCK_UNIT_ID}&searchFlow=unit`

describe(`generateUnitUrl`, () => {
  test(`generateUnitUrl with status retired`, () => {
    expect(generateUnitUrl(UnitStatus.RETIRED, MOCK_UNIT_ID, SearchFlow.UNIT)).toBe(DEFAULT_RETIRED_URL)
  })

  test(`generateUnitUrl with status held`, () => {
    expect(generateUnitUrl(UnitStatus.HELD, MOCK_UNIT_ID, SearchFlow.UNIT)).toBe(DEFAULT_ISSUANCE_URL)
  })

  test(`generateUnitUrl with status held`, () => {
    expect(generateUnitUrl(UnitStatus.BUFFER, MOCK_UNIT_ID, SearchFlow.UNIT)).toBe(DEFAULT_ISSUANCE_URL)
  })
})

const DEFAULT_EXPORT_PROJECT_URL = `${defaultDomain}/v1/projects/export`
const DEFAULT_EXPORT_UNIT_URL = `${defaultDomain}/v1/units/export`

describe(`generateExportUrl`, () => {
  test(`generateExportUrl with type project`, () => {
    expect(generateExportUrl(CSVExportTypes.PROJECT)).toBe(DEFAULT_EXPORT_PROJECT_URL)
  })

  test(`generateExportUrl with type unit`, () => {
    expect(generateExportUrl(CSVExportTypes.UNIT)).toBe(DEFAULT_EXPORT_UNIT_URL)
  })
})

describe(`authedHeaders`, () => {
  it(`should return headers with Authorization and Content-Type`, () => {
    const token = `eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5Mjg3NjM5MywiaWF0IjoxNjkyODc2MzkzfQ.1zXf_vrXcxQvpLHwUdUlKTmWwQONNO0A5TxiKs6PA2s`
    const result = authedHeaders(token)

    expect(result).toEqual({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `application/json`,
      },
    })
  })
})
