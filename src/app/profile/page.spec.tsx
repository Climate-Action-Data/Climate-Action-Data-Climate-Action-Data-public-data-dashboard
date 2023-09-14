import { render } from '@testing-library/react'

import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'
import ProfilePage from './page'

it(`renders correctly`, () => {
  const { container } = render(
    <TestOvermindWrapper>
      <TestRouter router={{}}>
        <ProfilePage />
      </TestRouter>
    </TestOvermindWrapper>,
  )
  expect(container).toMatchSnapshot()
})
