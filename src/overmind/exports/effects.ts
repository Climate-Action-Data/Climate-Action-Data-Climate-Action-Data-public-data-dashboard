// import { getProjectSearchResults } from '@/overmind/projectResult/effects'
// import { getUnitsSearchResults } from '../unitResult/effects'

import { CSVExportTypes, ExportCompleteFilters } from '@/@types/CSV'
import { EffectResponse } from '@/@types/EffectResponse'
import { ProjectSearchFilterValues, UnitSearchFilterValues } from '@/@types/ProjectSearchFilterValues'
import { DEFAULT_PROJECT_COUNT_TO_DISPLAY } from '@/@types/ProjectSearchResult'
import { defaultHeaders, generateExportUrl } from '@/utils/RequestHelpers'
import axios from 'axios'

const extractFiltersFromType = (
  exportType: CSVExportTypes,
  keywords: string,
  filters: ProjectSearchFilterValues | UnitSearchFilterValues,
  offset = 0,
  count = DEFAULT_PROJECT_COUNT_TO_DISPLAY,
) => {
  let differences: Partial<ExportCompleteFilters> = {
    keywords,
    offset,
    count,
    sortBy: filters.sortBy,
    direction: filters.direction,
  }
  switch (exportType) {
    case CSVExportTypes.PROJECT:
      const currentFilters = filters as ProjectSearchFilterValues
      differences = {
        ...differences,
        standards: currentFilters.projectStatus,
        methodologies: currentFilters.methodologies,
        sectors: currentFilters.sectors,
        countries: currentFilters.countries,
        creditingPeriodStart: currentFilters.creditingPeriod?.minDate?.toISOString(),
        creditingPeriodEnd: currentFilters.creditingPeriod?.maxDate?.toISOString(),
      }
      break

    case CSVExportTypes.UNIT:
      const currentFiltersUnit = filters as UnitSearchFilterValues
      differences = {
        ...differences,
        keywords,
        status: currentFiltersUnit.unitStatus,
        standards: currentFiltersUnit.projectStatus,
        methodologies: currentFiltersUnit.projectStatus,
        sectors: currentFiltersUnit.sectors,
        countries: currentFiltersUnit.countries,
        minYear: currentFiltersUnit.vintageYear?.minYear,
        maxYear: currentFiltersUnit.vintageYear?.maxYear,
        offset,
        count,
      }
      break
  }
  return differences
}

export const exportToCSV = async (
  exportType: CSVExportTypes,
  keywords: string,
  filters: ProjectSearchFilterValues | UnitSearchFilterValues,
  watchlistId?: string,
  offset = 0,
  count = DEFAULT_PROJECT_COUNT_TO_DISPLAY,
): Promise<EffectResponse<Blob>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Blob>
    const filtersParsed = extractFiltersFromType(exportType, keywords, filters, offset, count)
    axios
      .post(generateExportUrl(exportType), { ...filtersParsed, watchlistId }, { ...defaultHeaders, responseType: `blob` })
      .then((body) => {
        if (body.data) {
          result = { data: body.data }
        } else {
          result = { error: { code: body.status.toString(), message: body.statusText } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not fetch data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}
