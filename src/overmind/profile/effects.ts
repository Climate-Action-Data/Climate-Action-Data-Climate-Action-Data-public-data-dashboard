import { EffectResponse } from '@/@types/EffectResponse'
import { UpdateUserProfile, UserProfile } from '@/@types/UserProfile'
import axios from 'axios'
import { authedHeaders, defaultDomain } from '@/utils/RequestHelpers'

export const getUserProfile = async (authToken: string): Promise<EffectResponse<UserProfile>> => {
  const profileEndpoint = `${defaultDomain}/v1/users/user`

  return new Promise((resolve) => {
    let result: EffectResponse<UserProfile>
    axios
      .get(`${profileEndpoint}`, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as UserProfile }
        } else {
          result = { error: { code: body.status.toString(), message: `could not fetch data` } }
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

export const updateUserProfile = async (authToken: string, userProfile: UpdateUserProfile): Promise<EffectResponse<UserProfile>> => {
  const profileEndpoint = `${defaultDomain}/v1/users/user`

  return new Promise((resolve) => {
    let result: EffectResponse<UserProfile>
    axios
      .patch(`${profileEndpoint}`, userProfile, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as UserProfile }
        } else {
          result = { error: { code: body.status.toString(), message: `could not update data` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not update data` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}
