import { render } from '@testing-library/react'
import { Menu } from './Menu'
import { TestOvermindWrapper } from '@/test/TestOvermindWrapper'
import { TestRouter } from '@/test/TestRouter'

import { useAuth0 } from '@auth0/auth0-react'

jest.mock(`@auth0/auth0-react`)

describe(`Menu`, () => {
  beforeEach(() => {
    ;(useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect: jest.fn(),
      getAccessTokenSilently: jest.fn().mockImplementation(() => Promise.resolve(`test`)),
    })
  })

  it(`renders correctly`, () => {
    const { container } = render(
      <TestOvermindWrapper>
        <TestRouter router={{}}>
          <Menu />
        </TestRouter>
      </TestOvermindWrapper>,
    )
    expect(container).toMatchSnapshot()
  })
})
