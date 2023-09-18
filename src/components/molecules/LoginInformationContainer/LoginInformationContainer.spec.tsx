import { render } from '@testing-library/react'
import LoginInformationContainer from './LoginInformationContainer'

describe(`LoginInformationContainer`, () => {
  it(`renders correctly for auth0 user`, () => {
    const { container } = render(<LoginInformationContainer id="auth0|123" />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for linkedin user`, () => {
    const { container } = render(<LoginInformationContainer id="linkedin|123" />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for google user`, () => {
    const { container } = render(<LoginInformationContainer id="google|123" />)
    expect(container).toMatchSnapshot()
  })
})
