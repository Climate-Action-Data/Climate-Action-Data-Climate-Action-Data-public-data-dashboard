import { fireEvent, render, screen } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'
import ProfilePage from './page'
import { PROFILE_DATA } from '@/test/TestOvermindMockData'

const mockUseBreakpointValue = jest.fn()
jest.mock(`@chakra-ui/react`, () => ({
  ...jest.requireActual(`@chakra-ui/react`),
  useBreakpointValue: () => mockUseBreakpointValue,
}))

describe(`ProfilePage`, () => {
  it(`renders correctly on desktop`, () => {
    mockUseBreakpointValue.mockReturnValue(true)

    const { container } = render(
      <TestOvermindWrapper profile={PROFILE_DATA}>
        <TestRouter router={{}}>
          <ProfilePage />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on mobile`, () => {
    mockUseBreakpointValue.mockReturnValue(false)

    const { container } = render(
      <TestOvermindWrapper profile={PROFILE_DATA}>
        <TestRouter router={{}}>
          <ProfilePage />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on save`, () => {
    const { container } = render(
      <TestOvermindWrapper profile={PROFILE_DATA}>
        <TestRouter router={{}}>
          <ProfilePage />
        </TestRouter>
      </TestOvermindWrapper>,
    )

    fireEvent.click(screen.getByTestId(`edit-profile-button`))
    fireEvent.click(screen.getByTestId(`save-button`))

    expect(container).toMatchSnapshot()
  })

  it(`renders correctly on cancel edit`, () => {
    const { container } = render(
      <TestOvermindWrapper profile={PROFILE_DATA}>
        <TestRouter router={{}}>
          <ProfilePage />
        </TestRouter>
      </TestOvermindWrapper>,
    )

    fireEvent.click(screen.getByTestId(`edit-profile-button`))
    fireEvent.click(screen.getByTestId(`cancel-edit-profile-button`))

    expect(container).toMatchSnapshot()
  })
})
