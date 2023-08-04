import axios from 'axios'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

import { DateFormats } from '@/@types/DateFormats'
import { EffectResponse } from '@/@types/EffectResponse'
import { ProjectSearchResult } from '@/@types/ProjectSearchResult'
import { projectData } from '@/test/mock-data/projects_data'
import { formatDate } from '@/utils/DateFormat'

const SLEEP = 3000

export const getProjectResults = async (from: number, take: number): Promise<EffectResponse<ProjectSearchResult[]>> => {
  await new Promise((f) => setTimeout(f, SLEEP))
  return new Promise((resolve) => {
    const mappedData = projectData.map((project) => ({
      name: project.projectName,
      id: project.projectId,
      warehouseProjectId: project.warehouseProjectId,
      projectDeveloper: project.projectDeveloper,
      standard: project.currentRegistry,
      methodology: project.methodology,
      sector: project.sector,
      country: project.country ?? undefined,
      status: project.projectStatus,
      creditingPeriod:
        project.creditingPeriodStart && project.creditingPeriodEnd
          ? `${formatDate(project.creditingPeriodStart, DateFormats.YYYY_MM_DD)} - ${formatDate(project.creditingPeriodEnd, DateFormats.YYYY_MM_DD)}`
          : undefined,
      annualEst: project.annualEst ?? undefined,
      annualIssued: project.annualIssued ?? undefined,
      annualRetired: project.annualRetired ?? undefined,
      annualAvailable: project.annualIssued && project.annualRetired ? project.annualIssued - project.annualRetired : undefined,
    }))
    const result: EffectResponse<ProjectSearchResult[]> = {
      data: mappedData.slice(from - 1, from - 1 + take),
    }
    resolve(result)
    // axios
    //   .get(`${defaultDomain}/v1/widgets/issued-retired-graph`, defaultHeaders)
    //   .then((body) => {
    //     if (body.data.lastUpdated && body.data.countriesData) {
    //       const mapData = body.data as IssuedRetiredGraphData
    //       result = { data: mapData }
    //     } else {
    //       result = { error: { code: body.status.toString(), message: body.statusText } }
    //     }
    //   })
    //   .catch(() => {
    //     result = { error: { code: `400`, message: `could not fetch data` } }
    //   })
    //   .finally(() => {
    //         resolve(result)
    //   })
  })
}

// create a effect that takes a projectid params and logs it then returns the first element of projectData
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
