import { UserProfile } from '../../@types/UserProfile'

export const mockUserProfile: UserProfile = {
  id: `1`,
  givenName: `John`,
  familyName: `Doe`,
  name: `John Doe`,
  nickname: `John`,
  picture: ``,
  isSocial: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  emailVerified: true,
  country: `US`,
  company: `Company`,
  email: ``,
}
