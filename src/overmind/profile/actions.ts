import { Context } from '@/overmind'

export const getUserProfile = async (context: Context) => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    context.state.profile.userProfile = undefined
    return
  }

  const userProfile = await context.effects.profile.getUserProfile(authToken)
  if (userProfile.data) {
    context.state.profile.userProfile = userProfile.data
  }
}

export const updateUserProfile = async (context: Context): Promise<boolean> => {
  const authToken = context.state.authentication.authToken

  if (authToken && context.state.profile.userProfile) {
    const userProfile = await context.effects.profile.updateUserProfile(authToken, {
      id: context.state.profile.userProfile.id,
      country: `Singapore`,
    })

    if (userProfile.data) {
      context.state.profile.userProfile = userProfile.data
      return true
    }
  }
  return false
}
