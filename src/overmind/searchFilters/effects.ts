import axios from 'axios'

import { EffectResponse } from '@/@types/EffectResponse'
import { GovernanceResponseData } from '@/@types/State'
import { defaultDomain, defaultHeaders } from '@/utils/RequestHelpers'

export const getGovernanceData = async (): Promise<EffectResponse<GovernanceResponseData>> => {
  return new Promise((resolve) => {
    let result: EffectResponse<GovernanceResponseData>
    axios
      .get(`${defaultDomain}/v1/governance/data`, defaultHeaders)
      .then((body) => {
        if (body.data.lastUpdated && body.data.governanceData) {
          const governanceResponseData = body.data as GovernanceResponseData
          result = { data: governanceResponseData }
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
