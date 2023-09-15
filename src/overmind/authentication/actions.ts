import { Context } from '@/overmind'
import { User } from '@auth0/auth0-react'

export const setAuthentication = (context: Context, { user, authToken }: { user: User; authToken: string }) => {
  context.state.authentication.user = user
  context.state.authentication.authToken = authToken
  context.state.authentication.isAuthed = true

  context.actions.profile.getUserProfile()
}

export const clearAuthentication = (context: Context) => {
  context.state.authentication.user = undefined
  context.state.authentication.authToken = undefined
  context.state.authentication.isAuthed = false
}
