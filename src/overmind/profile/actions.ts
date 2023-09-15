import { Context } from '@/overmind'
import { UpdateUserProfile } from '@/@types/UserProfile'

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

export const updateUserProfile = async (context: Context, profile: UpdateUserProfile): Promise<boolean> => {
  const authToken = context.state.authentication.authToken

  if (authToken && context.state.profile.userProfile) {
    const userProfile = await context.effects.profile.updateUserProfile(authToken, profile)

    if (userProfile.data) {
      context.state.profile.userProfile = userProfile.data
      return true
    }
  }
  return false
}
