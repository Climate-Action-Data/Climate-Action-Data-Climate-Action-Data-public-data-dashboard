import { Context } from '@/overmind'

export const getUserProfile = async (context: Context) => {
  const authToken = context.state.authentication.authToken
  if (!authToken) {
    context.state.profile.userProfile = undefined
  } else {
    const userProfile = await context.effects.profile.getUserProfile(authToken)
    if (userProfile.data) {
      context.state.profile.userProfile = userProfile.data
    }
  }
}
