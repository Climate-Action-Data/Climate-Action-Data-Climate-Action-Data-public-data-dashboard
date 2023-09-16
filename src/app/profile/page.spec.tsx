import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'
import ProfilePage from './page'
import { PROFILE_DATA } from '@/test/TestOvermindMockData'

jest.mock(`@chakra-ui/react`, () => ({
  ...jest.requireActual(`@chakra-ui/react`),
  useBreakpointValue: jest.fn(),
}))

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper profile={PROFILE_DATA}>
      <TestRouter router={{}}>
        <ProfilePage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
