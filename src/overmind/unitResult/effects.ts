import axios from 'axios'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

import { EffectResponse } from '@/@types/EffectResponse'
import { Unit } from '@/@types/Unit'
import { Issuance } from '@/@types/Issuance'
import { UnitSearchResponse } from '@/@types/UnitSearchResult'
import { DEFAULT_PROJECT_COUNT_TO_DISPLAY, ESearchParams } from '@/@types/ProjectSearchResult'
import { UnitSearchFilterValues } from '@/@types/ProjectSearchFilterValues'

const SLEEP = 3000

export const getUnitResults = async (pattern: string, offset = 0, count = DEFAULT_PROJECT_COUNT_TO_DISPLAY): Promise<EffectResponse<UnitSearchResponse>> => {
  await new Promise((f) => setTimeout(f, SLEEP))
  return new Promise((resolve) => {
    let result: EffectResponse<UnitSearchResponse>

    const searchParams = new URLSearchParams()
    searchParams.append(ESearchParams.PATTERN, pattern)
    searchParams.append(ESearchParams.COUNT, count.toString())
    searchParams.append(ESearchParams.OFFSET, offset.toString())
    axios
      .get(`${defaultDomain}/v1/units/search?${searchParams}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const mapData = body.data as UnitSearchResponse
          result = { data: mapData }
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

export const getUnitFilterResults = async (filters: UnitSearchFilterValues, offset = 0, count = DEFAULT_PROJECT_COUNT_TO_DISPLAY): Promise<EffectResponse<UnitSearchResponse>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<UnitSearchResponse>

    axios
      .post(
        `${defaultDomain}/v1/units/filter`,
        {
          status: filters.unitStatus,
          standards: filters.projectStatus,
          methodologies: filters.projectStatus,
          sectors: filters.sectors,
          countries: filters.countries,
          minYear: filters.vintageYear?.minYear ?? 0,
          maxYear: filters.vintageYear?.maxYear ?? 0,
        },
        defaultHeaders,
      )
      .then((body) => {
        if (body.data) {
          const ProjectSearchData = body.data as UnitSearchResponse
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

export const getUnit = async (warehouseUnitId: string): Promise<EffectResponse<Unit>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<Unit>

    axios
      .get(`${defaultDomain}/v1/units/${warehouseUnitId}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const projectData = body.data as Unit
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
export const getIssuance = async (id: string): Promise<EffectResponse<Issuance>> => {
  await new Promise((f) => setTimeout(f, SLEEP))

  return new Promise((resolve) => {
    let result: EffectResponse<Issuance>

    axios
      .get(`${defaultDomain}/v1/issuances/${id}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const projectData = body.data as Issuance
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
