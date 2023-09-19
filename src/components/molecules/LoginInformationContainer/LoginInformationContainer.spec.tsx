import { render } from '@testing-library/react'
import LoginInformationContainer from './LoginInformationContainer'

describe(`LoginInformationContainer`, () => {
  it(`renders correctly for auth0 user`, () => {
    const { container } = render(<LoginInformationContainer id="auth0|123" isSocialLogin={false} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for linkedin user`, () => {
    const { container } = render(<LoginInformationContainer id="linkedin|123" isSocialLogin={true} />)
    expect(container).toMatchSnapshot()
  })

  it(`renders correctly for google user`, () => {
    const { container } = render(<LoginInformationContainer id="google-oauth2|123" isSocialLogin={true} />)
    expect(container).toMatchSnapshot()
  })
})
