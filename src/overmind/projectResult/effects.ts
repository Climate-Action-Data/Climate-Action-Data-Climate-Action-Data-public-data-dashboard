import axios from 'axios'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'
import { EffectResponse } from '@/@types/EffectResponse'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { ProjectDetails } from '@/@types/ProjectDetails'

const DEFAULT_COUNT = 15

export const getProjectResults = async (pattern: string, offset = 0, count = DEFAULT_COUNT): Promise<EffectResponse<ProjectSearchResult[]>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<ProjectSearchResult[]>

    const searchParams = new URLSearchParams()
    searchParams.append(`pattern`, pattern)
    searchParams.append(`count`, count.toString())
    searchParams.append(`offset`, offset.toString())

    axios
      .get(`${defaultDomain}/v1/projects/search?${searchParams}`, defaultHeaders)
      .then((body) => {
        if (body.data) {
          const mapData = body.data as ProjectSearchResult[]
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
