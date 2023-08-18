import axios from 'axios'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'
import { EffectResponse } from '@/@types/EffectResponse'
import { DEFAULT_PROJECT_COUNT_TO_DISPLAY, ProjectSearchResponse } from '@/@types/ProjectSearchResult'
import { ProjectDetails } from '@/@types/ProjectDetails'
import { ProjectSearchFilterValues } from '@/@types/ProjectSearchFilterValues'

export const getProjectSearchResults = async (
  keywords: string,
  filters: ProjectSearchFilterValues,
  offset = 0,
  count = DEFAULT_PROJECT_COUNT_TO_DISPLAY,
): Promise<EffectResponse<ProjectSearchResponse>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<ProjectSearchResponse>

    axios
      .post(
        `${defaultDomain}/v1/projects/search`,
        {
          keywords,
          standards: filters.projectStatus,
          methodologies: filters.methodologies,
          sectors: filters.sectors,
          countries: filters.countries,
          offset,
          count,
          sortBy: filters.sortBy,
          direction: filters.direction,
          creditingPeriodStart: filters.creditingPeriod?.minDate?.toISOString(),
          creditingPeriodEnd: filters.creditingPeriod?.maxDate?.toISOString(),
        },
        defaultHeaders,
      )
      .then((body) => {
        if (body.data) {
          const ProjectSearchData = body.data as ProjectSearchResponse
          result = { data: ProjectSearchData }
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

export const getProject = async (projectId: string): Promise<EffectResponse<ProjectDetails>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<ProjectDetails>

    axios
      .get(`${defaultDomain}/v1/projects/${projectId}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const projectData = body.data as ProjectDetails
          result = { data: projectData }
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
