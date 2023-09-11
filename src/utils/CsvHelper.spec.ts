import { screen } from '@testing-library/react'
import { CSVExportFilenames } from '../@types/CSV'
import { compareProjectCsvHeaders, convertCompareProjectToCSV, createAndDownloadCsv } from './CsvHelper'
import { useTranslation } from 'react-i18next'
import { csvProjectData, projectData } from '../test/mock-data/projects_data'

jest.mock(`react-i18next`, () => ({
  useTranslation: jest.fn(),
}))

describe(`CsvHelper`, () => {
  const createUrlMock = jest.fn()
  const revokeUrlMock = jest.fn()

  const useTranslationSpy = useTranslation as jest.Mock

  beforeAll(() => {
    window.URL.createObjectURL = createUrlMock
    window.URL.revokeObjectURL = revokeUrlMock
    useTranslationSpy.mockReturnValue({
      t: jest.fn((str) => str),
      i18n: {
        language: `en`,
      },
    })
  })

  test(`createAndDownloadCsv`, () => {
    createAndDownloadCsv(new Blob(), CSVExportFilenames.PROJECT_COMPARE)
    const invisibleLink = screen.getByTestId(`invisible-link`)

    expect(invisibleLink).toBeDefined()
  })

  test(`compareProjectCsvHeaders`, () => {
    const { t } = useTranslation(`search`)
    const headerCount = 15
    const headers = compareProjectCsvHeaders(t)

    expect(headers.length).toBe(headerCount)
    expect(headers).toEqual([
      `projectCompare.projectName`,
      `projectCompare.projectId`,
      `projectCompare.developer`,
      `projectCompare.linkToProject`,
      `projectCompare.registry`,
      `projectCompare.methodology`,
      `projectCompare.sector`,
      `projectCompare.country`,
      `projectCompare.inCountryRegion`,
      `projectCompare.projectStatus`,
      `projectCompare.creditingPeriod`,
      `projectCompare.annualEstUnits`,
      `projectCompare.totalIssuedUnits`,
      `projectCompare.totalRetiredUnits`,
      `projectCompare.totalAvailableUnits`,
    ])
  })

  test(`convertCompareProjectToCSV`, () => {
    const headers = convertCompareProjectToCSV(projectData[0])

    expect(headers).toEqual(csvProjectData)
  })
})
