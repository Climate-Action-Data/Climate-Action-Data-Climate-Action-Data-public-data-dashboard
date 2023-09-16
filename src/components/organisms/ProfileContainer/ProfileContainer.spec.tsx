import { render } from '@testing-library/react'
import ProfileContainer from './ProfileContainer'
import { UserProfile } from '../../../@types/UserProfile'

describe(`ProfileContainer`, () => {
  it(`renders correctly`, () => {
    const mockUserProfile: UserProfile = {
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

    const { asFragment } = render(<ProfileContainer editMode={false} onCancel={jest.fn()} onEdit={jest.fn()} userProfile={mockUserProfile} onSave={jest.fn()} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
