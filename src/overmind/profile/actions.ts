import { Context } from '@/overmind'

export const getUserProfile = async (context: Context) => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    return { data: undefined }
  } else {
    const userProfile = await context.effects.profile.getUserProfile(authToken)
    return userProfile
  }
}
