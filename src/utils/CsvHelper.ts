import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { formatCreditingPeriod, stringifyString } from './TextConverter'
import { TFunction } from 'i18next'
import { CSVExportFilenames } from '../@types/CSV'

const DEFAUL_CSV_DELIMITER = `,`
const DEFAULT_BLOB_TYPE = `application/octet-stream`
const DEFAULT_LINK_ELEMENT = `a`
const DEFAULT_DL_ATTRIBUTE = `download`
const DEFAULT_FILE_NAME = `export`
const DEFAULT_LINK_DISPLAY = `none`

const csvFilenameWithTimestamp = (filename: string) => {
  const timeStamp = new Date().toISOString()
  return `${filename ?? DEFAULT_FILE_NAME}-${timeStamp}.csv`
}

export const createAndDownloadCsv = (data: Blob, filename: CSVExportFilenames) => {
  const blob = new Blob([data], { type: DEFAULT_BLOB_TYPE })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement(DEFAULT_LINK_ELEMENT)
  link.style.display = DEFAULT_LINK_DISPLAY
  link.setAttribute(`data-testid`, `invisible-link`)
  link.href = url
  link.setAttribute(DEFAULT_DL_ATTRIBUTE, csvFilenameWithTimestamp(filename))
  document.body.appendChild(link)
  link.click()
  URL.revokeObjectURL(url)
}

export const compareProjectCsvHeaders = (t: TFunction) => {
  return [
    t(`projectCompare.projectName`),
    t(`projectCompare.projectId`),
    t(`projectCompare.developer`),
    t(`projectCompare.linkToProject`),
    t(`projectCompare.standard`),
    t(`projectCompare.methodology`),
    t(`projectCompare.sector`),
    t(`projectCompare.country`),
    t(`projectCompare.inCountryRegion`),
    t(`projectCompare.projectStatus`),
    t(`projectCompare.creditingPeriod`),
    t(`projectCompare.annualEstUnits`),
    t(`projectCompare.totalIssuedUnits`),
    t(`projectCompare.totalRetiredUnits`),
    t(`projectCompare.totalAvailableUnits`),
  ]
}

export const convertCompareProjectToCSV = (project: ProjectSearchResult): string => {
  return [
    stringifyString(project.name),
    stringifyString(project.id),
    stringifyString(project.developer),
    project.link,
    stringifyString(project.standard),
    stringifyString(project.methodology),
    stringifyString(project.sector),
    stringifyString(project.country),
    stringifyString(project.inCountryRegion),
    project.status,
    formatCreditingPeriod(project.creditingPeriodStart, project.creditingPeriodEnd),
    project.annualEst,
    project.annualIssued,
    project.annualRetired,
    project.annualAvailable,
  ].join(DEFAUL_CSV_DELIMITER)
}
