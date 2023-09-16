import { render, screen, fireEvent } from '@testing-library/react'
import ProfileContainer from './ProfileContainer'
import { mockUserProfile } from '@/test/mock-data/profile_data'

describe(`ProfileContainer`, () => {
  const onSaveSpyFn = jest.fn()

  const MOCK_PROPS = {
    editMode: false,
    userProfile: mockUserProfile,
    onEdit: jest.fn(),
    onCancel: jest.fn(),
    onSave: onSaveSpyFn,
  }

  it(`renders correctly in view mode`, () => {
    const { container } = render(
      <ProfileContainer editMode={MOCK_PROPS.editMode} onCancel={MOCK_PROPS.onCancel} onEdit={MOCK_PROPS.onEdit} userProfile={MOCK_PROPS.userProfile} onSave={MOCK_PROPS.onSave} />,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly in editMode`, () => {
    const { container } = render(
      <ProfileContainer editMode={true} onCancel={MOCK_PROPS.onCancel} onEdit={MOCK_PROPS.onEdit} userProfile={MOCK_PROPS.userProfile} onSave={MOCK_PROPS.onSave} />,
    )

    fireEvent.input(screen.getByTestId(`edit-first-name`), { target: { value: mockUserProfile.givenName } })
    fireEvent.input(screen.getByTestId(`edit-last-name`), { target: { value: mockUserProfile.familyName } })

    expect(container).toMatchSnapshot()
  })

  it(`renders correctly when save changes clicked`, () => {
    render(<ProfileContainer editMode={true} onCancel={MOCK_PROPS.onCancel} onEdit={MOCK_PROPS.onEdit} userProfile={MOCK_PROPS.userProfile} onSave={MOCK_PROPS.onSave} />)

    fireEvent.click(screen.getByTestId(`save-button`))

    expect(onSaveSpyFn).toBeCalled()
  })
})
