import { EffectResponse } from '@/@types/EffectResponse'
import { ResetPassword, UpdateUserProfile, UserProfile } from '@/@types/UserProfile'
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

export const resetPassword = async (authToken: string, resetPassword: ResetPassword): Promise<EffectResponse<boolean>> => {
  const resetPasswordEndpoint = `${defaultDomain}/v1/users/reset-password`

  return new Promise((resolve) => {
    let result: EffectResponse<boolean>
    axios
      .post(`${resetPasswordEndpoint}`, resetPassword, authedHeaders(authToken))
      .then((body) => {
        if (body.data) {
          result = { data: body.data as boolean }
        } else {
          result = { error: { code: body.status.toString(), message: `could not reset password` } }
        }
      })
      .catch(() => {
        result = { error: { code: `400`, message: `could not reset password` } }
      })
      .finally(() => {
        resolve(result)
      })
  })
}
