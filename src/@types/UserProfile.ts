export type UserProfile = {
  id: string
  givenName: string
  familyName: string
  name: string
  nickname: string
  picture: string
  company: string
  country: string
  email: string
  emailVerified: boolean
  isSocial: boolean
  createdAt: string
  updatedAt: string
}

export type UpdateUserProfile = {
  id?: string
  firstName?: string
  lastName?: string
  company?: string
  country?: string
}
