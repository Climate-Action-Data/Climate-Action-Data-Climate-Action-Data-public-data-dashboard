import { EffectResponse } from '@/@types/EffectResponse'
import { Project } from '@/@types/Project'
import { projectData } from '@/assets/projects_data'
import { lightFormat } from 'date-fns'

const SLEEP = 50

const formatDate = (date: string) => {
  return lightFormat(new Date(date), `yyyy/MM/dd`)
}

export const getProjectResults = async (from: number, take: number): Promise<EffectResponse<Project[]>> => {
  await new Promise((f) => setTimeout(f, SLEEP))
  return new Promise((resolve) => {
    const mappedData = projectData.map((project) => ({
      name: project.projectName,
      id: project.projectId,
      company: project.projectDeveloper,
      standard: project.currentRegistry,
      methodology: project.methodology,
      sector: project.sector,
      country: project.country ?? undefined,
      status: project.projectStatus,
      creditingPeriod:
        project.creditingPeriodStart && project.creditingPeriodEnd ? `${formatDate(project.creditingPeriodStart)} - ${formatDate(project.creditingPeriodEnd)}` : undefined,
      annualEst: project.annualEst ?? undefined,
      annualIssued: project.annualIssued ?? undefined,
      annualRetired: project.annualRetired ?? undefined,
      annualAvailable: project.annualIssued && project.annualRetired ? project.annualIssued - project.annualRetired : undefined,
    }))
    const result: EffectResponse<Project[]> = {
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
    //     resolve(result)
    //   })
    //   .catch(() => {
    //     result = { error: { code: `400`, message: `could not fetch data` } }
    //     resolve(result)
    //   })
  })
}
