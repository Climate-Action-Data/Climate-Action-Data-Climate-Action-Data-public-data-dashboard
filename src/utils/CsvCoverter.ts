import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { formatCreditingPeriod, stringifyString } from './TextConverter'
import { TFunction } from 'i18next'

const DEFAUL_CSV_DELIMITER = `,`

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
