import { AuthenticationState } from '@/@types/State'

export const state: AuthenticationState = {
  isAuthed: false,
  authToken: undefined,
  user: undefined,
}
