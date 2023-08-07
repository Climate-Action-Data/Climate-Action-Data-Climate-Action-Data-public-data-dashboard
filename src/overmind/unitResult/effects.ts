import axios from 'axios'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

import { EffectResponse } from '@/@types/EffectResponse'
import { Unit } from '@/@types/Unit'
import { unitsData } from '@/test/mock-data/units_data'
import { UnitSearchResult } from '@/@types/UnitSearchResult'

const SLEEP = 3000

export const getUnitResults = async (from: number, take: number): Promise<EffectResponse<UnitSearchResult[]>> => {
  await new Promise((f) => setTimeout(f, SLEEP))
  return new Promise((resolve) => {
    const result: EffectResponse<UnitSearchResult[]> = {
      data: unitsData,
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
