import { render } from '@testing-library/react'
import ProfileContainer from './ProfileContainer'
import { mockUserProfile } from '@/test/mock-data/profile_data'

describe(`ProfileContainer`, () => {
  it(`renders correctly`, () => {
    const { container } = render(<ProfileContainer editMode={false} onCancel={jest.fn()} onEdit={jest.fn()} userProfile={mockUserProfile} onSave={jest.fn()} />)
    expect(container).toMatchSnapshot()
  })
})
